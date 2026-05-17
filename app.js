// Application Data
const appData = {
  "translations": {
    "en": {
      "welcome": "Welcome!",
      "choose_language": "Choose Your Language",
      "app_title": "Odisha Learning Adventure",
      "lessons": "Lessons",
      "quiz": "Quiz Time",
      "games": "Fun Games",
      "progress": "My Progress",
      "math": "Mathematics",
      "odia_lang": "Odia Language",
      "science": "Science",
      "english": "English",
      "level": "Level",
      "learn_new": "Learn Something New",
      "test_knowledge": "Test Your Knowledge",
      "play_learn": "Play and Learn",
      "see_achievements": "See Your Achievements",
      "choose_subject": "Choose a Subject",
      "question": "Question",
      "submit": "Submit Answer",
      "great_job": "Great Job!",
      "correct_answers": "Correct Answers",
      "rewards_earned": "Rewards Earned",
      "continue": "Continue Learning",
      "try_again": "Try Again",
      "loading": "Loading...",
      "preparing": "Preparing your adventure",
      "audio_help": "Audio Help",
      "time_left": "Time Left",
      "xp_earned": "XP Earned",
      "coins_earned": "Coins Earned",
      "level_up": "Level Up!",
      "back": "Back",
      "next": "Next",
      "settings": "Settings",
      "sound_on": "Sound On",
      "sound_off": "Sound Off",
      "high_contrast": "High Contrast"
    },
    "od": {
      "welcome": "ସ୍ୱାଗତ!",
      "choose_language": "ତୁମର ଭାଷା ବାଛ",
      "app_title": "ଓଡ଼ିଶା ଶିକ୍ଷା ଦୁଃସାହସିକ କାର୍ଯ୍ୟ",
      "lessons": "ପାଠ",
      "quiz": "କୁଇଜ ସମୟ",
      "games": "ମଜାଦାର ଖେଳ",
      "progress": "ମୋର ପ୍ରଗତି",
      "math": "ଗଣିତ",
      "odia_lang": "ଓଡ଼ିଆ ଭାଷା",
      "science": "ବିଜ୍ଞାନ",
      "english": "ଇଂରାଜୀ",
      "level": "ସ୍ତର",
      "learn_new": "ନୂତନ କିଛି ଶିଖ",
      "test_knowledge": "ତୁମର ଜ୍ଞାନ ପରୀକ୍ଷା କର",
      "play_learn": "ଖେଳ ଏବଂ ଶିଖ",
      "see_achievements": "ତୁମର ସଫଳତା ଦେଖ",
      "choose_subject": "ଗୋଟିଏ ବିଷୟ ବାଛ",
      "question": "ପ୍ରଶ୍ନ",
      "submit": "ଉତ୍ତର ଦାଖଲ କର",
      "great_job": "ବହୁତ ଭଲ!",
      "correct_answers": "ସଠିକ ଉତ୍ତର",
      "rewards_earned": "ପୁରସ୍କାର ପାଇଲ",
      "continue": "ଶିଖିବା ଜାରି ରଖ",
      "try_again": "ପୁଣି ଚେଷ୍ଟା କର",
      "loading": "ଲୋଡ ହେଉଛି...",
      "preparing": "ତୁମର ଦୁଃସାହସିକ କାର୍ଯ୍ୟ ପ୍ରସ୍ତୁତ କରୁଛି",
      "audio_help": "ଅଡିଓ ସାହାଯ୍ୟ",
      "time_left": "ବାକି ସମୟ",
      "xp_earned": "XP ପାଇଲ",
      "coins_earned": "ମୁଦ୍ରା ପାଇଲ",
      "level_up": "ସ୍ତର ବୃଦ୍ଧି!",
      "back": "ପଛକୁ",
      "next": "ଆଗକୁ",
      "settings": "ସେଟିଂ",
      "sound_on": "ଶବ୍ଦ ଚାଲୁ",
      "sound_off": "ଶବ୍ଦ ବନ୍ଦ",
      "high_contrast": "ଅଧିକ ବିପରୀତ"
    },
    "hi": {
      "welcome": "स्वागत!",
      "choose_language": "अपनी भाषा चुनें",
      "app_title": "ओडिशा शिक्षा रोमांच",
      "lessons": "पाठ",
      "quiz": "प्रश्नोत्तरी समय",
      "games": "मजेदार खेल",
      "progress": "मेरी प्रगति",
      "math": "गणित",
      "odia_lang": "ओडिया भाषा",
      "science": "विज्ञान",
      "english": "अंग्रेजी",
      "level": "स्तर",
      "learn_new": "कुछ नया सीखें",
      "test_knowledge": "अपना ज्ञान परखें",
      "play_learn": "खेलें और सीखें",
      "see_achievements": "अपनी उपलब्धियां देखें",
      "choose_subject": "एक विषय चुनें",
      "question": "प्रश्न",
      "submit": "उत्तर जमा करें",
      "great_job": "बहुत बढ़िया!",
      "correct_answers": "सही उत्तर",
      "rewards_earned": "पुरस्कार मिले",
      "continue": "सीखना जारी रखें",
      "try_again": "फिर कोशिश करें",
      "loading": "लोड हो रहा है...",
      "preparing": "आपका रोमांच तैयार कर रहे हैं",
      "audio_help": "ऑडियो सहायता",
      "time_left": "बचा समय",
      "xp_earned": "XP मिला",
      "coins_earned": "सिक्के मिले",
      "level_up": "लेवल अप!",
      "back": "वापस",
      "next": "आगे",
      "settings": "सेटिंग",
      "sound_on": "आवाज़ चालू",
      "sound_off": "आवाज़ बंद",
      "high_contrast": "उच्च कंट्रास्ट"
    }
  },
  "quizQuestions": {
    "math": [
      {
        "question": {
          "en": "Jagannath Temple has 4 main doors. If each door has 3 guards, how many guards are there in total?",
          "od": "ଜଗନ୍ନାଥ ମନ୍ଦିରର ୪ଟି ମୁଖ୍ୟ ଦ୍ୱାର ଅଛି। ପ୍ରତି ଦ୍ୱାରରେ ୩ ଜଣ ପ୍ରହରୀ ଅଛନ୍ତି। ମୋଟ କେତେ ପ୍ରହରୀ ଅଛନ୍ତି?",
          "hi": "जगन्नाथ मंदिर के 4 मुख्य दरवाजे हैं। यदि हर दरवाजे पर 3 गार्ड हैं, तो कुल कितने गार्ड हैं?"
        },
        "options": ["10", "12", "14", "16"],
        "correct": 1,
        "explanation": {
          "en": "4 doors × 3 guards = 12 guards total",
          "od": "୪ ଦ୍ୱାର × ୩ ପ୍ରହରୀ = ୧୨ ପ୍ରହରୀ",
          "hi": "4 दरवाजे × 3 गार्ड = 12 गार्ड कुल"
        }
      },
      {
        "question": {
          "en": "During Kali Puja, if 15 lamps are lit and 8 more are added, how many lamps are burning?",
          "od": "କାଳୀ ପୂଜାରେ ୧୫ଟି ଦୀପ ଜଳୁଛି ଏବଂ ଆଉ ୮ଟି ଯୋଗ କଲେ, କେତେ ଦୀପ ଜଳୁଛି?",
          "hi": "काली पूजा में 15 दीप जल रहे हैं और 8 और जोड़े गए हैं, कुल कितने दीप जल रहे हैं?"
        },
        "options": ["20", "23", "25", "28"],
        "correct": 1,
        "explanation": {
          "en": "15 + 8 = 23 lamps",
          "od": "ୁ୧୫ + ୮ = ୨୩ ଦୀପ",
          "hi": "15 + 8 = 23 दीप"
        }
      },
      {
        "question": {
          "en": "A farmer has 24 coconuts. He sells them in groups of 6. How many groups can he make?",
          "od": "ଜଣେ କୃଷକଙ୍କ ପାଖରେ ୨୪ଟି ନଡ଼ିଆ ଅଛି। ସେ ୬ଟି ଲେଖାଏଁ ଗୋଷ୍ଠୀରେ ବିକ୍ରି କରନ୍ତି। କେତେ ଗୋଷ୍ଠୀ ତିଆରି ହୋଇପାରିବ?",
          "hi": "एक किसान के पास 24 नारियल हैं। वह उन्हें 6-6 के समूह में बेचता है। कितने समूह बना सकता है?"
        },
        "options": ["3", "4", "5", "6"],
        "correct": 1,
        "explanation": {
          "en": "24 ÷ 6 = 4 groups",
          "od": "୨୪ ÷ ୬ = ୪ ଗୋଷ୍ଠୀ",
          "hi": "24 ÷ 6 = 4 समूह"
        }
      },
      {
        "question": {
          "en": "What is 7 × 8?",
          "od": "୭ × ୮ = କେତେ?",
          "hi": "7 × 8 = कितना?"
        },
        "options": ["54", "56", "58", "60"],
        "correct": 1,
        "explanation": {
          "en": "7 × 8 = 56",
          "od": "୭ × ୮ = ୫୬",
          "hi": "7 × 8 = 56"
        }
      },
      {
        "question": {
          "en": "If a boat can carry 12 people and there are 48 people waiting, how many trips are needed?",
          "od": "ଯଦି ଗୋଟିଏ ଡଙ୍ଗା ୧୨ ଜଣ ଲୋକଙ୍କୁ ନେଇପାରେ ଏବଂ ୪୮ ଜଣ ଲୋକ ଅପେକ୍ଷା କରୁଛନ୍ତି, କେତେ ଯାତ୍ରା ଦରକାର?",
          "hi": "यदि एक नाव 12 लोगों को ले जा सकती है और 48 लोग इंतजार कर रहे हैं, तो कितनी यात्राएं चाहिए?"
        },
        "options": ["3", "4", "5", "6"],
        "correct": 1,
        "explanation": {
          "en": "48 ÷ 12 = 4 trips",
          "od": "୪୮ ÷ ୧୨ = ୪ ଯାତ୍ରା",
          "hi": "48 ÷ 12 = 4 यात्राएं"
        }
      }
    ],
    "science": [
      {
        "question": {
          "en": "Which tree is considered most sacred in Odisha culture?",
          "od": "ଓଡ଼ିଶା ସଂସ୍କୃତିରେ କେଉଁ ଗଛ ସବୁଠାରୁ ପବିତ୍ର ବୋଲି ଧରାଯାଏ?",
          "hi": "ओडिशा संस्कृति में कौन सा पेड़ सबसे पवित्र माना जाता है?"
        },
        "options": ["Mango", "Banyan", "Coconut", "Neem"],
        "correct": 1,
        "explanation": {
          "en": "The Banyan tree is considered most sacred in Odisha culture",
          "od": "ବଟ ଗଛ ଓଡ଼ିଶା ସଂସ୍କୃତିରେ ସବୁଠାରୁ ପବିତ୍ର",
          "hi": "बरगद का पेड़ ओडिशा संस्कृति में सबसे पवित्र माना जाता है"
        }
      },
      {
        "question": {
          "en": "What do plants need to make their own food?",
          "od": "ଉଦ୍ଭିଦମାନେ ନିଜର ଖାଦ୍ୟ ତିଆରି କରିବା ପାଇଁ କଣ ଦରକାର?",
          "hi": "पौधे अपना भोजन बनाने के लिए क्या चाहते हैं?"
        },
        "options": ["Only water", "Only sunlight", "Sunlight and water", "Only soil"],
        "correct": 2,
        "explanation": {
          "en": "Plants need sunlight and water to make food through photosynthesis",
          "od": "ଉଦ୍ଭିଦମାନେ ଫଟୋସିନ୍ଥେସିସ୍ ମାଧ୍ୟମରେ ଖାଦ୍ୟ ତିଆରି କରିବା ପାଇଁ ସୂର୍ଯ୍ୟାଲୋକ ଏବଂ ପାଣି ଦରକାର",
          "hi": "प्रकाश संश्लेषण के द्वारा भोजन बनाने के लिए पौधों को सूर्य प्रकाश और पानी की जरूरत होती है"
        }
      },
      {
        "question": {
          "en": "During monsoon season in Odisha, what happens most?",
          "od": "ଓଡ଼ିଶାର ବର୍ଷା ଋତୁରେ କଣ ସବୁଠାରୁ ଅଧିକ ହୁଏ?",
          "hi": "ओडिशा में मानसून के मौसम में क्या सबसे ज्यादा होता है?"
        },
        "options": ["Snow falls", "Heavy rainfall", "Very hot weather", "Strong winds only"],
        "correct": 1,
        "explanation": {
          "en": "Heavy rainfall occurs during monsoon season",
          "od": "ବର୍ଷା ଋତୁରେ ପ୍ରବଳ ବର୍ଷା ହୁଏ",
          "hi": "मानसून के मौसम में भारी बारिश होती है"
        }
      }
    ],
    "odia_lang": [
      {
        "question": {
          "en": "What is 'Namaste' in Odia?",
          "od": "'ନମସ୍କାର' ଇଂରାଜୀରେ କଣ?",
          "hi": "ओडिया में 'नमस्ते' क्या होता है?"
        },
        "options": ["Dhanyabad", "Namaskar", "Asobad", "Bidaya"],
        "correct": 1,
        "explanation": {
          "en": "Namaskar means 'Namaste' in Odia",
          "od": "'ନମସ୍କାର' ଓଡ଼ିଆରେ 'ନମସ୍ତେ' ଅର୍ଥ",
          "hi": "ओडिया में नमस्कार का मतलब 'नमस्ते' होता है"
        }
      },
      {
        "question": {
          "en": "In which season does the famous Jagannath Rath Yatra take place?",
          "od": "ପ୍ରସିଦ୍ଧ ଜଗନ୍ନାଥ ରଥଯାତ୍ରା କେଉଁ ଋତୁରେ ହୁଏ?",
          "hi": "प्रसिद्ध जगन्नाथ रथ यात्रा किस ऋतु में होती है?"
        },
        "options": ["Winter", "Summer", "Monsoon", "Spring"],
        "correct": 1,
        "explanation": {
          "en": "Jagannath Rath Yatra takes place during summer (Ashadha month)",
          "od": "ଜଗନ୍ନାଥ ରଥଯାତ୍ରା ଗ୍ରୀଷ୍ମ ଋତୁରେ (ଆଷାଢ଼ ମାସରେ) ହୁଏ",
          "hi": "जगन्नाथ रथ यात्रा गर्मियों में (आषाढ़ माह में) होती है"
        }
      }
    ],
    "english": [
      {
        "question": {
          "en": "What is the opposite of 'big'?",
          "od": "'ବଡ଼'ର ବିପରୀତ ଶବ୍ଦ କଣ?",
          "hi": "'big' का विपरीत क्या है?"
        },
        "options": ["Large", "Small", "Huge", "Giant"],
        "correct": 1,
        "explanation": {
          "en": "Small is the opposite of big",
          "od": "'ଛୋଟ' ହେଉଛି 'ବଡ଼'ର ବିପରୀତ",
          "hi": "'Small' 'big' का विपरीत है"
        }
      },
      {
        "question": {
          "en": "Which word means 'friend' in English?",
          "od": "ଇଂରାଜୀରେ 'ବନ୍ଧୁ' ଅର୍ଥ କେଉଁ ଶବ୍ଦ?",
          "hi": "अंग्रेजी में 'मित्र' का अर्थ कौन सा शब्द है?"
        },
        "options": ["Enemy", "Friend", "Stranger", "Teacher"],
        "correct": 1,
        "explanation": {
          "en": "Friend means companion or buddy",
          "od": "'Friend' ଅର୍ଥ ବନ୍ଧୁ କିମ୍ବା ସାଙ୍ଗ",
          "hi": "'Friend' का अर्थ मित्र या दोस्त होता है"
        }
      }
    ]
  },
  "subjects": [
    {
      "id": "math",
      "name": {"en": "Mathematics", "od": "ଗଣିତ", "hi": "गणित"},
      "icon": "🔢",
      "progress": 75
    },
    {
      "id": "odia_lang", 
      "name": {"en": "Odia Language", "od": "ଓଡ଼ିଆ ଭାଷା", "hi": "ओडिया भाषा"},
      "icon": "📝",
      "progress": 60
    },
    {
      "id": "science",
      "name": {"en": "Science", "od": "ବିଜ୍ଞାନ", "hi": "विज्ञान"}, 
      "icon": "🔬",
      "progress": 45
    },
    {
      "id": "english",
      "name": {"en": "English", "od": "ଇଂରାଜୀ", "hi": "अंग्रेजी"},
      "icon": "🇬🇧", 
      "progress": 30
    }
  ],
  "gameConfig": {
    "xpPerQuestion": 10,
    "coinsPerQuestion": 2,
    "xpPerLevel": 100,
    "timerSeconds": 30,
    "questionsPerQuiz": 5
  }
};

