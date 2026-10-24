/**
 * AI Shield - Native Multilingual Internationalization (i18n) Engine
 * Instant on-device UI translation for 11 regional and international languages.
 * Works 100% offline and connects with Google Translate fallback.
 */

export const UI_TRANSLATIONS = {
  en: {
    hero_eyebrow: "AI Shield",
    hero_title: "<span>Detect scams</span> before they cost you.",
    hero_lede: "AI Shield analyzes suspicious messages and visible screen text using local machine learning, behavioral signals, and security rules—while keeping sensitive content under your control.",
    pill_local: "Local-first analysis",
    pill_consent: "Consent-based processing",
    pill_scoring: "Explainable risk scoring",
    pill_logging: "Optional encrypted logging",
    hero_caption: "Built for Indian payment scams. Analysis stays on your device.",
    engine_title: "3-Layer Detection Engine",
    engine_ml_title: "Local ML classification",
    engine_ml_desc: "Scores language patterns in your browser.",
    engine_rules_title: "Rule-based threat detection",
    engine_rules_desc: "Checks known scam and phishing indicators.",
    engine_behavior_title: "Behavioral risk analysis",
    engine_behavior_desc: "Finds urgency, coercion, and impersonation.",
    engine_caption: "Three independent signal layers contribute to an explainable 0–100 risk score.",
    
    // Message Protection
    msg_kicker: "Message Protection",
    msg_title: "Inspect a message before you trust it",
    msg_note: "Paste suspicious content for a local verdict, then choose whether to verify it with the AI Shield API.",
    step_input: "Input",
    step_input_desc: "Paste an email, SMS, or chat message.",
    step_local: "Local check",
    step_local_desc: "Analysis runs in this browser after you opt in.",
    step_api: "API choice",
    step_api_desc: "Content is sent only when you select verification.",
    step_verdict: "Verdict",
    step_verdict_desc: "Review the score, detected reasons, and next steps.",
    demo_kicker: "Demo scam message",
    demo_title: "See how AI Shield catches a UPI collect scam",
    demo_desc: "Loads a fictional example into the analyzer. It contains no real account or personal data.",
    demo_btn: "Try this demo message",
    label_msg: "Message or content",
    placeholder_msg: "Paste an email, SMS, chat message, or suspicious prompt here.",
    btn_listen: "🔊 Listen to Message",
    btn_stop_audio: "⏹ Stop Audio",
    label_source: "Source",
    consent_title: "Analysis & storage choices",
    consent_process: "Allow local message analysis.",
    consent_store: "Store encrypted audit metadata after API verification.",
    consent_preview: "Also store a short encrypted content preview.",
    btn_verify_msg: "Verify Message with API",
    status_msg_ready: "Allow analysis, then paste a message for a local check.",
    
    // Results
    res_local_verdict: "Local Message Verdict",
    res_api_verdict: "Optional API Verification",
    res_reasons: "Detected reasons",
    res_patterns: "Suspicious patterns",
    res_actions: "Recommended actions",
    
    // Screen Analysis
    screen_kicker: "Screen Analysis",
    screen_title: "Check suspicious text on your screen",
    screen_note: "Paste visible text for a browser-local verdict, or capture a screen for OCR by the locally hosted AI Shield service.",
    screen_consent: "Allow screen-text analysis and capture.",
    screen_label: "Visible screen text",
    screen_placeholder: "Paste text visible on your screen, OCR output, or an SMS overlay here.",
    btn_screen_local: "Analyze Visible Screen Text",
    btn_screen_capture: "Capture Screen for Local OCR",
    btn_screen_api: "Verify Screen Text with API",
    
    // Video Forensics
    video_kicker: "AI Deepfake & Synthetic Video Inspection",
    video_title: "Analyze videos for AI face-swaps, deepfakes, and generative synthesis",
    video_note: "Extract video frames to inspect temporal consistency, facial boundary jitter, diffusion generative signatures, and synthetic audio artifacts locally.",
    video_preset_title: "Forensic test presets (click to load & inspect)",
    video_p1: "Preset 1: Deepfake Face Swap (Simulated)",
    video_p2: "Preset 2: AI Diffusion (Sora / Runway / Kling)",
    video_p3: "Preset 3: Authentic Camera Footage",
    video_consent: "Allow video frame extraction and deepfake forensic inspection.",
    video_upload_label: "Upload custom video (.mp4, .webm, .mov)",
    btn_video_local: "Analyze Video Locally",
    btn_video_api: "Verify Deepfake with API",
    video_res_local: "Local Video Authenticity Verdict",
    video_res_api: "Optional API Verification",
    
    // Feedback
    feedback_kicker: "Product Feedback",
    feedback_title: "Help improve AI Shield",
    feedback_note: "Share a rating and optional product comment. Feedback is separate from message analysis and screen verification.",
    btn_feedback_submit: "Submit Feedback"
  },
  
  hi: {
    hero_eyebrow: "AI शील्ड",
    hero_title: "<span>धोखाधड़ी पहचानें</span> नुकसान होने से पहले।",
    hero_lede: "AI Shield आपके डिवाइस पर स्थानीय मशीन लर्निंग, व्यवहार संकेतों और सुरक्षा नियमों से संदिग्ध संदेशों और स्क्रीन टेक्स्ट की जांच करता है।",
    pill_local: "लोकल-फर्स्ट विश्लेषण",
    pill_consent: "सहमति आधारित सुरक्षा",
    pill_scoring: "स्पष्ट रिस्क स्कोरिंग",
    pill_logging: "वैकल्पिक एन्क्रिप्टेड लॉगिंग",
    hero_caption: "भारतीय पेमेंट फ्रॉड के लिए निर्मित। जांच आपके डिवाइस पर ही रहती है।",
    engine_title: "3-स्तरीय सुरक्षा इंजन",
    engine_ml_title: "लोकल ML वर्गीकरण",
    engine_ml_desc: "ब्राउज़र में सीधे भाषा पैटर्न की जांच करता है।",
    engine_rules_title: "नियम आधारित खतरा पहचान",
    engine_rules_desc: "ज्ञात स्कैम और फ़िशिंग संकेतों को पकड़ता है।",
    engine_behavior_title: "व्यवहार जोखिम विश्लेषण",
    engine_behavior_desc: "जल्दबाज़ी, दबाव और प्रतिरूपण का पता लगाता है।",
    engine_caption: "तीन स्वतंत्र सिग्नल लेयर्स 0–100 का स्पष्ट रिस्क स्कोर तैयार करते हैं।",
    
    // Message Protection
    msg_kicker: "संदेश सुरक्षा",
    msg_title: "विश्वास करने से पहले संदेश की जांच करें",
    msg_note: "लोकल जांच के लिए संदिग्ध संदेश पेस्ट करें, फिर आवश्यकतानुसार AI Shield API से सत्यापित करें।",
    step_input: "इनपुट",
    step_input_desc: "संदिग्ध ईमेल, एसएमएस या चैट संदेश पेस्ट करें।",
    step_local: "लोकल जांच",
    step_local_desc: "सहमति देने पर ब्राउज़र में तुरंत विश्लेषण होता है।",
    step_api: "API विकल्प",
    step_api_desc: "डेटा केवल सत्यापन बटन दबाने पर ही जाता है।",
    step_verdict: "निर्णय",
    step_verdict_desc: "स्कोर, पाए गए कारण और सुरक्षा सुझाव देखें।",
    demo_kicker: "डेमो स्कैम संदेश",
    demo_title: "देखें AI Shield UPI कलेक्ट स्कैम को कैसे पकड़ता है",
    demo_desc: "एनालाइज़र में एक काल्पनिक उदाहरण लोड करता है। इसमें कोई वास्तविक डेटा नहीं है।",
    demo_btn: "यह डेमो संदेश आज़माएं",
    label_msg: "संदेश या सामग्री",
    placeholder_msg: "यहाँ ईमेल, एसएमएस, चैट संदेश या संदिग्ध प्रॉम्प्ट पेस्ट करें...",
    btn_listen: "🔊 संदेश सुनें",
    btn_stop_audio: "⏹ ऑडियो रोकें",
    label_source: "स्रोत",
    consent_title: "विश्लेषण और संग्रहण विकल्प",
    consent_process: "स्थानीय संदेश विश्लेषण की अनुमति दें।",
    consent_store: "API सत्यापन के बाद एन्क्रिप्टेड ऑडिट डेटा स्टोर करें।",
    consent_preview: "एक संक्षिप्त एन्क्रिप्टेड पूर्वावलोकन भी स्टोर करें।",
    btn_verify_msg: "API से संदेश सत्यापित करें",
    status_msg_ready: "अनुमति दें, फिर स्थानीय जांच के लिए संदेश पेस्ट करें।",
    
    // Results
    res_local_verdict: "स्थानीय संदेश निर्णय",
    res_api_verdict: "वैकल्पिक API सत्यापन",
    res_reasons: "पहचाने गए कारण",
    res_patterns: "संदिग्ध पैटर्न",
    res_actions: "सुझाए गए सुरक्षा कदम",
    
    // Screen Analysis
    screen_kicker: "स्क्रीन विश्लेषण",
    screen_title: "अपनी स्क्रीन पर संदिग्ध टेक्स्ट की जांच करें",
    screen_note: "ब्राउज़र में टेक्स्ट पेस्ट करें, या स्थानीय AI Shield सेवा द्वारा OCR के लिए स्क्रीन कैप्चर करें।",
    screen_consent: "स्क्रीन-टेक्स्ट विश्लेषण और कैप्चर की अनुमति दें।",
    screen_label: "दृश्य स्क्रीन टेक्स्ट",
    screen_placeholder: "अपनी स्क्रीन पर दिखने वाला टेक्स्ट या एसएमएस यहाँ पेस्ट करें...",
    btn_screen_local: "स्क्रीन टेक्स्ट की स्थानीय जांच करें",
    btn_screen_capture: "लोकल OCR के लिए स्क्रीन कैप्चर करें",
    btn_screen_api: "API से स्क्रीन टेक्स्ट सत्यापित करें",
    
    // Video Forensics
    video_kicker: "AI डीपफेक और वीडियो सत्यापन",
    video_title: "फेस-स्वैप, डीपफेक और AI जनरेटेड वीडियो का पता लगाएं",
    video_note: "चेहरे की सीमाओं, गति में असामान्यता और AI डिफ्यूजन जनरेशन के निशान स्थानीय रूप से फ्रेम-दर-फ्रेम जांचें।",
    video_preset_title: "फॉरेंसिक टेस्ट प्रीसेट (जांच के लिए क्लिक करें)",
    video_p1: "प्रीसेट 1: डीपफेक फेस स्वैप (सिम्युलेटेड)",
    video_p2: "प्रीसेट 2: AI डिफ्यूजन (सोरा / रनवे / क्लिंग)",
    video_p3: "प्रीसेट 3: असली कैमरा फुटेज",
    video_consent: "वीडियो फ्रेम निकालने और डीपफेक फॉरेंसिक जांच की अनुमति दें।",
    video_upload_label: "कस्टम वीडियो अपलोड करें (.mp4, .webm, .mov)",
    btn_video_local: "लोकल वीडियो विश्लेषण करें",
    btn_video_api: "API से डीपफेक सत्यापित करें",
    video_res_local: "स्थानीय वीडियो प्रामाणिकता निर्णय",
    video_res_api: "वैकल्पिक API सत्यापन",
    
    // Feedback
    feedback_kicker: "उत्पाद प्रतिक्रिया",
    feedback_title: "AI Shield को बेहतर बनाने में मदद करें",
    feedback_note: "रेटिंग और टिप्पणी साझा करें। प्रतिक्रिया संदेश विश्लेषण से पूर्णतः अलग है।",
    btn_feedback_submit: "फीडबैक सबमिट करें"
  },

  ta: {
    hero_eyebrow: "AI ஷீல்ட்",
    hero_title: "<span>மோசடிகளை கண்டறியவும்</span> பணத்தை இழக்கும் முன்.",
    hero_lede: "AI Shield உங்கள் சாதனத்தில் லோக்கல் மெஷின் லேர்னிங் மற்றும் பாதுகாப்பு விதிகள் மூலம் சந்தேகத்திற்கிடமான செய்திகளையும் திரையையும் ஆய்வு செய்கிறது.",
    pill_local: "லோக்கல்-முதல் பகுப்பாய்வு",
    pill_consent: "ஒப்புதல் அடிப்படையிலான பாதுகாப்பு",
    pill_scoring: "விளக்கக்கூடிய இடர் மதிப்பீடு",
    pill_logging: "விருப்ப என்க்ரிப்ட் செய்யப்பட்ட பதிவு",
    hero_caption: "இந்திய கட்டண மோசடிகளுக்காக உருவாக்கப்பட்டது. ஆய்வு உங்கள் சாதனத்திலேயே இருக்கும்.",
    engine_title: "3-அடுக்கு கண்டறிதல் எஞ்சின்",
    engine_ml_title: "லோக்கல் ML வகைப்பாடு",
    engine_ml_desc: "உங்கள் உலாவியில் மொழி வடிவங்களை மதிப்பீடு செய்கிறது.",
    engine_rules_title: "விதி அடிப்படையிலான அச்சுறுத்தல் கண்டறிதல்",
    engine_rules_desc: "அறியப்பட்ட ஃபிஷிங் மற்றும் மோசடி குறிகாட்டிகளை சரிபார்க்கிறது.",
    engine_behavior_title: "நடத்தை இடர் பகுப்பாய்வு",
    engine_behavior_desc: "அவசரம், மிரட்டல் மற்றும் ஆள்மாறாட்டத்தைக் கண்டறியும்.",
    engine_caption: "மூன்று அடுக்குகள் 0–100 தெளிவான இடர் மதிப்பெண்ணை வழங்குகின்றன.",
    msg_kicker: "செய்தி பாதுகாப்பு",
    msg_title: "நம்புவதற்கு முன் செய்தியை சரிபார்க்கவும்",
    msg_note: "உள்நாட்டு தீர்ப்புக்கு சந்தேகத்திற்கிடமான செய்தியை ஒட்டவும், பின்னர் API மூலம் சரிபார்க்கவும்.",
    demo_btn: "டெமோ செய்தியை முயற்சிக்கவும்",
    label_msg: "செய்தி அல்லது உள்ளடக்கம்",
    placeholder_msg: "மின்னஞ்சல், எஸ்எம்எஸ் அல்லது சந்தேகத்திற்கிடமான செய்தியை இங்கே ஒட்டவும்...",
    btn_listen: "🔊 செய்தியைக் கேளுங்கள்",
    btn_stop_audio: "⏹ ஆடியோவை நிறுத்து",
    btn_verify_msg: "API மூலம் சரிபார்க்கவும்",
    screen_kicker: "திரை பகுப்பாய்வு",
    screen_title: "உங்கள் திரையில் உள்ள சந்தேக உரையை சரிபார்க்கவும்",
    video_kicker: "AI டீப்ஃபேக் & வீடியோ ஆய்வு",
    video_title: "AI ஃபேஸ்-ஸ்வாப் மற்றும் டீப்ஃபேக் வீடியோக்களை பகுப்பாய்வு செய்யவும்",
    video_p1: "முன்னமைவு 1: டீப்ஃபேக் ஃபேஸ் ஸ்வாப்",
    video_p2: "முன்னமைவு 2: AI டிஃப்யூஷன் (Sora / Runway)",
    video_p3: "முன்னமைவு 3: உண்மையான கேமரா பதிவு",
    btn_video_local: "வீடியோவை உள்நாட்டில் பகுப்பாய்வு செய்யவும்",
    btn_video_api: "API மூலம் டீப்ஃபேக்கை சரிபார்க்கவும்",
    feedback_title: "AI Shield ஐ மேம்படுத்த உதவவும்",
    btn_feedback_submit: "கருத்தை சமர்ப்பிக்கவும்"
  },

  te: {
    hero_eyebrow: "AI షీల్డ్",
    hero_title: "<span>మోసాలను గుర్తించండి</span> నష్టం జరగకముందే.",
    hero_lede: "AI Shield స్థానిక మెషిన్ లెర్నింగ్ మరియు భద్రతా నిబంధనలతో అనుమానాస్పద సందేశాలను మీ పరికరంలోనే విశ్లేషిస్తుంది.",
    pill_local: "స్థానిక-మొదటి విశ్లేషణ",
    pill_consent: "సమ్మతి ఆధారిత భద్రత",
    pill_scoring: "వివరణాత్మక ప్రమాద స్కోరింగ్",
    pill_logging: "ఐచ్ఛిక ఎన్‌క్రిప్ట్ చేయబడిన లాగింగ్",
    hero_caption: "భారతీయ చెల్లింపు మోసాల కోసం ప్రత్యేకంగా రూపొందించబడింది.",
    engine_title: "3-అంచెల గుర్తింపు ఇంజిన్",
    engine_ml_title: "స్థానిక ML వర్గీకరణ",
    engine_ml_desc: "మీ బ్రౌజర్‌లోనే భాషా నమూనాలను తనిఖీ చేస్తుంది.",
    engine_rules_title: "నిబంధనల ఆధారిత ముప్పు గుర్తింపు",
    engine_rules_desc: "తెలిసిన ఫిషింగ్ మరియు స్కామ్ సంకేతాలను పట్టుకుంటుంది.",
    engine_behavior_title: "ప్రవర్తనా ప్రమాద విశ్లేషణ",
    engine_behavior_desc: "అత్యావశ్యకత, ఒత్తిడి మరియు మోసపూరిత గుర్తింపు.",
    msg_kicker: "సందేశ రక్షణ",
    msg_title: "నమ్మే ముందు సందేశాన్ని తనిఖీ చేయండి",
    demo_btn: "డెమో సందేశాన్ని ప్రయత్నించండి",
    label_msg: "సందేశం లేదా కంటెంట్",
    placeholder_msg: "అనుమానాస్పద సందేశాన్ని ఇక్కడ అతికించండి...",
    btn_listen: "🔊 సందేశాన్ని వినండి",
    btn_stop_audio: "⏹ ఆడియోను ఆపండి",
    btn_verify_msg: "API తో ధృవీకరించండి",
    screen_kicker: "స్క్రీన్ విశ్లేషణ",
    screen_title: "మీ స్క్రీన్‌పై అనుమానాస్పద వచనాన్ని తనిఖీ చేయండి",
    video_kicker: "AI డీప్‌ఫేక్ & వీడియో తనిఖీ",
    video_title: "AI ఫేస్-స్వాప్ మరియు డీప్‌ఫేక్ వీడియోలను విశ్లేషించండి",
    video_p1: "ప్రీసెట్ 1: డీప్‌ఫేక్ ఫేస్ స్వాప్",
    video_p2: "ప్రీసెట్ 2: AI డిఫ్యూజన్ (Sora / Runway)",
    video_p3: "ప్రీసెట్ 3: నిజమైన కెమెరా ఫుటేజ్",
    btn_video_local: "వీడియోను స్థానికంగా విశ్లేషించండి",
    btn_video_api: "API తో డీప్‌ఫేక్‌ను ధృవీకరించండి",
    feedback_title: "AI Shield ను మెరుగుపరచడంలో సహాయపడండి",
    btn_feedback_submit: "అభిప్రాయాన్ని సమర్పించండి"
  },

  mr: {
    hero_eyebrow: "AI शील्ड",
    hero_title: "<span>घोटाळे ओळखा</span> नुकसान होण्यापूर्वी.",
    hero_lede: "AI Shield स्थानिक मशीन लर्निंग आणि सुरक्षा नियमांद्वारे संशयास्पद संदेश आणि स्क्रीन मजकूराची थेट तपासणी करते.",
    pill_local: "स्थानिक-प्रथम विश्लेषण",
    pill_consent: "संमती-आधारित प्रक्रिया",
    pill_scoring: "स्पष्टीकरणात्मक जोखीम गुण",
    pill_logging: "पर्यायी एन्क्रिप्टेड लॉगिंग",
    hero_caption: "भारतीय पेमेंट घोटाळ्यांना रोखण्यासाठी डिझाइन केलेले.",
    engine_title: "3-स्तरीय तपासणी इंजिन",
    engine_ml_title: "स्थानिक ML वर्गीकरण",
    engine_ml_desc: "ब्राउझरमध्ये थेट भाषेच्या नमुन्यांची चाचणी घेते.",
    engine_rules_title: "नियम आधारित धोका ओळख",
    engine_rules_desc: "संशयास्पद स्कॅम आणि फिशिंगचे संकेत शोधते.",
    engine_behavior_title: "वर्तन जोखीम विश्लेषण",
    engine_behavior_desc: "तातडी, दबाव आणि तोतयागिरी ओळखते.",
    msg_kicker: "संदेश सुरक्षा",
    msg_title: "विश्वास ठेवण्यापूर्वी संदेश तपासा",
    demo_btn: "डेमो संदेश वापरून पहा",
    label_msg: "संदेश किंवा मजकूर",
    placeholder_msg: "येथे ईमेल, एसएमएस किंवा संशयास्पद संदेश पेस्ट करा...",
    btn_listen: "🔊 संदेश ऐका",
    btn_stop_audio: "⏹ ऑडिओ थांबवा",
    btn_verify_msg: "API सह संदेश सत्यापित करा",
    screen_kicker: "स्क्रीन विश्लेषण",
    screen_title: "स्क्रीनवरील संशयास्पद मजकूर तपासा",
    video_kicker: "AI डीपफेक आणि व्हिडिओ तपासणी",
    video_title: "फेस-स्वॅप आणि AI जनरेट केलेल्या व्हिडिओंची तपासणी करा",
    video_p1: "प्रीसेट 1: डीपफेक फेस स्वॅप",
    video_p2: "प्रीसेट 2: AI डिफ्यूजन (सोरा / रनवे)",
    video_p3: "प्रीसेट 3: अस्सल कॅमेरा फुटेज",
    btn_video_local: "स्थानिक पातळीवर व्हिडिओ तपासा",
    btn_video_api: "API सह डीपफेक सत्यापित करा",
    feedback_title: "AI Shield सुधारण्यात मदत करा",
    btn_feedback_submit: "अभिप्राय सबमिट करा"
  },

  bn: {
    hero_eyebrow: "AI শিল্ড",
    hero_title: "<span>প্রতারণা শনাক্ত করুন</span> ক্ষতির আগেই।",
    hero_lede: "AI Shield আপনার ডিভাইসে স্থানীয় মেশিন লার্নিং ব্যবহার করে সন্দেহজনক বার্তা এবং স্ক্রিন টেক্সট পরীক্ষা করে।",
    pill_local: "ডিভাইস-ভিত্তিক বিশ্লেষণ",
    pill_consent: "সম্মতি-ভিত্তিক প্রক্রিয়াকরণ",
    pill_scoring: "ব্যাখ্যাযোগ্য ঝুঁকি স্কোর",
    pill_logging: "ঐচ্ছিক এনক্রিপ্ট করা লগিং",
    hero_caption: "ভারতীয় পেমেন্ট জালিয়াতি প্রতিরোধের জন্য তৈরি।",
    engine_title: "৩-স্তরের সুরক্ষা ইঞ্জিন",
    engine_ml_title: "স্থানীয় ML শ্রেণীবিভাগ",
    engine_ml_desc: "ব্রাউজারে সরাসরি ভাষার প্যাটার্ন বিশ্লেষণ করে।",
    engine_rules_title: "নিয়ম-ভিত্তিক হুমকি সনাক্তকরণ",
    engine_rules_desc: "পরিচিত স্ক্যাম এবং ফিশিং সূচক পরীক্ষা করে।",
    engine_behavior_title: "আচরণগত ঝুঁকি বিশ্লেষণ",
    engine_behavior_desc: "জরুরিতা ও প্রতারণামূলক আচরণ শনাক্ত করে।",
    msg_kicker: "বার্তা সুরক্ষা",
    msg_title: "বিশ্বাস করার আগে বার্তা যাচাই করুন",
    demo_btn: "ডেমো বার্তা চেষ্টা করুন",
    label_msg: "বার্তা বা বিষয়বস্তু",
    placeholder_msg: "এখানে সন্দেহজনক বার্তা বা এসএমএস পেস্ট করুন...",
    btn_listen: "🔊 বার্তা শুনুন",
    btn_stop_audio: "⏹ অডিও বন্ধ করুন",
    btn_verify_msg: "API দিয়ে বার্তা যাচাই করুন",
    screen_kicker: "স্ক্রিন বিশ্লেষণ",
    screen_title: "স্ক্রিনের সন্দেহজনক পাঠ্য পরীক্ষা করুন",
    video_kicker: "AI ডিপফেক ও ভিডিও পরীক্ষা",
    video_title: "ফেস-সোয়াপ এবং AI জেনারেটেড ভিডিও বিশ্লেষণ করুন",
    video_p1: "প্রিসেট ১: ডিপফেক ফেস সোয়াপ",
    video_p2: "প্রিসেট ২: AI ডিফিউশন (Sora / Runway)",
    video_p3: "প্রিসেট ৩: আসল ক্যামেরা ফুটেজ",
    btn_video_local: "স্থানীয়ভাবে ভিডিও বিশ্লেষণ করুন",
    btn_video_api: "API দিয়ে ডিপফেক যাচাই করুন",
    feedback_title: "AI Shield উন্নত করতে সহায়তা করুন",
    btn_feedback_submit: "মতামত জমা দিন"
  },

  gu: {
    hero_eyebrow: "AI શીલ્ડ",
    hero_title: "<span>છેતરપિંડી પકડો</span> નુકસાન થાય તે પહેલાં.",
    hero_lede: "AI Shield તમારા ડિવાઇસ પર લોકલ મશીન લર્નિંગ દ્વારા શંકાસ્પદ સંદેશા અને સ્ક્રીનની ચકાસણી કરે છે.",
    pill_local: "લોકલ-પ્રથમ વિશ્લેષણ",
    pill_consent: "સંમતિ-આધારિત પ્રક્રિયા",
    pill_scoring: "સમજૂતીત્મક જોખમ સ્કોરિંગ",
    pill_logging: "વૈકલ્પિક એન્ક્રિપ્ટેડ લોગિંગ",
    hero_caption: "ભારતીય પેમેન્ટ ફ્રોડ અટકાવવા માટે ખાસ રચાયેલ.",
    engine_title: "3-સ્તરીય સુરક્ષા એન્જિન",
    msg_kicker: "સંદેશ સુરક્ષા",
    msg_title: "વિશ્વાસ કરતા પહેલા મેસેજ તપાસો",
    demo_btn: "આ ડેમો મેસેજ અજમાવો",
    label_msg: "સંદેશ અથવા સામગ્રી",
    placeholder_msg: "અહીં શંકાસ્પદ મેસેજ પેસ્ટ કરો...",
    btn_listen: "🔊 સંદેશ સાંભળો",
    btn_stop_audio: "⏹ ઓડિયો બંધ કરો",
    btn_verify_msg: "API વડે મેસેજ ચકાસો",
    screen_kicker: "સ્ક્રીન વિશ્લેષણ",
    screen_title: "તમારી સ્ક્રીન પર શંકાસ્પદ લખાણ તપાસો",
    video_kicker: "AI ડીપફેક અને વિડિયો ચકાસણી",
    video_title: "ફેસ-સ્વેપ અને AI જનરેટેડ વિડિયોનું વિશ્લેષણ કરો",
    video_p1: "પ્રીસેટ 1: ડીપફેક ફેસ સ્વેપ",
    video_p2: "પ્રીસેટ 2: AI ડિફ્યુઝન (Sora / Runway)",
    video_p3: "પ્રીસેટ 3: અસલ કેમેરા ફૂટેજ",
    btn_video_local: "વિડિયો સ્થાનિક રીતે ચકાસો",
    btn_video_api: "API વડે ડીપફેક ચકાસો",
    feedback_title: "AI Shield સુધારવામાં મદદ કરો",
    btn_feedback_submit: "પ્રતિસાદ સબમિટ કરો"
  },

  kn: {
    hero_eyebrow: "AI ಶೀಲ್ಡ್",
    hero_title: "<span>ವಂಚನೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ</span> ನಷ್ಟವಾಗುವ ಮುನ್ನ.",
    hero_lede: "AI Shield ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯ ಯಂತ್ರ ಕಲಿಕೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಸಂದೇಶಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.",
    pill_local: "ಸ್ಥಳೀಯ-ಮೊದಲ ವಿಶ್ಲೇಷಣೆ",
    pill_consent: "ಸಮ್ಮತಿ-ಆಧಾರಿತ ಪ್ರಕ್ರಿಯೆ",
    pill_scoring: "ವಿವರಣಾತ್ಮಕ ಅಪಾಯದ ಸ್ಕೋರಿಂಗ್",
    pill_logging: "ಐಚ್ಛಿಕ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಲಾಗಿಂಗ್",
    hero_caption: "ಭಾರತೀಯ ಪಾವತಿ ವಂಚನೆಗಳನ್ನು ತಡೆಗಟ್ಟಲು ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    engine_title: "3-ಹಂತದ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಎಂಜಿನ್",
    msg_kicker: "ಸಂದೇಶ ರಕ್ಷಣೆ",
    msg_title: "ನಂಬುವ ಮೊದಲು ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸಿ",
    demo_btn: "ಡೆಮೊ ಸಂದೇಶವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    label_msg: "ಸಂದೇಶ ಅಥವಾ ವಿಷಯ",
    placeholder_msg: "ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...",
    btn_listen: "🔊 ಸಂದೇಶವನ್ನು ಆಲಿಸಿ",
    btn_stop_audio: "⏹ ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    btn_verify_msg: "API ಮೂಲಕ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ",
    screen_kicker: "ಸ್ಕ್ರೀನ್ ವಿಶ್ಲೇಷಣೆ",
    screen_title: "ಪರದೆಯ ಮೇಲಿನ ಶಂಕಾಸ್ಪದ ಪಠ್ಯ ಪರಿಶೀಲಿಸಿ",
    video_kicker: "AI ಡೀಪ್‌ಫೇಕ್ ಮತ್ತು ವೀಡಿಯೊ ಪರಿಶೀಲನೆ",
    video_title: "ಮುಖ ಬದಲಾವಣೆ ಮತ್ತು AI ವೀಡಿಯೊಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    video_p1: "ಪೂರ್ವನಿಗದಿ 1: ಡೀಪ್‌ಫೇಕ್ ಮುಖ ಬದಲಾವಣೆ",
    video_p2: "ಪೂರ್ವನಿಗದಿ 2: AI ಡಿಫ್ಯೂಷನ್ (Sora / Runway)",
    video_p3: "ಪೂರ್ವನಿಗದಿ 3: ನೈಜ ಕ್ಯಾಮೆರಾ ವೀಡಿಯೊ",
    btn_video_local: "ವೀಡಿಯೊವನ್ನು ಸ್ಥಳೀಯವಾಗಿ ವಿಶ್ಲೇಷಿಸಿ",
    btn_video_api: "API ಮೂಲಕ ಡೀಪ್‌ಫೇಕ್ ಪರಿಶೀಲಿಸಿ",
    feedback_title: "AI Shield ಅನ್ನು ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡಿ",
    btn_feedback_submit: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸಿ"
  },

  pa: {
    hero_eyebrow: "AI ਸ਼ੀਲਡ",
    hero_title: "<span>ਧੋਖਾਧੜੀ ਪਛਾਣੋ</span> ਨੁਕਸਾਨ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ।",
    hero_lede: "AI Shield ਤੁਹਾਡੇ ਡਿਵਾਈਸ 'ਤੇ ਲੋਕਲ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਨਾਲ ਸ਼ੱਕੀ ਸੁਨੇਹਿਆਂ ਅਤੇ ਸਕ੍ਰੀਨ ਟੈਕਸਟ ਦੀ ਜਾਂਚ ਕਰਦਾ ਹੈ।",
    pill_local: "ਲੋਕਲ-ਪਹਿਲਾ ਵਿਸ਼ਲੇਸ਼ਣ",
    pill_consent: "ਸਹਿਮਤੀ-ਅਧਾਰਤ ਪ੍ਰਕਿਰਿਆ",
    pill_scoring: "ਸਪਸ਼ਟ ਜੋਖਮ ਸਕੋਰਿੰਗ",
    pill_logging: "ਵਿਕਲਪਿਕ ਏਨਕ੍ਰਿਪਟਡ ਲੌਗਿੰਗ",
    hero_caption: "ਭਾਰਤੀ ਪੇਮੈਂਟ ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਾਅ ਲਈ ਬਣਾਇਆ ਗਿਆ।",
    engine_title: "3-ਪੱਧਰੀ ਸੁਰੱਖਿਆ ਇੰਜਣ",
    msg_kicker: "ਸੁਨੇਹਾ ਸੁਰੱਖਿਆ",
    msg_title: "ਭਰੋਸਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸੁਨੇਹਾ ਜਾਂਚੋ",
    demo_btn: "ਡੈਮੋ ਸੁਨੇਹਾ ਅਜ਼ਮਾਓ",
    label_msg: "ਸੁਨੇਹਾ ਜਾਂ ਸਮੱਗਰੀ",
    placeholder_msg: "ਇੱਥੇ ਸ਼ੱਕੀ ਸੁਨੇਹਾ ਪੇਸਟ ਕਰੋ...",
    btn_listen: "🔊 ਸੁਨੇਹਾ ਸੁਣੋ",
    btn_stop_audio: "⏹ ਆਡੀਓ ਰੋਕੋ",
    btn_verify_msg: "API ਨਾਲ ਸੁਨੇਹਾ ਤਸਦੀਕ ਕਰੋ",
    screen_kicker: "ਸਕ੍ਰੀਨ ਵਿਸ਼ਲੇਸ਼ਣ",
    screen_title: "ਸਕ੍ਰੀਨ 'ਤੇ ਸ਼ੱਕੀ ਲਿਖਤ ਦੀ ਜਾਂਚ ਕਰੋ",
    video_kicker: "AI ਡੀਪਫੇਕ ਅਤੇ ਵੀਡੀਓ ਜਾਂਚ",
    video_title: "ਫੇਸ-ਸਵੈਪ ਅਤੇ AI ਜਨਰੇਟਿਡ ਵੀਡੀਓ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    video_p1: "ਪ੍ਰੀਸੈੱਟ 1: ਡੀਪਫੇਕ ਫੇਸ ਸਵੈਪ",
    video_p2: "ਪ੍ਰੀਸੈੱਟ 2: AI ਡਿਫਿਊਜ਼ਨ (Sora / Runway)",
    video_p3: "ਪ੍ਰੀਸੈੱਟ 3: ਅਸਲੀ ਕੈਮਰਾ ਫੁਟੇਜ",
    btn_video_local: "ਵੀਡੀਓ ਦੀ ਲੋਕਲ ਜਾਂਚ ਕਰੋ",
    btn_video_api: "API ਨਾਲ ਡੀਪਫੇਕ ਦੀ ਜਾਂਚ ਕਰੋ",
    feedback_title: "AI Shield ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰੋ",
    btn_feedback_submit: "ਫੀਡਬੈਕ ਸਬਮਿਟ ਕਰੋ"
  },

  es: {
    hero_eyebrow: "AI Shield",
    hero_title: "<span>Detecta estafas</span> antes de que te cuesten.",
    hero_lede: "AI Shield analiza mensajes sospechosos y texto visible en pantalla mediante aprendizaje automático local y reglas de seguridad.",
    pill_local: "Análisis local primero",
    pill_consent: "Procesamiento con consentimiento",
    pill_scoring: "Puntuación de riesgo explicable",
    pill_logging: "Registro cifrado opcional",
    hero_caption: "Creado para estafas de pago. El análisis se queda en tu dispositivo.",
    engine_title: "Motor de Detección de 3 Capas",
    msg_kicker: "Protección de Mensajes",
    msg_title: "Inspecciona un mensaje antes de confiar",
    demo_btn: "Probar este mensaje de demostración",
    label_msg: "Mensaje o contenido",
    placeholder_msg: "Pega un correo, SMS, mensaje de chat o texto sospechoso aquí...",
    btn_listen: "🔊 Escuchar Mensaje",
    btn_stop_audio: "⏹ Detener Audio",
    btn_verify_msg: "Verificar mensaje con API",
    screen_kicker: "Análisis de Pantalla",
    screen_title: "Revisa texto sospechoso en tu pantalla",
    video_kicker: "Inspección de Video Sintético y Deepfake IA",
    video_title: "Analiza videos para detectar face-swaps, deepfakes y síntesis IA",
    video_p1: "Preset 1: Deepfake Intercambio de Rostro",
    video_p2: "Preset 2: Difusión IA (Sora / Runway)",
    video_p3: "Preset 3: Grabación Real de Cámara",
    btn_video_local: "Analizar Video Localmente",
    btn_video_api: "Verificar Deepfake con API",
    feedback_title: "Ayuda a mejorar AI Shield",
    btn_feedback_submit: "Enviar Comentarios"
  },

  fr: {
    hero_eyebrow: "AI Shield",
    hero_title: "<span>Détectez les arnaques</span> avant qu’elles ne coûtent.",
    hero_lede: "AI Shield analyse les messages suspects et le texte à l'écran grâce à l'apprentissage automatique local et des règles de sécurité.",
    pill_local: "Analyse locale prioritaire",
    pill_consent: "Traitement basé sur le consentement",
    pill_scoring: "Score de risque explicable",
    pill_logging: "Journalisation chiffrée optionnelle",
    hero_caption: "Conçu contre les fraudes de paiement. L'analyse reste sur votre appareil.",
    engine_title: "Moteur de Détection à 3 Niveaux",
    msg_kicker: "Protection des Messages",
    msg_title: "Inspectez un message avant de lui faire confiance",
    demo_btn: "Essayer ce message de démo",
    label_msg: "Message ou contenu",
    placeholder_msg: "Collez un email, SMS ou message suspect ici...",
    btn_listen: "🔊 Écouter le message",
    btn_stop_audio: "⏹ Arrêter l'audio",
    btn_verify_msg: "Vérifier le message avec l'API",
    screen_kicker: "Analyse d'Écran",
    screen_title: "Vérifiez le texte suspect sur votre écran",
    video_kicker: "Inspection de Vidéo Synthétique et Deepfake IA",
    video_title: "Analysez les vidéos pour détecter les face-swaps, deepfakes et la génération IA",
    video_p1: "Préréglage 1 : Deepfake Face-Swap",
    video_p2: "Préréglage 2 : Diffusion IA (Sora / Runway)",
    video_p3: "Préréglage 3 : Vidéo Caméra Authentique",
    btn_video_local: "Analyser la Vidéo Localement",
    btn_video_api: "Vérifier le Deepfake avec l'API",
    feedback_title: "Aidez à améliorer AI Shield",
    btn_feedback_submit: "Envoyer des Commentaires"
  }
};

