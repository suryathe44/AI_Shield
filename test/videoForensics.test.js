import test from "node:test";
import assert from "node:assert/strict";
import { analyzeVideoForensics } from "../shared/videoForensicsEngine.js";

test("Video Forensics detects AI Deepfake signatures and boundary jitter", () => {
  const result = analyzeVideoForensics({
    fileName: "deepfake_roop_faceswap_speech.mp4",
    duration: 15,
    frameMetrics: {
      facialBoundaryJitter: 68,
      spectralNoiseRatio: 12,
      frequencyBlurIndex: 55,
      blinkRatePerMin: 1,
    },
  });

  assert.equal(result.classification, "AI_DEEPFAKE");
  assert.ok(result.riskScore >= 65);
  assert.ok(result.indicators.some((i) => i.type === "GENERATOR_SIGNATURE"));
  assert.ok(result.indicators.some((i) => i.type === "FACIAL_EDGE_WARPING"));
  assert.ok(result.indicators.some((i) => i.type === "ABNORMAL_BLINK_FREQUENCY"));
  assert.ok(result.alerts.length > 0);
  assert.ok(result.recommendations.some((r) => r.includes("transfer money")));
});

test("Video Forensics detects diffusion generative signatures (Sora/Runway)", () => {
  const result = analyzeVideoForensics({
    fileName: "sora_generative_diffusion_render.mp4",
    fps: 14.5,
    metadataTags: {
      prompt: "cinematic ultra detailed cyber street",
      sampler_name: "Euler",
    },
  });

  assert.equal(result.classification, "AI_DEEPFAKE");
  assert.ok(result.riskScore >= 65);
  assert.ok(result.indicators.some((i) => i.type === "GENERATOR_SIGNATURE"));
  assert.ok(result.indicators.some((i) => i.type === "METADATA_DIFFUSION_TAGS"));
});

test("Video Forensics classifies authentic mobile video as AUTHENTIC", () => {
  const result = analyzeVideoForensics({
    fileName: "IMG_20241024_114520.mp4",
    duration: 25,
    fps: 30,
    simulatedPreset: "authentic_sample",
  });

  assert.equal(result.classification, "AUTHENTIC");
  assert.ok(result.riskScore < 30);
  assert.equal(result.alerts.length, 0);
  assert.ok(result.explanation.some((e) => e.includes("sensor noise") || e.includes("camera")));
});

test("Video Forensics handles deepfake demo preset cleanly", () => {
  const result = analyzeVideoForensics({
    simulatedPreset: "deepfake_sample",
  });

  assert.equal(result.classification, "AI_DEEPFAKE");
  assert.ok(result.riskScore >= 70);
  assert.ok(result.indicators.length >= 2);
});
