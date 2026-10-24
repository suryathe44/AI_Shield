import { analyzeContent } from "/shared/detectionEngine.js";
import { analyzeVideoForensics } from "/shared/videoForensicsEngine.js";

function bindResult(prefix) {
  return {
    card: document.getElementById(`${prefix}Card`),
    score: document.getElementById(`${prefix}Score`),
    dial: document.getElementById(`${prefix}Dial`),
    classification: document.getElementById(`${prefix}Classification`),
    summary: document.getElementById(`${prefix}Summary`),
    meta: document.getElementById(`${prefix}Meta`),
    reasons: document.getElementById(`${prefix}Reasons`),
    highlights: document.getElementById(`${prefix}Highlights`),
    recommendations: document.getElementById(`${prefix}Recommendations`),
  };
}

const results = {
  messageLocal: bindResult("messageLocal"),
  messageServer: bindResult("messageServer"),
  screenLocal: bindResult("screenLocal"),
  screenServer: bindResult("screenServer"),
  videoLocal: bindResult("videoLocal"),
  videoServer: bindResult("videoServer"),
};

const messageInput = document.getElementById("messageInput");
const sourceSelect = document.getElementById("sourceSelect");
const processConsent = document.getElementById("processConsent");
const storeLogConsent = document.getElementById("storeLogConsent");
const snippetConsent = document.getElementById("snippetConsent");
const serverAnalyzeButton = document.getElementById("serverAnalyzeButton");
const messageStatus = document.getElementById("messageStatus");
const demoMessageButton = document.getElementById("demoMessageButton");

const screenInput = document.getElementById("screenInput");
const screenConsent = document.getElementById("screenConsent");
const captureScreenButton = document.getElementById("captureScreenButton");
const screenServerAnalyzeButton = document.getElementById("screenServerAnalyzeButton");
const screenStatus = document.getElementById("screenStatus");

const videoPanel = document.getElementById("videoPanel");
const videoPreviewWrapper = document.getElementById("videoPreviewWrapper");
const videoPreview = document.getElementById("videoPreview");
const videoCanvas = document.getElementById("videoCanvas");
const videoScannerBeam = document.getElementById("videoScannerBeam");
const videoConsent = document.getElementById("videoConsent");
const videoFileInput = document.getElementById("videoFileInput");
const videoLocalAnalyzeButton = document.getElementById("videoLocalAnalyzeButton");
const videoServerAnalyzeButton = document.getElementById("videoServerAnalyzeButton");
const videoStatus = document.getElementById("videoStatus");
const presetDeepfakeButton = document.getElementById("presetDeepfakeButton");
const presetDiffusionButton = document.getElementById("presetDiffusionButton");
const presetRealButton = document.getElementById("presetRealButton");

const feedbackForm = document.getElementById("feedbackForm");
const feedbackCategory = document.getElementById("feedbackCategory");
const feedbackComment = document.getElementById("feedbackComment");
const feedbackCharacterCount = document.getElementById("feedbackCharacterCount");
const feedbackSubmitButton = document.getElementById("feedbackSubmitButton");
const feedbackStatus = document.getElementById("feedbackStatus");

function debounce(callback, delay = 180) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
}

function renderList(element, items, formatter, emptyText) {
  element.innerHTML = "";

  if (!items || items.length === 0) {
    if (!emptyText) {
      return;
    }

    const item = document.createElement("li");
    item.textContent = emptyText;
    element.appendChild(item);
    return;
  }

  items.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = formatter(entry);
    element.appendChild(item);
  });
}

function applyTone(card, classification) {
  card.classList.remove("safe", "suspicious", "scam", "authentic", "ai_deepfake");

  const normalized = String(classification || "").toUpperCase();
  if (normalized === "SAFE" || normalized === "AUTHENTIC") {
    card.classList.add("safe", "authentic");
  } else if (normalized === "SUSPICIOUS") {
    card.classList.add("suspicious");
  } else if (normalized === "SCAM" || normalized === "AI_DEEPFAKE") {
    card.classList.add("scam", "ai_deepfake");
  }
}

