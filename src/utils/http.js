import { readFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const SHARED_DIR = path.resolve(process.cwd(), "shared");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export function sendJson(res, statusCode, payload) {
  if (!res.headersSent) {
    res.writeHead(statusCode, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
  }

  res.end(JSON.stringify(payload));
}

export function setSecurityHeaders(req, res, config) {
  const origin = req.headers.origin;
  const forwardedProtocol = String(req.headers["x-forwarded-proto"] ?? "")
    .split(",")[0]
    .trim();
  const isHttps = forwardedProtocol === "https" || Boolean(req.socket.encrypted);

  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");

  // SECURITY: style-src and script-src allow local resources and Google Translate integration
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com; style-src 'self' 'unsafe-inline' https://translate.googleapis.com; img-src 'self' data: blob: https://translate.google.com https://translate.googleapis.com https://www.google.com; media-src 'self' blob: data:; connect-src 'self' https://translate.googleapis.com; frame-src 'self' https://translate.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  );

  // SECURITY FIX: Only allow GET, POST, OPTIONS globally — DELETE only for admin routes
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Device-Fingerprint");

  // HSTS for HTTPS connections
  if (isHttps) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
  }

  if (origin && config.allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
}

export function setRateLimitHeaders(res, rateState) {
  res.setHeader("X-RateLimit-Limit", String(rateState.limit));
  res.setHeader("X-RateLimit-Remaining", String(rateState.remaining));
  res.setHeader("X-RateLimit-Reset", String(rateState.resetAt));
}

export async function readJsonBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let aborted = false;

    req.on("data", (chunk) => {
      if (aborted) {
        return;
      }

      totalBytes += chunk.length;
      if (totalBytes > maxBytes) {
        aborted = true;
        const error = new Error("Payload too large");
        error.statusCode = 413;
        reject(error);
        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => {
      if (aborted) {
        return;
      }

      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        const body = raw ? JSON.parse(raw) : {};
        if (body === null || typeof body !== "object" || Array.isArray(body)) {
          const shapeError = new Error("JSON payload must be an object");
          shapeError.statusCode = 400;
          reject(shapeError);
          return;
        }
        resolve(body);
      } catch (error) {
        const parseError = new Error("Invalid JSON payload");
        parseError.statusCode = 400;
        reject(parseError);
      }
    });

    req.on("error", reject);
  });
}

/**
 * SECURITY FIX: getClientIp no longer blindly trusts X-Forwarded-For.
 * Only the last `trustedProxyCount` hops are trusted (default: 1).
 * This prevents attackers from spoofing their IP to bypass rate limiting.
 *
 * - Behind 0 proxies (direct): use socket.remoteAddress
 * - Behind 1 proxy (typical reverse proxy): trust 1 hop from XFF
 * - Behind N proxies: trust N hops from XFF
 */
export function getClientIp(req, trustedProxyCount = 1) {
  const forwarded = req.headers["x-forwarded-for"];

  if (
    trustedProxyCount > 0 &&
    typeof forwarded === "string" &&
    forwarded.length > 0
  ) {
    const hops = forwarded.split(",").map((ip) => ip.trim()).filter(Boolean);
    // The real client IP is at index: hops.length - trustedProxyCount
    // But we only do this if there are enough hops to trust
    const clientIndex = hops.length - trustedProxyCount;
    if (clientIndex >= 0 && hops[clientIndex]) {
      return hops[clientIndex];
    }
    // Fallback: take the first hop if arithmetic doesn't work out
    return hops[0] ?? req.socket.remoteAddress ?? "unknown";
  }

  return req.socket.remoteAddress ?? "unknown";
}

export async function serveStaticAsset(pathname, req, res) {
  const isShared = pathname.startsWith("/shared/");
  const baseDir = isShared ? SHARED_DIR : PUBLIC_DIR;
  const relativePath = isShared
    ? pathname.slice("/shared/".length)
    : pathname === "/"
      ? "index.html"
      : pathname.slice(1);

  if (!relativePath) {
    return false;
  }

  const absolutePath = path.resolve(baseDir, relativePath);
  if (!absolutePath.startsWith(`${baseDir}${path.sep}`)) {
    return false;
  }

  try {
    const file = await readFile(absolutePath);
    const extension = path.extname(absolutePath);
    const contentType = MIME_TYPES[extension] ?? "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=300",
    });

    if (req.method === "HEAD") {
      res.end();
      return true;
    }

    res.end(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR" || error.code === "ENOTDIR") {
      return false;
    }

    throw error;
  }
}
