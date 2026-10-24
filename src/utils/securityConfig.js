// Known placeholder values from .env.example that should never be used in production
const PLACEHOLDER_MASTER_KEY_PATTERNS = [
  "replace-with-output-from-npm-run-security-master-key",
  "your-master-key",
  "changeme",
  "secret",
];

export function getSecurityConfigWarnings(config) {
  const warnings = [];

  if (!config.masterKey) {
    warnings.push("AI_SHIELD_MASTER_KEY is missing; encrypted logs will not survive restarts.");
  } else if (Buffer.byteLength(config.masterKey, "utf8") < 32) {
    warnings.push("AI_SHIELD_MASTER_KEY should contain at least 32 random bytes.");
  } else if (PLACEHOLDER_MASTER_KEY_PATTERNS.some((p) => config.masterKey.includes(p))) {
    // SECURITY FIX: Detect .env.example placeholder values and warn
    warnings.push("AI_SHIELD_MASTER_KEY appears to be a placeholder value. Generate a real key with: npm run security:master-key");
  }

  if (!config.adminRequireTotp) {
    warnings.push("Admin TOTP is disabled; enable it for stronger account protection.");
  }

  // SECURITY FIX: Warn when server binds to all interfaces (0.0.0.0)
  if (config.host === "0.0.0.0") {
    warnings.push(
      "SERVER is bound to 0.0.0.0 (all interfaces). Set HOST=127.0.0.1 if only local or reverse-proxy access is needed.",
    );
  }

  if (config.databaseUrl && !config.databaseSsl) {
    warnings.push("PostgreSQL TLS is disabled. Use it unless the database is only on a trusted private network.");
  } else if (config.databaseSsl && !config.databaseSslRejectUnauthorized) {
    warnings.push("PostgreSQL TLS certificate verification is disabled.");
  }

  return warnings;
}