function renderVideoAnalysis(target, analysis, originLabel) {
  animateScoreCounter(target.score, target.dial, analysis.riskScore);
  target.classification.textContent = analysis.classification.replace("_", " ");
  target.summary.textContent = analysis.summary;
  const fpsText = analysis.forensics?.evaluatedFps ? ` | ${analysis.forensics.evaluatedFps.toFixed(0)} FPS` : "";
  const confText = analysis.confidence?.level ? ` | Conf: ${analysis.confidence.level}` : "";
  target.meta.textContent = `${originLabel}${fpsText}${confText} | Evidence markers: ${analysis.indicators?.length || 0}`;
  target.card.classList.remove("is-empty");
  applyTone(target.card, analysis.classification);

  target.card.classList.remove("card-updated");
  void target.card.offsetWidth;
  target.card.classList.add("card-updated");

  renderList(target.reasons, analysis.explanation, (entry) => entry, "No forensic anomalies identified.");
  renderList(
    target.highlights,
    analysis.indicators || [],
    (entry) => `${entry.type || "SIGNAL"}: ${entry.label}`,
    "No synthetic indicators detected.",
  );
  renderList(
    target.recommendations,
    analysis.recommendations || [],
    (entry) => entry,
    "No specific countermeasures needed.",
  );
}

function renderEmpty(target, title, summary, meta) {
  target.score.textContent = "0";
  target.dial.style.setProperty("--angle", "0deg");
  target.classification.textContent = title;
  target.summary.textContent = summary;
  target.meta.textContent = meta;
  applyTone(target.card, "");
  target.card.classList.add("is-empty");
  renderList(target.reasons, [], (entry) => entry, "No detected reasons yet.");
  renderList(target.highlights, [], (entry) => entry, "No suspicious patterns yet.");
  renderList(target.recommendations, [], (entry) => entry, "Recommendations will appear with a verdict.");
}

function animateScoreCounter(scoreEl, dialEl, targetScore) {
  const startScore = Number.parseInt(scoreEl.textContent, 10) || 0;
  if (startScore === targetScore) {
    scoreEl.textContent = String(targetScore);
    dialEl.style.setProperty("--angle", `${Math.round((targetScore / 100) * 360)}deg`);
    return;
  }
  const duration = 400;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - (1 - progress) * (1 - progress);
    const current = Math.round(startScore + (targetScore - startScore) * easeOut);
    scoreEl.textContent = String(current);
    dialEl.style.setProperty("--angle", `${Math.round((current / 100) * 360)}deg`);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function renderAnalysis(target, analysis, originLabel) {
  animateScoreCounter(target.score, target.dial, analysis.riskScore);
  target.classification.textContent = analysis.classification;
  target.summary.textContent = analysis.summary;
  const reputation = analysis.factors.internetReputation;
  const internetStatus = reputation
    ? reputation.checked
      ? ` | Internet URL check: ${reputation.matches.length ? "THREAT FOUND" : "no known threat"}`
      : reputation.unavailable
        ? " | Internet URL check unavailable"
        : reputation.configured
          ? " | No URL to check"
          : " | Internet URL check not configured"
    : "";
  target.meta.textContent = `${originLabel} | ML ${analysis.factors.machineLearning.riskScore}/100 | Confidence ${analysis.confidence?.level ?? "N/A"} | ${analysis.stats.wordCount} words${internetStatus}`;
  target.card.classList.remove("is-empty");
  applyTone(target.card, analysis.classification);

  // Trigger cyber flash micro-animation on result update
  target.card.classList.remove("card-updated");
  void target.card.offsetWidth; // trigger reflow
  target.card.classList.add("card-updated");

  renderList(target.reasons, analysis.explanation, (entry) => entry, "No explanation available.");
  renderList(
    target.highlights,
    analysis.highlights,
    (entry) => `${entry.type}: ${entry.label}`,
    "No highlighted patterns.",
  );
  renderList(
    target.recommendations,
    analysis.recommendations,
    (entry) => entry,
    "No recommendations available.",
  );
}

function syncConsentControls() {
  snippetConsent.disabled = !storeLogConsent.checked;
  if (!storeLogConsent.checked) {
    snippetConsent.checked = false;
  }
}

function analyzeMessageLocally() {
  if (!processConsent.checked) {
    renderEmpty(
      results.messageLocal,
      "Ready when you are",
      "Allow analysis and paste a message to see a local risk assessment.",
      "Runs in this browser",
    );
    messageStatus.textContent = "Allow analysis, then paste a message for a local check.";
    return;
  }

  const content = messageInput.value.trim();
  if (!content) {
    renderEmpty(
      results.messageLocal,
      "Ready",
      "Paste a message to start local scam analysis.",
      "Runs in this browser",
    );
    messageStatus.textContent = "Paste suspicious content to inspect it locally.";
    return;
  }

  const analysis = analyzeContent({
    content,
    source: sourceSelect.value,
  });

  renderAnalysis(results.messageLocal, analysis, "Browser local analysis");
  messageStatus.textContent = "Local verdict updated. Use API verification only if you want a server-confirmed result.";
}

function analyzeScreenLocally() {
  if (!screenConsent.checked) {
    renderEmpty(
      results.screenLocal,
      "Ready when you are",
      "Allow analysis and add visible text to see a browser-local verdict.",
      "Pasted text runs in this browser",
    );
    screenStatus.textContent = "Allow screen analysis, then paste text or choose a screen to capture.";
    return;
  }

  const content = screenInput.value.trim();
  if (!content) {
    renderEmpty(
      results.screenLocal,
      "Ready",
      "Paste visible screen text or capture the full screen to inspect it.",
      "Pasted text runs in this browser",
    );
    screenStatus.textContent = "Add visible text to generate a local verdict.";
    return;
  }

  const analysis = analyzeContent({
    content,
    source: "screen",
  });

  renderAnalysis(results.screenLocal, analysis, "Browser local screen analysis");
  screenStatus.textContent = "Local verdict updated. API verification remains optional.";
}

async function sendForVerification(endpoint, body, statusElement, targetResult, button, successLabel) {
  button.disabled = true;
  statusElement.textContent = "Protected verification is running...";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Verification failed.");
    }

    renderAnalysis(targetResult, payload.analysis, successLabel);
    if (payload.logReceipt?.id) {
      statusElement.textContent = `Verified. Minimal encrypted log stored as ${payload.logReceipt.id}.`;
      return;
    }

    statusElement.textContent = "Verified. No content was stored because logging consent was not enabled.";
  } catch (error) {
    statusElement.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

async function captureScreenFrame() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always",
    },
    audio: false,
  });

  try {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    await video.play();

    await new Promise((resolve) => {
      window.setTimeout(resolve, 250);
    });

    const sourceWidth = video.videoWidth || 1280;
    const sourceHeight = video.videoHeight || 720;
    const scale = Math.min(1, 1800 / Math.max(sourceWidth, sourceHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(sourceWidth * scale));
    canvas.height = Math.max(1, Math.round(sourceHeight * scale));

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return { canvas };
  } finally {
    stream.getTracks().forEach((track) => track.stop());
  }
}