export const DEMO_SCAM_MESSAGES = {
  en: "URGENT: Your State Bank account is blocked due to incomplete KYC! To unblock immediately, approve the UPI collect request of Rs 1 and enter your 6-digit UPI PIN at: http://bit.ly/sbi-kyc-verify",
  hi: "अति आवश्यक: आपका State Bank खाता अधूरी KYC के कारण ब्लॉक कर दिया गया है! तुरंत अनब्लॉक करने के लिए, रु 1 का UPI कलेक्ट अनुरोध स्वीकार करें और अपना 6-अंकीय UPI PIN दर्ज करें: http://bit.ly/sbi-kyc-verify",
  ta: "முக்கியமானது: உங்கள் ஸ்டேட் பாங்க் கணக்கு முழுமையற்ற KYC காரணமாக முடக்கப்பட்டுள்ளது! உடனடியாக அன்பிளாக் செய்ய, ரூ 1 UPI கோரிக்கையை ஏற்று உங்கள் 6 இலக்க UPI பின்னை உள்ளிடவும்: http://bit.ly/sbi-kyc-verify",
  te: "ముఖ్య గమనిక: అసంపూర్ణ KYC కారణంగా మీ స్టేట్ బ్యాంక్ ఖాతా బ్లాక్ చేయబడింది! వెంటనే అన్‌బ్లాక్ చేయడానికి, రూ 1 UPI కలెక్ట్ అభ్యర్థనను ఆమోదించి, మీ 6 అంకెల UPI పిన్‌ను నమోదు చేయండి: http://bit.ly/sbi-kyc-verify",
  mr: "तात्काळ: अपूर्ण KYC मुळे तुमचे स्टेट बँक खाते ब्लॉक केले आहे! ताबडतोब अनब्लॉक करण्यासाठी, रु 1 ची UPI कलेक्ट विनंती मंजूर करा आणि तुमचा 6-अंकी UPI PIN प्रविष्ट करा: http://bit.ly/sbi-kyc-verify",
  bn: "জরুরী: অসম্পূর্ণ KYC-এর কারণে আপনার স্টেট ব্যাঙ্ক অ্যাকাউন্ট ব্লক করা হয়েছে! অবিলম্বে আনব্লক করতে, ১ টাকার UPI কালেক্ট অনুরোধ অনুমোদন করুন এবং আপনার ৬-সংখ্যার UPI পিন দিন: http://bit.ly/sbi-kyc-verify",
  gu: "અગત્યનું: અધૂરી KYC ને કારણે તમારું સ્ટેટ બેંક ખાતું બ્લોક કરવામાં આવ્યું છે! તાત્કાલિક અનબ્લોક કરવા માટે, રૂ 1 ની UPI વિનંતી મંજૂર કરો અને તમારો 6-અંકનો UPI પિન દાખલ કરો: http://bit.ly/sbi-kyc-verify",
  kn: "ತುರ್ತು: ಅಪೂರ್ಣ KYC ಕಾರಣದಿಂದ ನಿಮ್ಮ ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ! ತಕ್ಷಣವೇ ಅನ್‌ಬ್ಲಾಕ್ ಮಾಡಲು, ರೂ 1 UPI ವಿನಂತಿಯನ್ನು ಅನುಮೋದಿಸಿ ಮತ್ತು ನಿಮ್ಮ 6-ಅಂಕಿಯ UPI PIN ನಮೂದಿಸಿ: http://bit.ly/sbi-kyc-verify",
  pa: "ਜ਼ਰੂਰੀ: ਅਧੂਰੇ ਕੇਵਾਈਸੀ ਕਾਰਨ ਤੁਹਾਡਾ ਸਟੇਟ ਬੈਂਕ ਖਾਤਾ ਬੰਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ! ਤੁਰੰਤ ਚਾਲੂ ਕਰਨ ਲਈ, ₹1 ਦੀ UPI ਬੇਨਤੀ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰੋ ਅਤੇ ਆਪਣਾ 6-ਅੰਕਾਂ ਵਾਲਾ UPI ਪਿੰਨ ਦਰਜ ਕਰੋ: http://bit.ly/sbi-kyc-verify",
  es: "URGENTE: ¡Su cuenta bancaria ha sido bloqueada debido a KYC incompleto! Para desbloquearla de inmediato, apruebe la solicitud UPI de Rs 1 e ingrese su PIN UPI de 6 dígitos en: http://bit.ly/sbi-kyc-verify",
  fr: "URGENT : Votre compte bancaire est bloqué en raison d'un KYC incomplet ! Pour le débloquer immédiatement, approuvez la demande UPI de 1 Rs et entrez votre code PIN UPI à 6 chiffres sur : http://bit.ly/sbi-kyc-verify"
};

/**
 * Applies the selected language across all UI elements marked with data-i18n
 */
export function applyLanguage(langCode) {
  const dictionary = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS.en;
  
  document.documentElement.lang = langCode;
  
  // 1. Update text content and HTML for all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.innerHTML = dictionary[key];
    } else if (UI_TRANSLATIONS.en[key]) {
      el.innerHTML = UI_TRANSLATIONS.en[key];
    }
  });

  // 2. Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dictionary[key]) {
      el.placeholder = dictionary[key];
    }
  });

  // 3. Update Google Translate cookie for broader browser translation support
  try {
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    if (window.location.hostname) {
      document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;
    }
  } catch {}

  // 4. Trigger Google Translate combo if available
  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event("change"));
  }
}

// Make accessible globally
if (typeof window !== "undefined") {
  window.AI_SHIELD_I18N = {
    UI_TRANSLATIONS,
    DEMO_SCAM_MESSAGES,
    applyLanguage,
  };
}
