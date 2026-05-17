// Language Manager for Multilingual Support
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.audioEnabled = true;
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch('assets/data/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            this.translations = this.getDefaultTranslations();
        }
    }

    getDefaultTranslations() {
        return {
            en: {
                welcome: "Welcome!",
                app_title: "Odisha Learning Adventure",
                lessons: "Lessons",
                quiz: "Quiz Time",
                games: "Fun Games",
                progress: "My Progress",
                math: "Mathematics",
                odia_lang: "Odia Language",
                science: "Science",
                english: "English",
                level: "Level",
                learn_new: "Learn Something New",
                test_knowledge: "Test Your Knowledge",
                play_learn: "Play and Learn",
                see_achievements: "See Your Achievements",
                choose_subject: "Choose a Subject",
                question: "Question",
                submit: "Submit Answer",
                great_job: "Great Job!",
                correct_answers: "Correct Answers",
                rewards_earned: "Rewards Earned",
                continue: "Continue Learning",
                try_again: "Try Again",
                loading: "Loading...",
                preparing: "Preparing your adventure",
                audio_help: "Audio Help"
            },
            od: {
                welcome: "ସ୍ୱାଗତ!",
                app_title: "ଓଡ଼ିଶା ଶିକ୍ଷା ଦୁଃସାହସିକ କାର୍ଯ୍ୟ",
                lessons: "ପାଠ",
                quiz: "କୁଇଜ ସମୟ",
                games: "ମଜାଦାର ଖେଳ",
                progress: "ମୋର ପ୍ରଗତି",
                math: "ଗଣିତ",
                odia_lang: "ଓଡ଼ିଆ ଭାଷା",
                science: "ବିଜ୍ଞାନ",
                english: "ଇଂରାଜୀ",
                level: "ସ୍ତର",
                learn_new: "ନୂତନ କିଛି ଶିଖ",
                test_knowledge: "ତୁମର ଜ୍ଞାନ ପରୀକ୍ଷା କର",
                play_learn: "ଖେଳ ଏବଂ ଶିଖ",
                see_achievements: "ତୁମର ସଫଳତା ଦେଖ",
                choose_subject: "ଗୋଟିଏ ବିଷୟ ବାଛ",
                question: "ପ୍ରଶ୍ନ",
                submit: "ଉତ୍ତର ଦାଖଲ କର",
                great_job: "ବହୁତ ଭଲ!",
                correct_answers: "ସଠିକ ଉତ୍ତର",
                rewards_earned: "ପୁରସ୍କାର ପାଇଲ",
                continue: "ଶିଖିବା ଜାରି ରଖ",
                try_again: "ପୁଣି ଚେଷ୍ଟା କର",
                loading: "ଲୋଡ ହେଉଛି...",
                preparing: "ତୁମର ଦୁଃସାହସିକ କାର୍ଯ୍ୟ ପ୍ରସ୍ତୁତ କରୁଛି",
                audio_help: "ଅଡିଓ ସାହାଯ୍ୟ"
            },
            hi: {
                welcome: "स्वागत!",
                app_title: "ओडिशा शिक्षा रोमांच",
                lessons: "पाठ",
                quiz: "प्रश्नोत्तरी समय",
                games: "मजेदार खेल",
                progress: "मेरी प्रगति",
                math: "गणित",
                odia_lang: "ओडिया भाषा",
                science: "विज्ञान",
                english: "अंग्रेजी",
                level: "स्तर",
                learn_new: "कुछ नया सीखें",
                test_knowledge: "अपना ज्ञान परखें",
                play_learn: "खेलें और सीखें",
                see_achievements: "अपनी उपलब्धियां देखें",
                choose_subject: "एक विषय चुनें",
                question: "प्रश्न",
                submit: "उत्तर जमा करें",
                great_job: "बहुत बढ़िया!",
                correct_answers: "सही उत्तर",
                rewards_earned: "पुरस्कार मिले",
                continue: "सीखना जारी रखें",
                try_again: "फिर कोशिश करें",
                loading: "लोड हो रहा है...",
                preparing: "आपका रोमांच तैयार कर रहे हैं",
                audio_help: "ऑडियो सहायता"
            }
        };
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.updateAllText();
        this.announceLanguageChange();
    }

    updateAllText() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'od' ? 'or' : this.currentLanguage;
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage]?.[key] || 
               this.translations['en']?.[key] || 
               key;
    }

    announceLanguageChange() {
        if (this.audioEnabled) {
            const message = this.getTranslation('app_title');
            this.speak(message);
        }
    }

    speak(text) {
        if (!this.audioEnabled || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language-appropriate voice
        const voices = window.speechSynthesis.getVoices();
        const languageMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'od': 'hi-IN' // Fallback to Hindi for Odia
        };
        
        const preferredLang = languageMap[this.currentLanguage] || 'en-US';
        const voice = voices.find(v => v.lang.includes(preferredLang.split('-')[0]));
        
        if (voice) {
            utterance.voice = voice;
        }

        utterance.rate = 0.8; // Slower for children
        utterance.pitch = 1.1; // Slightly higher pitch
        utterance.volume = 0.8;

        window.speechSynthesis.speak(utterance);
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem('audioEnabled', this.audioEnabled);
        
        const audioIcon = document.querySelector('#audio-toggle img');
        if (audioIcon) {
            audioIcon.src = this.audioEnabled ? 
                'assets/images/icons/speaker.png' : 
                'assets/images/icons/speaker-off.png';
        }

        if (this.audioEnabled) {
            this.speak(this.getTranslation('audio_help'));
        }
    }

    loadUserPreferences() {
        const savedLang = localStorage.getItem('preferredLanguage');
        const savedAudio = localStorage.getItem('audioEnabled');
        
        if (savedLang && ['en', 'od', 'hi'].includes(savedLang)) {
            this.currentLanguage = savedLang;
        }
        
        if (savedAudio !== null) {
            this.audioEnabled = savedAudio === 'true';
        }
    }
}

// Global Language Manager Instance
const languageManager = new LanguageManager();

// Global Functions for HTML onclick handlers
function setLanguage(lang) {
    languageManager.setLanguage(lang);
    showScreen('main-menu');
}

function toggleLanguage() {
    const languages = ['en', 'od', 'hi'];
    const currentIndex = languages.indexOf(languageManager.currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    languageManager.setLanguage(languages[nextIndex]);
}

function toggleAudio() {
    languageManager.toggleAudio();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    languageManager.loadUserPreferences();
    languageManager.updateAllText();
    
    // Load voices when available
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Voices loaded, ready for speech
        };
    }
});