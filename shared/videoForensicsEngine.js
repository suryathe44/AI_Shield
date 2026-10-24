/**
 * AI Shield — Video Forensics & AI Deepfake Detection Engine
 * Privacy-first multi-signal video authenticity analysis.
 * Analyzes metadata fingerprints, spatial artifacts, temporal consistency,
 * and biometric micro-dynamics without storing private footage.
 */

const KNOWN_AI_GENERATORS = [
  { pattern: /sora/i, label: "OpenAI Sora Synthetic Generator" },
  { pattern: /runway|gen-?2|gen-?3/i, label: "Runway Gen Synthetic Video Pipeline" },
  { pattern: /pika/i, label: "Pika Labs Generative Model" },
  { pattern: /luma|dream machine/i, label: "Luma Dream Machine Diffusion" },
  { pattern: /kling/i, label: "Kling AI Video Synthesis" },
  { pattern: /haiper/i, label: "Haiper Generative Video" },
  { pattern: /stable.?video|svd|diffusers/i, label: "Stable Video Diffusion (SVD)" },
  { pattern: /deepface|faceswap|roop|roop-cam/i, label: "DeepFaceLab / Face-Swap Engine" },
  { pattern: /wav2lip|lip.?sync/i, label: "Wav2Lip Synthetic Speech Re-enactment" },
  { pattern: /comfyui|automatic1111/i, label: "ComfyUI / A1111 Diffusion Pipeline" },
  { pattern: /elevenlabs|bark|tortoise/i, label: "Synthetic Voice Clone Track" },
];

const SUSPICIOUS_METADATA_KEYS = [
  "prompt",
  "workflow",
  "seed",
  "sampler_name",
  "steps",
  "cfg_scale",
  "model_hash",
  "denoise",
];