// Global Application State
class LearningApp {
  constructor() {
    this.currentLanguage = 'en';
    this.audioEnabled = true;
    this.currentScreen = 'loading';
    this.currentSubject = null;
    this.currentQuestionIndex = 0;
    this.quizQuestions = [];
    this.userAnswers = [];
    this.timer = null;
    this.timeLeft = 30;
    this.selectedAnswer = null;
    
    // Load user progress from localStorage
    this.userProgress = this.loadProgress();
    
    // Initialize TTS
    this.tts = window.speechSynthesis;
    this.currentUtterance = null;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.startLoadingSequence();
  }
  
  // LocalStorage Management
  loadProgress() {
    const defaultProgress = {
      level: 1,
      xp: 0,
      coins: 0,
      subjectProgress: {
        math: 0,
        odia_lang: 0,
        science: 0,
        english: 0
      }
    };
    
    try {
      const saved = localStorage.getItem('odisha_learning_progress');
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch (error) {
      console.error('Error loading progress:', error);
      return defaultProgress;
    }
  }
  
  saveProgress() {
    try {
      localStorage.setItem('odisha_learning_progress', JSON.stringify(this.userProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }
  
  // Translation System
  translate(key) {
    return appData.translations[this.currentLanguage][key] || key;
  }
  
  updateAllTranslations() {
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[id]');
    translatableElements.forEach(element => {
      const key = this.getTranslationKey(element.id);
      if (key && appData.translations[this.currentLanguage][key]) {
        element.textContent = this.translate(key);
      }
    });
  }
  
  getTranslationKey(elementId) {
    const keyMap = {
      'welcome-title': 'welcome',
      'choose-lang-title': 'choose_language',
      'app-title': 'app_title',
      'lessons-title': 'lessons',
      'quiz-title': 'quiz',
      'games-title': 'games',
      'progress-title': 'progress',
      'lessons-desc': 'learn_new',
      'quiz-desc': 'test_knowledge',
      'games-desc': 'play_learn',
      'progress-desc': 'see_achievements',
      'choose-subject-title': 'choose_subject',
      'level-text': 'level',
      'back-text': 'back',
      'back-text-quiz': 'back',
      'submit-text': 'submit',
      'next-text': 'next',
      'great-job-title': 'great_job',
      'correct-answers-text': 'correct_answers',
      'rewards-title': 'rewards_earned',
      'xp-earned-text': 'xp_earned',
      'coins-earned-text': 'coins_earned',
      'continue-text': 'continue',
      'try-again-text': 'try_again',
      'level-up-title': 'level_up',
      'level-text-results': 'level',
      'loading-text': 'loading',
      'loading-subtitle': 'preparing',
      'audio-text': 'audio_help'
    };
    
    return keyMap[elementId];
  }
  
  // Text-to-Speech
  speak(text) {
    if (!this.audioEnabled || !this.tts) return;
    
    // Stop current speech
    this.tts.cancel();
    
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.rate = 0.8;
    this.currentUtterance.pitch = 1.1;
    
    // Set voice based on language
    const voices = this.tts.getVoices();
    let voice = null;
    
    if (this.currentLanguage === 'hi') {
      voice = voices.find(v => v.lang.includes('hi'));
    } else if (this.currentLanguage === 'en') {
      voice = voices.find(v => v.lang.includes('en'));
    }
    
    if (voice) {
      this.currentUtterance.voice = voice;
    }
    
    this.tts.speak(this.currentUtterance);
  }
  
  // Sound Effects
  playSound(type) {
    try {
      const audio = document.getElementById(`${type}-sound`);
      if (audio && this.audioEnabled) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    } catch (error) {
      console.log('Sound error:', error);
    }
  }
  
  // Screen Management
  showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      this.currentScreen = screenId;
    }
  }
  
  // Loading Sequence
  startLoadingSequence() {
    setTimeout(() => {
      this.showScreen('language-screen');
      this.speak(this.translate('welcome'));
    }, 2000);
  }
  
  // Event Listeners Setup
  setupEventListeners() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      this.attachEventListeners();
    });
    
