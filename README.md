# 🛡️ AI Shield — Privacy-First Multimodal Scam & AI Deepfake Defense System

<div align="center">

### **Detect scams, fraud patterns, and AI deepfakes before they cost you.**

*A local-first, explainable cybersecurity shield combining on-device machine learning, rule-based heuristics, behavioral risk analysis, multimodal video forensics, and regional multilingual accessibility.*

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Tests](https://img.shields.io/badge/tests-66%2F66%20passing-2F80ED?logo=checkmarx&logoColor=white)](#automated-testing--code-quality)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20Consent--First-26C6DA)](#privacy--zero-trust-architecture)
[![Security](https://img.shields.io/badge/security-AES--256--GCM-blueviolet)](#cryptographic-security--audit-logging)
[![i18n](https://img.shields.io/badge/languages-11%20Supported-00E5FF)](#multilingual-accessibility--voice-reader)
[![Extension](https://img.shields.io/badge/extension-Manifest%20V3-orange?logo=googlechrome&logoColor=white)](#chrome-extension)

</div>

---

## 📑 Table of Contents

- [Vision & Real-World Impact](#vision--real-world-impact)
- [Key Features](#key-features)
- [Interactive System Architecture](#interactive-system-architecture)
- [Detection Engines](#detection-engines)
  - [1. 3-Layer Message & Text Engine](#1-3-layer-message--text-engine)
  - [2. AI Deepfake & Synthetic Video Forensics](#2-ai-deepfake--synthetic-video-forensics)
  - [3. Screen OCR Analysis](#3-screen-ocr-analysis)
- [Multilingual Accessibility & Voice Reader](#multilingual-accessibility--voice-reader)
- [Privacy & Zero-Trust Architecture](#privacy--zero-trust-architecture)
- [Cryptographic Security & Hardening](#cryptographic-security--hardening)
- [Chrome Extension (Manifest V3)](#chrome-extension)
- [Tech Yuva Buildathon Evaluation Alignment](#tech-yuva-buildathon-evaluation-alignment)
- [API Reference](#api-reference)
- [Local Setup & Quickstart](#local-setup--quickstart)
- [Automated Testing & Code Quality](#automated-testing--code-quality)
- [Project Structure](#project-structure)

---

## 🌟 Vision & Real-World Impact

India is experiencing an unprecedented surge in digital payment fraud, impersonation attacks, and AI-generated social engineering:
- **₹1,750+ Crore** lost to cyber fraud in early 2024 alone (I4C Ministry of Home Affairs data).
- **UPI Collect Scams & Fake KYC Traps**: Deceptive requests manipulating users into entering UPI PINs to "receive" funds or "unblock" bank accounts.
- **AI Deepfake Video & Voice Clones**: Hyper-realistic synthetic videos of executives, family members, or public figures used for extortion and financial fraud.
- **Language Barriers**: 80%+ of citizens consume content in regional Indian languages, making them vulnerable to deceptive multilingual SMS/WhatsApp forwards.

**AI Shield** solves this by providing an **on-device, zero-trust cybersecurity co-pilot** that inspects messages, visible screen text, and suspicious video recordings **without sending private user content to the cloud without explicit consent**.

---

## 🚀 Key Features

| Capability | Details |
|---|---|
| **3-Layer Scam Classification** | Naive Bayes NLP model + regex rule engine + behavioral risk heuristic generating an explainable **0–100 risk score** with **SAFE**, **SUSPICIOUS**, or **SCAM** verdicts. |
| **AI Deepfake Video Forensics** | Frame-by-frame temporal consistency, facial boundary warping jitter, diffusion generative artifact detection (Sora, Runway, Kling), and synthetic audio spectral inspection. |
| **Screen OCR Scanner** | Local extraction of text from payment apps, popups, and SMS screens via native Browser `TextDetector` with local Windows Media OCR fallback. |
| **Instant 11-Language i18n** | Zero-latency on-device translation for **English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Punjabi, Spanish, and French**. |
| **Voice Reader (TTS)** | Native text-to-speech audio reader with dialect matching for elderly and non-literate users to listen to warnings. |
| **Explainable Threat Mappings** | Transparent mapping to industry **MITRE ATT&CK** and **MITRE Fight Fraud Framework (F3)** candidate tactics. |
| **Zero-Trust Encrypted Logging** | Opt-in audit logs encrypted at rest using **AES-256-GCM** with **scrypt/HKDF** derived keys and cryptographic deletion. |
| **Standalone Chrome Extension** | Bundled 130 KB detector model in Manifest V3 format with zero network requests and strict `activeTab` sandboxing. |

---

## 🏗️ Interactive System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Browser & Chrome Extension)"]
        UI["Cyberpunk Dark UI / Pop-up"]
        LangDock["11-Language i18n Dock"]
        TTS["Voice Reader (SpeechSynthesis)"]
        CanvasVideo["Canvas Video Scanner HUD"]
    end

    subgraph InspectionEngines ["Client-Side Local Heuristics (Zero-Network)"]
        NB["Naive Bayes ML Classifier (130 KB embedded)"]
        Rules["Rule Engine (UPI, KYC, Defanged URLs, Brands)"]
        Behavior["Behavioral Engine (Urgency, Coercion, Authority)"]
        VideoEngine["Video Forensics (Temporal Jitter, Diffusion Artifacts)"]
    end

    subgraph ServerLayer ["AI Shield Hardened Backend (Node.js HTTP)"]
        RateLimit["IP Churn Bound Token Bucket Rate Limiter"]
        SecurityHeaders["Strict CSP + HSTS + CORS Origin Whitelist"]
        APIAnalyze["POST /api/analyze"]
        APIVideo["POST /api/analyze/video"]
        APIScreen["POST /api/analyze/screen/capture"]
        APIFeedback["POST /api/feedback (PostgreSQL + Local Store)"]
        AuditLog["AES-256-GCM Secure Encrypted Logger"]
    end

    UI --> LangDock
    UI --> TTS
    UI --> InspectionEngines
    CanvasVideo --> VideoEngine

    InspectionEngines -->|"Optional API Verification (Explicit Opt-In)"| RateLimit
    RateLimit --> SecurityHeaders
    SecurityHeaders --> APIAnalyze
    SecurityHeaders --> APIVideo
    SecurityHeaders --> APIScreen
    SecurityHeaders --> APIFeedback
    APIAnalyze --> AuditLog
```

---

## 🔬 Detection Engines

### 1. 3-Layer Message & Text Engine
1. **Local ML Classification (`shared/embeddedModel.js`)**:
   - Compact Naive Bayes probabilistic classifier trained on versioned phishing, smishing, and legit transaction corpora.
   - Evaluates token frequencies, vocabulary log-likelihoods, and token transitions without external API calls.
2. **Rule-Based Threat Detection (`shared/detectionEngine.js`)**:
   - Defanged URL detection, homoglyph attack prevention, risky TLD scanning (.top, .xyz, .click).
   - Brand display-name vs domain mismatch detection (e.g. "State Bank" sent from unrelated generic domain).
   - Specialized UPI collect-request heuristics (detecting requests disguised as refunds or cashback).
3. **Behavioral Risk Analysis**:
   - Scores psycho-emotional pressure: artificial deadlines ("within 15 minutes"), panic escalation ("account suspended"), fake law enforcement authority ("Police FIR / Court Order"), and secrecy instructions.

### 2. AI Deepfake & Synthetic Video Forensics (`shared/videoForensicsEngine.js`)
Detects cutting-edge AI video manipulations:
- **Facial Boundary & Mask Jitter**: Detects discontinuity and unnatural warping at jawlines and hairlines common in face-swap deepfakes (DeepFaceLab, SimSwap).
- **Temporal Inconsistency & Ghosting**: Tracks frame-to-frame pixel variance and optical flow anomalies.
- **Diffusion Generative Signatures**: Identifies smoothing, high-frequency spatial noise degradation, and morphing artifacts characteristic of models like **Sora, Runway Gen-3, Kling, and Pika**.
- **Synthetic Audio Desynchronization**: Inspects audio-video lip movement coherence and spectral audio anomalies.
- **Interactive Simulation Presets**: Built-in test presets (Simulated Face Swap, Diffusion Generation, Authentic Mobile Recording) with real-time green laser scanner HUD overlays.

### 3. Screen OCR Analysis
- Allows users to analyze full screen captures or pasted screenshots of banking apps, WhatsApp messages, or system prompts.
- Employs native browser `TextDetector` where supported, with automatic fallback to local Windows Media OCR via PowerShell for zero external third-party dependencies.

---

## 🌐 Multilingual Accessibility & Voice Reader

To protect every demographic across India, AI Shield features an **instant on-device internationalization (i18n) engine** ([public/i18n.js](public/i18n.js)):

- **Supported Languages**:
  - 🇮🇳 **हिंदी (Hindi)**
  - 🇮🇳 **தமிழ் (Tamil)**
  - 🇮🇳 **తెలుగు (Telugu)**
  - 🇮🇳 **मराठी (Marathi)**
  - 🇮🇳 **বাংলা (Bengali)**
  - 🇮🇳 **ગુજરાતી (Gujarati)**
  - 🇮🇳 **ಕನ್ನಡ (Kannada)**
  - 🇮🇳 **ਪੰਜਾਬੀ (Punjabi)**
  - 🌐 **English (US)**
  - 🇪🇸 **Español (Spanish)**
  - 🇫🇷 **Français (French)**
- **Zero-Latency Real-Time Switching**: Changes the entire interface (hero, detection meters, guidance, buttons, cards) in 0 milliseconds without internet dependency.
- **Regional Scam Auto-Load**: Selecting a language loads an authentic regional scam sample (e.g., Devanagari KYC SMS, Tamil UPI collect scam) for live demonstration.
- **Voice Reader (Text-to-Speech)**: Integrated `🔊 Listen to Message` toolbar speaks out the warning and message in the selected language dialect, empowering non-literate and visually impaired users.

---

## 🔐 Privacy & Zero-Trust Architecture

AI Shield adheres to a strict **Consent-First Zero-Trust Model**:

1. **Default On-Device Execution**: Analysis is computed in the client's V8 JavaScript engine. No data leaves the device unless the user explicitly checks the verification button.
2. **Granular Consent Checkboxes**:
   - `Allow local message analysis` (Required for local verdict).
   - `Store encrypted audit metadata after API verification` (Optional).
   - `Also store a short encrypted content preview` (Disabled by default; requires secondary explicit consent).
3. **No Third-Party Tracking**: Zero telemetry, zero external analytics, zero tracking cookies, zero external font/script dependencies that could leak IP addresses.

---

## 🛡️ Cryptographic Security & Hardening

All 14 security vulnerabilities identified during rigorous auditing have been mitigated:

- **Authenticated Symmetric Encryption**: `AES-256-GCM` with 96-bit random IVs and 128-bit authentication tags ensuring privacy and tamper resistance for log records.
- **Key Derivation Function**: Master keys derived using `scrypt` (N=32768, r=8, p=1) and `HKDF-SHA256` for cryptographically strong key separation.
- **Timing-Safe Authentication**: Constant-time string comparison (`crypto.timingSafeEqual`) on SHA-256 digests preventing side-channel timing attacks on admin routes.
- **Strict Content Security Policy (CSP)**:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com; style-src 'self' 'unsafe-inline' https://translate.googleapis.com; img-src 'self' data: blob: https://translate.google.com https://translate.googleapis.com https://www.google.com; media-src 'self' blob: data:; connect-src 'self' https://translate.googleapis.com; frame-src 'self' https://translate.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
  ```
- **HSTS Enforcement**: `Strict-Transport-Security: max-age=31536000` applied automatically to all HTTPS connections.
- **Anti-DoS Rate Limiting**: Fixed-window token bucket limiter with bounded IP map capacity and auto-eviction preventing memory exhaustion attacks.

---

## 🧩 Chrome Extension

AI Shield includes a standalone Chrome Extension built using **Manifest V3**:
- **Offline Self-Contained Model**: Bundles the 130 KB classification engine directly inside the extension package.
- **Minimal Permissions**: Requests only `activeTab` and `scripting` when the user clicks the extension popup.
- **Outgoing Network Isolation**: The extension manifest blocks all external network calls; all scans execute strictly inside the browser context.

### Installation Steps:
```bash
# 1. Build the standalone extension package
npm run build:extension

# 2. Open Google Chrome and navigate to:
chrome://extensions

# 3. Enable "Developer mode" (top right toggle)
# 4. Click "Load unpacked" and select the generated folder:
dist/chrome-extension
```

---

## 🏆 Tech Yuva Buildathon Evaluation Alignment

| Evaluation Criteria | Marks | AI Shield Implementation & Alignment |
|---|---|---|
| **1. Innovation & Creativity** | **10 Marks** | • First unified defense combining UPI/SMS text heuristics with **AI Deepfake Video Forensics**.<br>• Client-side privacy-first architecture that functions 100% offline.<br>• Native multilingual voice synthesis for non-literate and rural users. |
| **2. Technical Implementation** | **15 Marks** | • **66/66 automated tests passing** across detection, crypto, forensics, and API.<br>• Zero heavy frameworks—pure optimized Node.js HTTP with sub-millisecond response times.<br>• AES-256-GCM encryption with Scrypt/HKDF key derivation and timing-safe authentication. |
| **3. Problem-Solving & Relevance** | **10 Marks** | • Directly tackles India's #1 cyber threat: UPI collect fraud, fake KYC threats, and deepfake impersonation.<br>• Explainable scoring showing MITRE ATT&CK/F3 mappings so users understand *why* a message is dangerous.<br>• Dual client/server design allowing lightweight edge usage and enterprise audit trails. |
| **4. Presentation & Demonstration** | **10 Marks** | • High-impact Cyberpunk glassmorphism UI with live animated laser scanning HUD.<br>• 1-click live demo presets for UPI scams, face-swaps, and diffusion video generation.<br>• Dedicated [PITCH.md](PITCH.md) guide with elevator pitches, slide structures, and judges Q&A defense. |
| **5. Feasibility, Scalability & Impact** | **5 Marks** | • Minimal compute footprint: run on basic smartphones, budget laptops, or cloud containers.<br>• Deployable as a web service, browser extension, or mobile SDK.<br>• Immediate applicability for banks, fintech apps, telecom providers, and individual citizens. |

---

## 🔌 API Reference

### 1. `POST /api/analyze`
Analyze suspicious text or message content.
```bash
curl -X POST http://127.0.0.1:10000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "URGENT: Your SBI account is blocked! Approve UPI request of Rs 1: http://bit.ly/sbi-verify",
    "source": "sms",
    "consent": { "process": true, "storeLog": false }
  }'
```
**Response:**
```json
{
  "verdict": "SCAM",
  "riskScore": 92,
  "confidence": 0.95,
  "detectedReasons": [
    "High-pressure artificial urgency keyword identified",
    "Deceptive UPI collect request disguised as account verification",
    "Suspicious URL shortener link detected"
  ],
  "highlights": ["URGENT", "UPI request", "http://bit.ly/sbi-verify"],
  "recommendations": [
    "Do not click the link or approve any UPI collect request",
    "Bank accounts are never unblocked via UPI payments"
  ],
  "candidateFrameworkMappings": [
    { "framework": "MITRE ATT&CK", "technique": "T1566 - Phishing" }
  ]
}
```

### 2. `POST /api/analyze/video`
Forensically analyze video characteristics for deepfakes and generative AI synthesis.
```bash
curl -X POST http://127.0.0.1:10000/api/analyze/video \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "sample_deepfake.mp4",
    "durationSeconds": 6.5,
    "fps": 30,
    "indicators": {
      "faceWarpDetected": true,
      "facialBoundaryJitterScore": 0.88,
      "temporalInconsistencyScore": 0.82,
      "diffusionNoiseArtifactScore": 0.75,
      "syntheticAudioArtifact": true
    },
    "consent": { "process": true }
  }'
```

### 3. `POST /api/analyze/screen/capture`
Extracts and analyzes visible text from a submitted screen image capture via OCR.

### 4. `POST /api/feedback`
Submit product feedback and false-positive/negative reports.

---

## 💻 Local Setup & Quickstart

### Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher

### Installation
```bash
# 1. Clone or extract the repository
cd AI_shield-main

# 2. Install dependencies (optional; core app runs on zero external dependencies)
npm install

# 3. (Optional) Set a strong master key for durable encrypted logs
export AI_SHIELD_MASTER_KEY="your-super-strong-32-byte-master-key-here"

# 4. Start the AI Shield server
npm start
```

Open your browser at:
```text
http://127.0.0.1:10000
```

---

## 🧪 Automated Testing & Code Quality

AI Shield includes a comprehensive test suite covering unit tests, API integration tests, cryptographic validation, and deepfake forensic heuristics using the native Node.js test runner (`node:test`):

```bash
# Run the entire test suite
npm test
```

### Test Coverage Summary:
- **66 / 66 Automated Tests Passing** (0 Failures)
  - `test/videoForensics.test.js`: Face-swap detection, diffusion generation detection, authentic camera validation.
  - `test/detectionEngine.test.js`: Naive Bayes ML, Devanagari UPI fraud, brand domain mismatches, defanged URLs.
  - `test/crypto.test.js`: AES-256-GCM encryption at rest, envelope migration, log deletion.
  - `test/api.test.js`: HTTP endpoints, HSTS headers, input validation, client error boundaries.
  - `test/feedbackStore.test.js`: PostgreSQL adapter, TLS validation, sentiment metrics.
  - `test/securityAudit.test.js`: Rate limiting, timing-safe authentication, memory safety.

---

## 📁 Project Structure

```text
AI_shield-main/
├── dist/                     # Compiled standalone Chrome extension
├── docs/                     # Documentation, screenshots, store assets
├── extension/                # Chrome extension source files (Manifest V3)
├── public/                   # Frontend assets
│   ├── index.html            # Main Cyberpunk Web Dashboard
│   ├── styles.css            # Dark glassmorphic styles & laser HUD animations
│   ├── app.js                # Frontend controllers & Canvas scanner loop
│   ├── i18n.js               # 11-Language real-time translation dictionary
│   └── assets/               # High-res demo images & hero visual
├── shared/                   # Core shared detection logic (isomorphic)
│   ├── detectionEngine.js    # 3-Layer scam detection algorithms
│   ├── embeddedModel.js      # Compact Naive Bayes ML weights & tokenizer
│   └── videoForensicsEngine.js # AI Deepfake & generative video inspector
├── src/                      # Backend application server
│   ├── server.js             # HTTP server entry point
│   ├── app.js                # Request dispatcher & routing logic
│   ├── config/               # Environment & configuration parser
│   ├── routes/               # API endpoint route handlers
│   ├── services/             # Encryption, OCR, and storage services
│   └── utils/                # HTTP security headers, CSP, and rate limiters
├── test/                     # 66 Automated test suites
├── PITCH.md                  # Comprehensive Hackathon pitch guide & Q&A defense
└── package.json              # NPM configuration & scripts
```

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute for educational and security enhancement purposes.