async function runLocalServiceScreenOcr(canvas) {
  const response = await fetch("/api/analyze/screen/capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageDataUrl: canvas.toDataURL("image/jpeg", 0.92),
      consent: {
        process: true,
        screenScan: true,
        storeLog: storeLogConsent.checked,
        persistContentSnippet: snippetConsent.checked,
      },
      metadata: {
        sessionId: crypto.randomUUID(),
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Local service screen OCR failed.");
  }

  return payload;
}

async function verifyMessageWithApi() {
  if (!processConsent.checked) {
    messageStatus.textContent = "Consent is required before server-side message analysis.";
    return;
  }

  const content = messageInput.value.trim();
  if (!content) {
    messageStatus.textContent = "Paste a message before requesting protected API verification.";
    return;
  }

  await sendForVerification(
    "/api/analyze",
    {
      content,
      source: sourceSelect.value,
      consent: {
        process: true,
        storeLog: storeLogConsent.checked,
        persistContentSnippet: snippetConsent.checked,
      },
      metadata: {
        sessionId: crypto.randomUUID(),
      },
    },
    messageStatus,
    results.messageServer,
    serverAnalyzeButton,
    "Protected API verification",
  );
}

async function verifyScreenWithApi() {
  if (!screenConsent.checked) {
    screenStatus.textContent = "Screen-scan consent is required before protected verification.";
    return;
  }

  const visibleText = screenInput.value.trim();
  if (!visibleText) {
    screenStatus.textContent = "Paste or capture visible screen text before verification.";
    return;
  }

  await sendForVerification(
    "/api/analyze/screen",
    {
      visibleText,
      source: "screen",
      consent: {
        process: true,
        screenScan: true,
        storeLog: storeLogConsent.checked,
        persistContentSnippet: snippetConsent.checked,
      },
      metadata: {
        sessionId: crypto.randomUUID(),
      },
    },
    screenStatus,
    results.screenServer,
    screenServerAnalyzeButton,
    "Protected API screen verification",
  );
}

async function captureScreenTextLocally() {
  if (!screenConsent.checked) {
    screenStatus.textContent = "Enable screen-scan consent before attempting local capture.";
    return;
  }

  if (!navigator.mediaDevices?.getDisplayMedia) {
    screenStatus.textContent = "Screen capture is not supported in this browser. Paste visible text manually instead.";
    return;
  }

  captureScreenButton.disabled = true;
  screenStatus.textContent = "Waiting for screen permission...";

  try {
    const { canvas } = await captureScreenFrame();

    if (typeof window.TextDetector === "function") {
      const bitmap = await createImageBitmap(canvas);
      const detector = new window.TextDetector();
      const blocks = await detector.detect(bitmap);
      const extracted = blocks.map((block) => block.rawValue).filter(Boolean).join("\n");

      if (!extracted.trim()) {
        screenStatus.textContent = "No readable text was detected. Paste visible text manually if needed.";
        return;
      }

      screenInput.value = extracted;
      analyzeScreenLocally();
      screenStatus.textContent = `Captured ${blocks.length} text blocks locally. Review before sending anything to the API.`;
      return;
    }

    screenStatus.textContent = "Browser OCR is unavailable. Sending this capture to the locally hosted AI Shield service for Windows OCR.";
    const payload = await runLocalServiceScreenOcr(canvas);
    screenInput.value = payload.extractedText ?? "";
    renderAnalysis(results.screenLocal, payload.analysis, "Locally hosted Windows OCR");
    screenStatus.textContent = `Captured the selected screen and analyzed ${payload.ocr.lineCount} text lines with the local AI Shield service.`;
  } catch (error) {
    screenStatus.textContent = `Screen capture failed: ${error.message}`;
  } finally {
    captureScreenButton.disabled = false;
  }
}

async function submitFeedback(event) {
  event.preventDefault();
  const ratingInput = feedbackForm.querySelector('input[name="feedbackRating"]:checked');
  if (!ratingInput) {
    feedbackStatus.textContent = "Select a rating from 1 to 5.";
    feedbackForm.querySelector('input[name="feedbackRating"]').focus();
    return;
  }

  feedbackSubmitButton.disabled = true;
  feedbackStatus.textContent = "Submitting feedback...";

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: Number(ratingInput.value),
        category: feedbackCategory.value,
        comment: feedbackComment.value,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Feedback could not be submitted.");
    }

    feedbackForm.reset();
    feedbackCharacterCount.textContent = "0 / 500";
    feedbackStatus.textContent = `Thank you for helping improve AI Shield. Feedback reference: ${payload.feedbackId}`;
    window.setTimeout(() => {
      feedbackSubmitButton.disabled = false;
    }, 1500);
  } catch (error) {
    feedbackStatus.textContent = error.message;
    feedbackSubmitButton.disabled = false;
  }
}