    // If DOM is already ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.attachEventListeners();
      });
    } else {
      this.attachEventListeners();
    }
  }
  
  attachEventListeners() {
    // Language selection
    const languageButtons = document.querySelectorAll('.language-btn');
    languageButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.playSound('click');
        const lang = e.currentTarget.dataset.lang;
        this.setLanguage(lang);
        this.showMainMenu();
      });
    });
    
    // Audio toggle
    const audioToggleButtons = document.querySelectorAll('#audio-toggle, #audio-toggle-main');
    audioToggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleAudio();
      });
    });
    
    // Main menu buttons
    const quizBtn = document.getElementById('quiz-btn');
    if (quizBtn) {
      quizBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.showSubjectSelection();
      });
    }
    
    // Placeholder functionality for other menu items
    const menuButtons = ['lessons-btn', 'games-btn', 'progress-btn'];
    menuButtons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.playSound('click');
          this.showComingSoonModal();
        });
      }
    });
    
    // Navigation buttons
    const backToMenuBtn = document.getElementById('back-to-menu');
    if (backToMenuBtn) {
      backToMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.showMainMenu();
      });
    }
    
    const backToSubjectsBtn = document.getElementById('back-to-subjects');
    if (backToSubjectsBtn) {
      backToSubjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.showSubjectSelection();
      });
    }
    
    // Language toggle in main menu
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLanguageSelector();
      });
    }
    
    // Quiz functionality
    const submitBtn = document.getElementById('submit-answer');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.submitAnswer();
      });
    }
    
    const nextBtn = document.getElementById('next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextQuestion();
      });
    }
    
    // Results screen buttons
    const continueBtn = document.getElementById('continue-learning');
    if (continueBtn) {
      continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.showSubjectSelection();
      });
    }
    
    const tryAgainBtn = document.getElementById('try-again');
    if (tryAgainBtn) {
      tryAgainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.startQuiz(this.currentSubject);
      });
    }
    
    // Modal close buttons
    const closeComingSoonBtn = document.getElementById('close-coming-soon');
    if (closeComingSoonBtn) {
      closeComingSoonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideModal('coming-soon-modal');
      });
    }
    
    const closeLevelUpBtn = document.getElementById('close-level-up');
    if (closeLevelUpBtn) {
      closeLevelUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hideModal('level-up-modal');
      });
    }
    
    // Modal backdrop click to close
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
    
    // Initialize TTS voices
    if (this.tts) {
      this.tts.addEventListener('voiceschanged', () => {
        // Voices loaded
      });
    }
  }
  
  // Language Management
  setLanguage(lang) {
    this.currentLanguage = lang;
    this.updateAllTranslations();
    document.documentElement.lang = lang === 'od' ? 'or' : lang;
  }
  
  showLanguageSelector() {
    this.showScreen('language-screen');
  }
  
  // Audio Management
  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    const audioButtons = document.querySelectorAll('#audio-toggle, #audio-toggle-main');
    audioButtons.forEach(btn => {
      btn.innerHTML = this.audioEnabled ? '🔊 <span>' + this.translate('audio_help') + '</span>' : '🔇 <span>' + this.translate('audio_help') + '</span>';
    });
    
    if (!this.audioEnabled && this.tts) {
      this.tts.cancel();
    }
  }
  
  // Main Menu
  showMainMenu() {
    this.showScreen('main-menu');
    this.updateUserDisplay();
    this.updateAllTranslations();
    setTimeout(() => {
      this.speak(this.translate('app_title'));
    }, 500);
  }
  
  updateUserDisplay() {
    const level = Math.floor(this.userProgress.xp / appData.gameConfig.xpPerLevel) + 1;
    const xpInCurrentLevel = this.userProgress.xp % appData.gameConfig.xpPerLevel;
    const xpNeeded = appData.gameConfig.xpPerLevel;
    
    document.getElementById('user-level').textContent = level;
    document.getElementById('user-xp').textContent = xpInCurrentLevel;
    document.getElementById('xp-needed').textContent = xpNeeded;
    document.getElementById('user-coins').textContent = this.userProgress.coins;
    
    // Update XP progress bar
    const progressPercentage = (xpInCurrentLevel / xpNeeded) * 100;
    document.getElementById('xp-progress').style.width = progressPercentage + '%';
  }
  
  // Subject Selection
  showSubjectSelection() {
    this.showScreen('subject-screen');
    this.updateAllTranslations();
    this.renderSubjects();
    setTimeout(() => {
      this.speak(this.translate('choose_subject'));
    }, 300);
  }
  
  renderSubjects() {
    const container = document.getElementById('subjects-container');
    container.innerHTML = '';
    
    appData.subjects.forEach(subject => {
      const subjectCard = document.createElement('div');
      subjectCard.className = 'subject-card';
      subjectCard.dataset.subject = subject.id;
      
      const progress = this.userProgress.subjectProgress[subject.id] || 0;
      
      subjectCard.innerHTML = `
        <div class="subject-icon">${subject.icon}</div>
        <div class="subject-name">${subject.name[this.currentLanguage]}</div>
        <div class="progress-ring">
          <div class="progress-circle" style="background: conic-gradient(var(--color-primary-teal) ${progress * 3.6}deg, var(--color-secondary) 0deg)">
            ${progress}%
          </div>
        </div>
      `;
      
      subjectCard.addEventListener('click', (e) => {
        e.preventDefault();
        this.playSound('click');
        this.startQuiz(subject.id);
      });
      
      container.appendChild(subjectCard);
    });
  }
  
  // Quiz System
  startQuiz(subjectId) {
    this.currentSubject = subjectId;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.selectedAnswer = null;
    
    // Get questions for the subject
    const allQuestions = appData.quizQuestions[subjectId] || [];
    
    // Randomly select questions (up to questionsPerQuiz)
    this.quizQuestions = this.shuffleArray([...allQuestions])
      .slice(0, Math.min(appData.gameConfig.questionsPerQuiz, allQuestions.length));
    
    this.showScreen('quiz-screen');
    this.updateAllTranslations();
    setTimeout(() => {
      this.loadQuestion();
    }, 300);
  }
  
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  loadQuestion() {
    if (this.currentQuestionIndex >= this.quizQuestions.length) {
      this.showResults();
      return;
    }
    
    const question = this.quizQuestions[this.currentQuestionIndex];
    this.selectedAnswer = null;
    
    // Update question counter
    document.getElementById('question-counter').textContent = 
      `${this.translate('question')} ${this.currentQuestionIndex + 1}/${this.quizQuestions.length}`;
    
    // Update question text
    const questionText = question.question[this.currentLanguage];
    document.getElementById('question-text').textContent = questionText;
    
    // Render answer options
    this.renderAnswerOptions(question.options);
    
    // Reset submit button
    const submitBtn = document.getElementById('submit-answer');
    submitBtn.disabled = true;
    submitBtn.classList.remove('btn--primary');
    submitBtn.classList.add('btn--secondary');
    
    // Start timer
    this.startTimer();
    
    // Read question aloud
    setTimeout(() => {
      this.speak(questionText);
    }, 500);
  }
  
  renderAnswerOptions(options) {
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    
    options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'answer-option';
      optionBtn.textContent = option;
      optionBtn.dataset.index = index;
      
      optionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectAnswer(index, optionBtn);
      });
      
      container.appendChild(optionBtn);
    });
  }
  
  selectAnswer(index, buttonElement) {
    this.playSound('click');
    
    // Clear previous selections
    document.querySelectorAll('.answer-option').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Mark selected
    buttonElement.classList.add('selected');
    this.selectedAnswer = index;
    
    // Enable submit button
    const submitBtn = document.getElementById('submit-answer');
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn--secondary');
    submitBtn.classList.add('btn--primary');
  }
  
  startTimer() {
    this.timeLeft = appData.gameConfig.timerSeconds;
    this.updateTimerDisplay();
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 10) {
        document.querySelector('.timer-circle').classList.add('warning');
      }
      
      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }
  
  updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = this.timeLeft;
    }
  }
  
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const timerCircle = document.querySelector('.timer-circle');
    if (timerCircle) {
      timerCircle.classList.remove('warning');
    }
  }
  
  timeUp() {
    this.stopTimer();
    // Auto-submit with no answer
    this.selectedAnswer = null;
    this.submitAnswer();
  }
  
  submitAnswer() {
    if (this.currentQuestionIndex >= this.quizQuestions.length) return;
    
    this.stopTimer();
    const question = this.quizQuestions[this.currentQuestionIndex];
    const isCorrect = this.selectedAnswer === question.correct;
    
    // Store user answer
    this.userAnswers.push({
      questionIndex: this.currentQuestionIndex,
      selectedAnswer: this.selectedAnswer,
      correctAnswer: question.correct,
      isCorrect: isCorrect
    });
    
    // Show visual feedback
    this.showAnswerFeedback(question, isCorrect);
  }
  
  showAnswerFeedback(question, isCorrect) {
    // Highlight correct and incorrect answers
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((btn, index) => {
      if (index === question.correct) {
        btn.classList.add('correct');
      } else if (index === this.selectedAnswer && !isCorrect) {
        btn.classList.add('incorrect');
      }
      btn.disabled = true;
    });
    
    // Play sound
    this.playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Show feedback modal
    this.showFeedbackModal(question, isCorrect);
  }
  
  showFeedbackModal(question, isCorrect) {
    const modal = document.getElementById('feedback-modal');
    const icon = document.getElementById('feedback-icon');
    const title = document.getElementById('feedback-title');
    const explanation = document.getElementById('feedback-explanation');
    
    if (isCorrect) {
      icon.textContent = '✅';
      icon.className = 'feedback-icon correct';
      title.textContent = this.translate('great_job');
    } else {
      icon.textContent = '❌';
      icon.className = 'feedback-icon incorrect';
      title.textContent = 'Oops!';
    }
    
    explanation.textContent = question.explanation[this.currentLanguage];
    
    modal.classList.remove('hidden');
    
    // Read explanation aloud
    setTimeout(() => {
      this.speak(explanation.textContent);
    }, 500);
  }
  
  nextQuestion() {
    this.playSound('click');
    document.getElementById('feedback-modal').classList.add('hidden');
    
    this.currentQuestionIndex++;
    
    // Reset answer options styling
    document.querySelectorAll('.answer-option').forEach(btn => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      btn.disabled = false;
    });
    
    this.loadQuestion();
  }
  
  showResults() {
    const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = this.quizQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate rewards
    const xpEarned = correctAnswers * appData.gameConfig.xpPerQuestion;
    const coinsEarned = correctAnswers * appData.gameConfig.coinsPerQuestion;
    
    // Update user progress
    const previousLevel = Math.floor(this.userProgress.xp / appData.gameConfig.xpPerLevel) + 1;
    this.userProgress.xp += xpEarned;
    this.userProgress.coins += coinsEarned;
    
    // Update subject progress
    const newSubjectProgress = Math.max(
      this.userProgress.subjectProgress[this.currentSubject] || 0,
      percentage
    );
    this.userProgress.subjectProgress[this.currentSubject] = newSubjectProgress;
    
    const currentLevel = Math.floor(this.userProgress.xp / appData.gameConfig.xpPerLevel) + 1;
    const leveledUp = currentLevel > previousLevel;
    
    // Save progress
    this.saveProgress();
    
    // Show results screen
    this.showScreen('results-screen');
    this.updateAllTranslations();
    this.displayResults(correctAnswers, totalQuestions, percentage, xpEarned, coinsEarned, leveledUp, currentLevel);
    
    // Show floating rewards animation
    this.showFloatingRewards(xpEarned, coinsEarned);
    
    // Play celebration sound
    this.playSound('correct');
    
    // Read results aloud
    setTimeout(() => {
      this.speak(`${this.translate('great_job')} ${percentage}% ${this.translate('correct_answers')}`);
    }, 1000);
  }
  
  displayResults(correct, total, percentage, xp, coins, leveledUp, newLevel) {
    document.getElementById('score-percentage').textContent = percentage + '%';
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('xp-earned').textContent = xp;
    document.getElementById('coins-earned').textContent = coins;
    
    // Update score circle visual
    const scoreCircle = document.getElementById('score-percentage').parentElement;
    scoreCircle.style.background = `conic-gradient(var(--color-success-green) ${percentage * 3.6}deg, var(--color-secondary) 0deg)`;
    
    // Show level up modal if applicable
    if (leveledUp) {
      setTimeout(() => {
        document.getElementById('new-level').textContent = newLevel;
        document.getElementById('level-up-modal').classList.remove('hidden');
        this.speak(`${this.translate('level_up')} ${this.translate('level')} ${newLevel}`);
      }, 1500);
    }
  }
  
  showFloatingRewards(xp, coins) {
    // Create floating XP animation
    this.createFloatingText(`+${xp} XP`, '✨', 'var(--color-primary-teal)');
    
    // Create floating coins animation
    setTimeout(() => {
      this.createFloatingText(`+${coins}`, '🪙', 'var(--color-primary-yellow)');
    }, 500);
  }
  
  createFloatingText(text, icon, color) {
    const element = document.createElement('div');
    element.className = 'floating-reward';
    element.innerHTML = `${icon} ${text}`;
    element.style.color = color;
    element.style.left = Math.random() * (window.innerWidth - 200) + 100 + 'px';
    element.style.top = '50%';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
      element.remove();
    }, 2000);
  }
  
  // Modal Management
  showComingSoonModal() {
    const modal = document.getElementById('coming-soon-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.speak('Coming soon! This feature will be available soon.');
    }
  }
  
  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
  }
  
  // Keyboard Navigation
  handleKeyboardNavigation(e) {
    switch (e.key) {
      case 'Escape':
        // Close any open modal
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
          modal.classList.add('hidden');
        });
        break;
      case 'Enter':
        // Activate focused element
        if (document.activeElement && document.activeElement.click) {
          document.activeElement.click();
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
        // Quick answer selection in quiz
        if (this.currentScreen === 'quiz-screen') {
          const index = parseInt(e.key) - 1;
          const answerOptions = document.querySelectorAll('.answer-option');
          if (answerOptions[index]) {
            answerOptions[index].click();
          }
        }
        break;
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.learningApp = new LearningApp();
});

// Handle page unload to save progress
window.addEventListener('beforeunload', () => {
  if (window.learningApp) {
    window.learningApp.saveProgress();
  }
});