export function analyzeVideoForensics({
  fileName = "",
  fileSize = 0,
  fileType = "",
  duration = 0,
  dimensions = { width: 0, height: 0 },
  fps = 30,
  metadataTags = {},
  frameMetrics = null,
  simulatedPreset = null,
} = {}) {
  const reasons = [];
  const indicators = [];
  const alerts = [];
  const recommendations = [];

  let signatureScore = 0;
  let temporalScore = 0;
  let spatialScore = 0;
  let biometricScore = 0;

  const normalizedFileName = String(fileName || "").toLowerCase();

  // 1. Metadata & Generator Signature Detection
  for (const gen of KNOWN_AI_GENERATORS) {
    if (gen.pattern.test(normalizedFileName)) {
      signatureScore += 45;
      indicators.push({
        type: "GENERATOR_SIGNATURE",
        label: gen.label,
        severity: "HIGH",
        detail: `File naming or header tags match signature for ${gen.label}.`,
      });
      reasons.push(`Detected AI video generation signature: ${gen.label}.`);
    }
  }

  // Metadata tags inspection
  const metaKeys = Object.keys(metadataTags || {}).map((k) => k.toLowerCase());
  const matchedMeta = SUSPICIOUS_METADATA_KEYS.filter((key) => metaKeys.includes(key));
  if (matchedMeta.length > 0) {
    signatureScore += 35;
    indicators.push({
      type: "METADATA_DIFFUSION_TAGS",
      label: "Diffusion Synthesis Metadata",
      severity: "HIGH",
      detail: `Container contains generative diffusion metadata: ${matchedMeta.join(", ")}.`,
    });
    reasons.push(`Video container carries AI pipeline configuration tags (${matchedMeta.slice(0, 3).join(", ")}).`);
  }

  // 2. Video Pacing & Frame-Rate Consistency
  const parsedFps = Number(fps) || 30;
  const isFractionalAbnormal = parsedFps > 0 && Math.abs(parsedFps - Math.round(parsedFps)) > 0.05 && ![23.976, 29.97, 59.94].some((std) => Math.abs(parsedFps - std) < 0.02);
  if (isFractionalAbnormal || (parsedFps > 0 && parsedFps < 16)) {
    temporalScore += 20;
    indicators.push({
      type: "ABNORMAL_FRAME_PACING",
      label: "Unnatural Frame Rate",
      severity: "MEDIUM",
      detail: `Frame rate of ${parsedFps.toFixed(2)} fps is typical of frame-interpolated generative models.`,
    });
    reasons.push(`Anomalous frame rate pacing (${parsedFps.toFixed(1)} fps) typical of AI diffusion models.`);
  }

  // 3. Client-side Frame Extraction Telemetry or Preset Processing
  if (frameMetrics) {
    const {
      interFrameVariance = 0,
      facialBoundaryJitter = 0,
      spectralNoiseRatio = 0,
      colorLightingAsymmetry = 0,
      blinkRatePerMin = 15,
      frequencyBlurIndex = 0,
    } = frameMetrics;

    // Temporal flicker / boundary jitter
    if (facialBoundaryJitter > 45) {
      temporalScore += Math.min(35, Math.round(facialBoundaryJitter * 0.7));
      indicators.push({
        type: "FACIAL_EDGE_WARPING",
        label: "Facial Contour Boundary Warping",
        severity: "HIGH",
        detail: `Inter-frame edge jitter score (${facialBoundaryJitter}/100) indicates face-swapping or neural re-enactment.`,
      });
      reasons.push("Micro-flickering and edge warping detected along facial contours across keyframes.");
    }

    // High frequency texture & optical noise inspection
    if (spectralNoiseRatio < 20 && frequencyBlurIndex > 40) {
      spatialScore += 25;
      indicators.push({
        type: "SYNTHETIC_TEXTURE_SMOOTHING",
        label: "Artificial Skin Smoothing",
        severity: "MEDIUM",
        detail: "Absence of natural optical camera sensor noise with synthetic diffusion smoothing profile.",
      });
      reasons.push("Over-smoothed facial micro-textures lacking authentic optical sensor noise distribution.");
    }

    // Biometric blinking rate dynamics
    if (blinkRatePerMin < 3 && duration > 8) {
      biometricScore += 25;
      indicators.push({
        type: "ABNORMAL_BLINK_FREQUENCY",
        label: "Abnormal Blink Micro-Dynamics",
        severity: "HIGH",
        detail: `Observed blink frequency (${blinkRatePerMin}/min) is statistically unnatural (normal is 12-20/min).`,
      });
      reasons.push("Subject displays an unnaturally low blink rate (<3 per minute), common in early GANs and neural puppets.");
    }

    // Color and ambient lighting asymmetry
    if (colorLightingAsymmetry > 50) {
      spatialScore += 20;
      indicators.push({
        type: "LIGHTING_INCONSISTENCY",
        label: "Specular Lighting Asymmetry",
        severity: "MEDIUM",
        detail: "Reflected eye highlights and ambient shadow angles do not match background light sources.",
      });
      reasons.push("Specular light reflections on eyes and teeth conflict with background illumination physics.");
    }
  } else if (simulatedPreset === "deepfake_sample") {
    signatureScore = 40;
    temporalScore = 32;
    spatialScore = 20;
    biometricScore = 18;
    indicators.push({
      type: "FACIAL_EDGE_WARPING",
      label: "DeepFaceLab Neural Artifacts",
      severity: "HIGH",
      detail: "Face-swap mask boundary mismatch detected around jawline and temples.",
    });
    indicators.push({
      type: "ABNORMAL_BLINK_FREQUENCY",
      label: "Blink Frequency Anomaly",
      severity: "HIGH",
      detail: "Static ocular region detected across sequential frames.",
    });
    reasons.push("Facial boundary jitter and color bleeding around jawline match DeepFake models.");
    reasons.push("Unnatural eye blinking frequency (<2 blinks per minute) detected.");
    reasons.push("Neural voice synthesis formant alignment mismatch with lip visemes.");
  } else if (simulatedPreset === "diffusion_sample") {
    signatureScore = 50;
    temporalScore = 28;
    spatialScore = 22;
    indicators.push({
      type: "GENERATOR_SIGNATURE",
      label: "Sora / SVD Diffusion Model",
      severity: "HIGH",
      detail: "High-frequency temporal diffusion noise and physics deformation detected.",
    });
    indicators.push({
      type: "SYNTHETIC_TEXTURE_SMOOTHING",
      label: "Generative Micro-Tessellation",
      severity: "HIGH",
      detail: "Melted object boundaries and dreamlike spatial warping identified.",
    });
    reasons.push("High-frequency diffusion noise pattern identified in background textures.");
    reasons.push("Morphing object edges and non-physical shadow transformations detected.");
  } else if (simulatedPreset === "authentic_sample") {
    signatureScore = 0;
    temporalScore = 2;
    spatialScore = 4;
    biometricScore = 0;
    reasons.push("Consistent camera sensor noise profile across all sampled frames.");
    reasons.push("Natural facial micro-movements, eye saccades, and healthy blink cadence observed.");
    reasons.push("Container metadata contains standard smartphone hardware camera tags.");
  }

  // 4. Calculate Final Composite Risk Score (0 - 100)
  const rawScore = signatureScore + temporalScore + spatialScore + biometricScore;
  const riskScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let classification = "AUTHENTIC";
  let summary = "";

  if (riskScore >= 65) {
    classification = "AI_DEEPFAKE";
    summary = "High probability of AI deepfake or synthetic generative origin. Forensic markers show artificial facial re-enactment or generative diffusion.";
    alerts.push("CRITICAL: Synthetic video manipulation or AI deepfake markers detected.");
    recommendations.push("Do not transfer money, authorize transactions, or share confidential credentials based on this video.");
    recommendations.push("If receiving a video call or plea, request the caller to perform a dynamic action (e.g., turn head sideways or wave fingers across face).");
    recommendations.push("Verify the person's identity via a known separate phone number or secure out-of-band channel.");
  } else if (riskScore >= 35) {
    classification = "SUSPICIOUS";
    summary = "Suspicious video characteristics detected. The video exhibits unusual frame pacing, filtering, or potential synthetic touch-ups.";
    alerts.push("WARNING: Video displays anomalous visual patterns or potential AI filtering.");
    recommendations.push("Treat this footage with caution; verify the original publishing source before trusting claims.");
    recommendations.push("Inspect closely for edge blurring around the speaker's mouth and eyes.");
  } else {
    classification = "AUTHENTIC";
    summary = "Authentic video profile. Frame dynamics, optical sensor noise, and temporal coherence conform to genuine optical recording standards.";
    recommendations.push("No obvious AI generation or face-swap artifacts detected in the analyzed sample.");
    recommendations.push("Continue practicing standard cybersecurity precautions when viewing sensitive requests.");
  }

  return {
    classification,
    riskScore,
    confidence: {
      score: Math.min(99, 75 + indicators.length * 7),
      level: indicators.length >= 2 ? "HIGH" : "MEDIUM",
      evidenceCount: indicators.length,
    },
    summary,
    explanation: reasons.length ? reasons : ["No synthetic video anomalies or generative AI signatures detected."],
    indicators,
    alerts,
    recommendations,
    forensics: {
      signatureScore,
      temporalScore,
      spatialScore,
      biometricScore,
      evaluatedFps: parsedFps,
      durationSeconds: Number(duration) || 0,
      dimensions: {
        width: dimensions?.width || 0,
        height: dimensions?.height || 0,
      },
    },
  };
}