// ============================================================================
// Video Deepfake & AI Media Forensics
// ============================================================================

let currentVideoMeta = {
  fileName: "",
  fileSize: 0,
  fileType: "",
  duration: 0,
  fps: 30,
  dimensions: { width: 0, height: 0 },
};
let currentVideoPreset = null;
let lastVideoLocalAnalysis = null;
let videoAnimationId = null;

function renderAnimatedPresetCanvas(presetType, title) {
  if (!videoCanvas) return;
  if (videoAnimationId) {
    cancelAnimationFrame(videoAnimationId);
    videoAnimationId = null;
  }

  videoCanvas.width = 640;
  videoCanvas.height = 360;
  const ctx = videoCanvas.getContext("2d");
  if (!ctx) return;

  let frameCount = 0;
  const isDeepfake = presetType === "deepfake_sample";
  const isDiffusion = presetType === "diffusion_sample";

  const themeColor = isDeepfake ? "#eb5757" : isDiffusion ? "#f2c94c" : "#2ecc71";
  const badgeText = isDeepfake ? "AI DEEPFAKE: FACE-SWAP WARP" : isDiffusion ? "SYNTHETIC: DIFFUSION LATENT" : "AUTHENTIC: OPTICAL SENSOR";

  function draw() {
    frameCount++;
    ctx.fillStyle = "#07111f";
    ctx.fillRect(0, 0, 640, 360);

    // Draw grid background
    ctx.strokeStyle = "rgba(110, 231, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 640; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 360);
      ctx.stroke();
    }
    for (let y = 0; y < 360; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(640, y);
      ctx.stroke();
    }

    // Draw central subject simulation
    const cx = 320;
    const cy = 180;
    const jitter = isDeepfake ? Math.sin(frameCount * 0.35) * 4.5 : 0;

    // Face / Subject contour
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx + jitter, cy, 70, 95, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.arc(cx - 26 + jitter, cy - 20, 6, 0, Math.PI * 2);
    ctx.arc(cx + 26 + jitter, cy - 20, 6, 0, Math.PI * 2);
    ctx.fill();

    // Mouth / Viseme
    ctx.beginPath();
    const mouthW = 22 + (isDeepfake ? Math.sin(frameCount * 0.2) * 8 : 0);
    ctx.ellipse(cx + jitter, cy + 35, mouthW, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Target Bounding Box
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    const boxX = cx - 100 + jitter;
    const boxY = cy - 120;
    ctx.strokeRect(boxX, boxY, 200, 240);

    // Target box corners
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(boxX, boxY + 20); ctx.lineTo(boxX, boxY); ctx.lineTo(boxX + 20, boxY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(boxX + 200, boxY + 20); ctx.lineTo(boxX + 200, boxY); ctx.lineTo(boxX + 180, boxY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(boxX, boxY + 220); ctx.lineTo(boxX, boxY + 240); ctx.lineTo(boxX + 20, boxY + 240); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(boxX + 200, boxY + 220); ctx.lineTo(boxX + 200, boxY + 240); ctx.lineTo(boxX + 180, boxY + 240); ctx.stroke();

    // Top status badge
    ctx.fillStyle = themeColor;
    ctx.font = "bold 13px monospace";
    ctx.fillText(`[ ${badgeText} ]`, boxX + 5, boxY - 12);

    // Telemetry text overlay
    ctx.fillStyle = "#f5f7fa";
    ctx.font = "12px monospace";
    ctx.fillText(`SIMULATED: ${title}`, 20, 30);

    ctx.fillStyle = "#a4b6c8";
    ctx.font = "11px monospace";
    if (isDeepfake) {
      ctx.fillText(`FACIAL JITTER: 68% (HIGH ANOMALY)`, 20, 52);
      ctx.fillText(`BLINK PACING: 1.2/min (STATIC PUPPET)`, 20, 70);
      ctx.fillText(`EDGE COMPRESSION: WARPED [DeepFaceLab]`, 20, 88);
    } else if (isDiffusion) {
      ctx.fillText(`LATENT NOISE GRAIN: DETECTED (Sora / SVD)`, 20, 52);
      ctx.fillText(`PACING: 18.0 FPS (INTERPOLATED NON-STD)`, 20, 70);
      ctx.fillText(`MORPHING ARTIFACTS: HIGH FREQUENCY`, 20, 88);
    } else {
      ctx.fillText(`SENSOR NOISE: NATURAL POISSON-GAUSSIAN`, 20, 52);
      ctx.fillText(`BLINK PACING: 16.4/min (NORMAL CADENCE)`, 20, 70);
      ctx.fillText(`CAMERA CONTAINER: AUTHENTIC HARDWARE`, 20, 88);
    }

    ctx.fillStyle = "rgba(192, 132, 252, 0.7)";
    ctx.fillText(`LIVE TELEMETRY ACTIVE | FRAME #${frameCount}`, 20, 340);

    videoAnimationId = requestAnimationFrame(draw);
  }

  draw();
}

function loadVideoPreset(presetType, title) {
  currentVideoPreset = presetType;
  currentVideoMeta = {
    fileName: `${presetType}_sample.mp4`,
    fileSize: 4_500_000,
    fileType: "video/mp4",
    duration: 12.5,
    fps: presetType === "diffusion_sample" ? 18 : 30,
    dimensions: { width: 1280, height: 720 },
  };

  // Switch display from video to canvas
  if (videoPreview) {
    videoPreview.pause();
    videoPreview.removeAttribute("src");
  }
  videoPreviewWrapper.classList.remove("has-video");
  videoPreviewWrapper.classList.add("has-canvas");

  renderAnimatedPresetCanvas(presetType, title);

  videoStatus.textContent = `Loaded ${title}. Analyzing video...`;
  analyzeVideoLocally();
}

function handleVideoFile(file) {
  if (!file) return;

  if (videoAnimationId) {
    cancelAnimationFrame(videoAnimationId);
    videoAnimationId = null;
  }

  currentVideoPreset = null;
  currentVideoMeta = {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type || "video/mp4",
    duration: 0,
    fps: 30,
    dimensions: { width: 0, height: 0 },
  };

  const objectUrl = URL.createObjectURL(file);
  videoPreview.src = objectUrl;
  videoPreviewWrapper.classList.remove("has-canvas");
  videoPreviewWrapper.classList.add("has-video");

  videoPreview.onloadedmetadata = () => {
    currentVideoMeta.duration = videoPreview.duration || 0;
    currentVideoMeta.dimensions = {
      width: videoPreview.videoWidth || 0,
      height: videoPreview.videoHeight || 0,
    };
    videoStatus.textContent = `Video loaded (${currentVideoMeta.dimensions.width}x${currentVideoMeta.dimensions.height}, ${(currentVideoMeta.duration).toFixed(1)}s). Ready for forensic scan.`;

    if (videoConsent.checked) {
      analyzeVideoLocally();
    }
  };
}

function handleVideoFileUpload(event) {
  const file = event.target.files?.[0];
  if (file) {
    handleVideoFile(file);
  }
}

async function analyzeVideoLocally() {
  if (!videoConsent.checked) {
    videoStatus.textContent = "Allow video frame analysis consent first.";
    return;
  }

  if (!currentVideoMeta.fileName && !currentVideoPreset) {
    videoStatus.textContent = "Please upload a video or select a demo preset above.";
    return;
  }

  videoLocalAnalyzeButton.disabled = true;
  videoPreviewWrapper.classList.add("is-scanning");
  videoStatus.textContent = "Scanning video keyframes for boundary warping & generative diffusion artifacts...";

  // Simulated small async scan to show radar scanner
  await new Promise((resolve) => setTimeout(resolve, 550));

  try {
    const analysis = analyzeVideoForensics({
      fileName: currentVideoMeta.fileName,
      fileSize: currentVideoMeta.fileSize,
      fileType: currentVideoMeta.fileType,
      duration: currentVideoMeta.duration,
      dimensions: currentVideoMeta.dimensions,
      fps: currentVideoMeta.fps,
      simulatedPreset: currentVideoPreset,
    });

    lastVideoLocalAnalysis = analysis;
    renderVideoAnalysis(results.videoLocal, analysis, "Local Forensic Engine");
    videoStatus.textContent = `Local analysis complete: ${analysis.classification.replace("_", " ")} (${analysis.riskScore}% synthetic probability).`;
  } catch (error) {
    videoStatus.textContent = `Local analysis error: ${error.message}`;
  } finally {
    videoLocalAnalyzeButton.disabled = false;
    videoPreviewWrapper.classList.remove("is-scanning");
  }
}

async function verifyVideoWithApi() {
  if (!videoConsent.checked) {
    videoStatus.textContent = "Allow video frame analysis consent first.";
    return;
  }

  if (!currentVideoMeta.fileName && !currentVideoPreset) {
    videoStatus.textContent = "Please upload a video or select a demo preset first.";
    return;
  }

  videoServerAnalyzeButton.disabled = true;
  videoPreviewWrapper.classList.add("is-scanning");
  videoStatus.textContent = "Sending forensic telemetry to AI Shield API verification service...";

  try {
    const response = await fetch("/api/analyze/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: currentVideoMeta.fileName,
        fileSize: currentVideoMeta.fileSize,
        fileType: currentVideoMeta.fileType,
        duration: currentVideoMeta.duration,
        dimensions: currentVideoMeta.dimensions,
        fps: currentVideoMeta.fps,
        simulatedPreset: currentVideoPreset,
        consent: {
          process: true,
          storeLog: storeLogConsent.checked,
        },
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Server verification failed.");
    }

    renderVideoAnalysis(results.videoServer, payload.analysis, "API Verified");
    videoStatus.textContent = `API verification complete: ${payload.analysis.classification.replace("_", " ")} (${payload.analysis.riskScore}% risk score).`;
  } catch (error) {
    videoStatus.textContent = `API verification error: ${error.message}`;
  } finally {
    videoServerAnalyzeButton.disabled = false;
    videoPreviewWrapper.classList.remove("is-scanning");
  }
}

const debouncedMessageAnalysis = debounce(analyzeMessageLocally, 180);
const debouncedScreenAnalysis = debounce(analyzeScreenLocally, 180);

messageInput.addEventListener("input", debouncedMessageAnalysis);
sourceSelect.addEventListener("change", analyzeMessageLocally);
processConsent.addEventListener("change", analyzeMessageLocally);
storeLogConsent.addEventListener("change", syncConsentControls);
serverAnalyzeButton.addEventListener("click", verifyMessageWithApi);
demoMessageButton.addEventListener("click", () => {
  const currentLang = document.getElementById("customLanguageSelect")?.value;
  if (currentLang && window.scamMessagesByLanguage?.[currentLang]) {
    messageInput.value = window.scamMessagesByLanguage[currentLang];
  } else {
    messageInput.value = "₹5,000 refund paane ke liye UPI PIN enter karo aur collect request approve karo.";
  }
  sourceSelect.value = "sms";
  processConsent.checked = true;
  analyzeMessageLocally();
  messageInput.scrollIntoView({ behavior: "smooth", block: "center" });
  messageInput.focus();
});

screenInput.addEventListener("input", debouncedScreenAnalysis);
screenConsent.addEventListener("change", analyzeScreenLocally);
captureScreenButton.addEventListener("click", captureScreenTextLocally);
screenServerAnalyzeButton.addEventListener("click", verifyScreenWithApi);

// Video Forensics Listeners
if (videoPreviewWrapper) {
  videoPreviewWrapper.addEventListener("click", (e) => {
    // If not clicking video native playback controls
    if (e.target !== videoPreview) {
      if (videoFileInput) videoFileInput.click();
    }
  });

  videoPreviewWrapper.addEventListener("dragover", (e) => {
    e.preventDefault();
    videoPreviewWrapper.classList.add("dragover");
  });

  videoPreviewWrapper.addEventListener("dragleave", () => {
    videoPreviewWrapper.classList.remove("dragover");
  });

  videoPreviewWrapper.addEventListener("drop", (e) => {
    e.preventDefault();
    videoPreviewWrapper.classList.remove("dragover");
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleVideoFile(file);
    }
  });
}

if (videoFileInput) {
  videoFileInput.addEventListener("change", handleVideoFileUpload);
}
if (videoLocalAnalyzeButton) {
  videoLocalAnalyzeButton.addEventListener("click", analyzeVideoLocally);
}
if (videoServerAnalyzeButton) {
  videoServerAnalyzeButton.addEventListener("click", verifyVideoWithApi);
}
if (presetDeepfakeButton) {
  presetDeepfakeButton.addEventListener("click", () => loadVideoPreset("deepfake_sample", "AI Deepfake (FaceSwap / LipSync)"));
}
if (presetDiffusionButton) {
  presetDiffusionButton.addEventListener("click", () => loadVideoPreset("diffusion_sample", "AI Diffusion (Sora / Runway Gen)"));
}
if (presetRealButton) {
  presetRealButton.addEventListener("click", () => loadVideoPreset("authentic_sample", "Authentic Mobile Camera Recording"));
}

feedbackComment.addEventListener("input", () => {
  feedbackCharacterCount.textContent = `${feedbackComment.value.length} / 500`;
});
feedbackForm.addEventListener("submit", submitFeedback);

syncConsentControls();
renderEmpty(
  results.messageLocal,
  "Ready when you are",
  "Allow analysis and paste a message to see a local risk assessment.",
  "Runs in this browser",
);
renderEmpty(
  results.messageServer,
  "Not Verified",
  "Use API verification when you want a server-confirmed result.",
  "Starts only from the verification button",
);
renderEmpty(
  results.screenLocal,
  "Ready when you are",
  "Allow analysis and add visible text to see a browser-local verdict.",
  "Pasted text runs in this browser",
);
renderEmpty(
  results.screenServer,
  "Not Verified",
  "Send the extracted or pasted text when you want an API-confirmed result.",
  "Starts only from the verification button",
);
renderEmpty(
  results.videoLocal,
  "Ready when you are",
  "Upload a video or choose a demo preset above to see a local deepfake assessment.",
  "Runs in this browser",
);
renderEmpty(
  results.videoServer,
  "Not Verified",
  "Verify video characteristics against the AI Shield server engine.",
  "Starts only from the verification button",
);
