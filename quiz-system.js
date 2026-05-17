// Quiz System for Gamified Learning
class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = -1;
        this.timeLeft = 30;
        this.timer = null;
        this.questions = [];
        this.loadQuizData();
    }

    async loadQuizData() {
        try {
            const response = await fetch('assets/data/quizzes.json');
            this.questions = await response.json();
        } catch (error) {
            console.error('Failed to load quiz data:', error);
            this.questions = this.getDefaultQuestions();
        }
    }

    getDefaultQuestions() {
        return {
            math: [
                {
                    question: "What is 2 + 2?",
                    options: ["3", "4", "5", "6"],
                    correct: 1,
                    explanation: "2 + 2 equals 4",
                    audio: "assets/audio/questions/math_q1.mp3"
                },
                {
                    question: "What is 5 × 3?",
                    options: ["12", "15", "18", "20"],
                    correct: 1,
                    explanation: "5 × 3 equals 15",
                    audio: "assets/audio/questions/math_q2.mp3"
                },
                {
                    question: "What is 10 ÷ 2?",
                    options: ["3", "4", "5", "6"],
                    correct: 2,
                    explanation: "10 ÷ 2 equals 5",
                    audio: "assets/audio/questions/math_q3.mp3"
                },
                {
                    question: "What is 7 - 3?",
                    options: ["3", "4", "5", "6"],
                    correct: 1,
                    explanation: "7 - 3 equals 4",
                    audio: "assets/audio/questions/math_q4.mp3"
                },
                {
                    question: "What is 6 + 4?",
                    options: ["8", "9", "10", "11"],
                    correct: 2,
                    explanation: "6 + 4 equals 10",
                    audio: "assets/audio/questions/math_q5.mp3"
                }
            ],
            science: [
                {
                    question: "What do plants need to make food?",
                    options: ["Water only", "Sunlight only", "Water and sunlight", "Soil only"],
                    correct: 2,
                    explanation: "Plants need both water and sunlight to make food through photosynthesis",
                    audio: "assets/audio/questions/science_q1.mp3"
                },
                {
                    question: "Which is the hottest planet?",
                    options: ["Earth", "Mars", "Venus", "Mercury"],
                    correct: 2,
                    explanation: "Venus is the hottest planet due to its thick atmosphere",
                    audio: "assets/audio/questions/science_q2.mp3"
                }
            ],
            odia: [
                {
                    question: "କେଉଁ ଋତୁରେ ବର୍ଷା ହୁଏ? (In which season does it rain?)",
                    options: ["ଶୀତ (Winter)", "ଗ୍ରୀଷ୍ମ (Summer)", "ବର୍ଷା (Monsoon)", "ଶରତ (Autumn)"],
                    correct: 2,
                    explanation: "ବର୍ଷା ଋତୁରେ ବର୍ଷା ହୁଏ (It rains in monsoon season)",
                    audio: "assets/audio/questions/odia_q1.mp3"
                }
            ],
            english: [
                {
                    question: "What is the opposite of 'big'?",
                    options: ["Large", "Small", "Huge", "Giant"],
                    correct: 1,
                    explanation: "Small is the opposite of big",
                    audio: "assets/audio/questions/english_q1.mp3"
                }
            ]
        };
    }

    startQuiz(subject) {
        const subjectQuestions = this.questions[subject];
        if (!subjectQuestions || subjectQuestions.length === 0) {
            alert('No questions available for this subject');
            return;
        }

        // Select 5 random questions or all if less than 5
        this.currentQuiz = subjectQuestions.slice(0, Math.min(5, subjectQuestions.length));
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = -1;

        showScreen('quiz');
        this.displayQuestion();
        this.startTimer();
    }

    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        
        // Update question counter
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.currentQuiz.length;
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Update answer options
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            const answerText = btn.querySelector('.answer-text');
            answerText.textContent = question.options[index];
            btn.classList.remove('selected', 'correct', 'incorrect');
            btn.disabled = false;
        });
        
        // Reset submit button
        const submitBtn = document.getElementById('submit-answer');
        submitBtn.disabled = true;
        submitBtn.style.display = 'block';
        
        // Reset selection
        this.selectedAnswer = -1;
        
        // Speak question if audio is enabled
        if (languageManager.audioEnabled) {
            setTimeout(() => {
                languageManager.speak(question.question);
            }, 500);
        }
    }

    selectAnswer(index) {
        // Remove previous selection
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selection to clicked answer
        const selectedBtn = document.getElementById(`answer-${index}`);
        selectedBtn.classList.add('selected');
        
        this.selectedAnswer = index;
        
        // Enable submit button
        document.getElementById('submit-answer').disabled = false;
        
        // Play selection sound
        audioManager.playSound('select');
    }

    submitAnswer() {
        if (this.selectedAnswer === -1) return;
        
        const question = this.currentQuiz[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.correct;
        
        // Show correct/incorrect styling
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === this.selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Update score
        if (isCorrect) {
            this.score++;
            audioManager.playSound('correct');
            this.showFeedback('Correct! Well done!', true);
        } else {
            audioManager.playSound('incorrect');
            this.showFeedback('Not quite right. The correct answer is highlighted.', false);
        }
        
        // Hide submit button and show next button
        const submitBtn = document.getElementById('submit-answer');
        submitBtn.style.display = 'none';
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
        
        this.stopTimer();
    }

    showFeedback(message, isCorrect) {
        // Create feedback element if it doesn't exist
        let feedbackEl = document.querySelector('.quiz-feedback');
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.className = 'quiz-feedback';
            document.querySelector('.quiz-content').appendChild(feedbackEl);
        }
        
        feedbackEl.textContent = message;
        feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackEl.style.display = 'block';
        
        // Speak feedback
        if (languageManager.audioEnabled) {
            languageManager.speak(message);
        }
        
        // Hide feedback after 2 seconds
        setTimeout(() => {
            feedbackEl.style.display = 'none';
        }, 2000);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.currentQuiz.length) {
            this.displayQuestion();
            this.startTimer();
        } else {
            this.endQuiz();
        }
    }

    endQuiz() {
        this.stopTimer();
        
        // Calculate percentage
        const percentage = Math.round((this.score / this.currentQuiz.length) * 100);
        
        // Update progress
        progressTracker.addXP(this.score * 10);
        progressTracker.addCoins(this.score * 2);
        
        // Show results
        this.showResults(percentage);
    }

    showResults(percentage) {
        showScreen('results');
        
        // Update score display
        document.getElementById('score-percentage').textContent = percentage;
        document.getElementById('correct-count').textContent = this.score;
        
        // Update score circle visual
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.setProperty('--score', `${percentage}%`);
        
        // Play celebration sound
        if (percentage >= 80) {
            audioManager.playSound('celebration');
        } else if (percentage >= 60) {
            audioManager.playSound('good_job');
        } else {
            audioManager.playSound('try_again');
        }
        
        // Speak results
        if (languageManager.audioEnabled) {
            const message = `You got ${this.score} out of ${this.currentQuiz.length} questions correct. That's ${percentage} percent!`;
            setTimeout(() => {
                languageManager.speak(message);
            }, 1000);
        }
    }

    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            timerEl.textContent = this.timeLeft;
            
            // Change color when time is running out
            if (this.timeLeft <= 10) {
                timerEl.style.color = '#E74C3C';
                timerEl.style.fontWeight = 'bold';
            } else {
                timerEl.style.color = '';
                timerEl.style.fontWeight = '';
            }
        }
    }

    timeUp() {
        this.stopTimer();
        
        // If no answer selected, mark as incorrect
        if (this.selectedAnswer === -1) {
            audioManager.playSound('time_up');
            this.showFeedback('Time\'s up! The correct answer is highlighted.', false);
            
            // Highlight correct answer
            const correctBtn = document.getElementById(`answer-${this.currentQuiz[this.currentQuestionIndex].correct}`);
            correctBtn.classList.add('correct');
            
            // Disable all buttons
            document.querySelectorAll('.answer-btn').forEach(btn => {
                btn.disabled = true;
            });
        } else {
            // Submit current answer
            this.submitAnswer();
        }
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    playQuestionAudio() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        if (question.audio) {
            audioManager.playAudio(question.audio);
        } else {
            languageManager.speak(question.question);
        }
    }
}

// Global Quiz System Instance
const quizSystem = new QuizSystem();

// Global Functions for HTML onclick handlers
function selectAnswer(index) {
    quizSystem.selectAnswer(index);
}

function submitAnswer() {
    quizSystem.submitAnswer();
}

function playQuestionAudio() {
    quizSystem.playQuestionAudio();
}

function retryQuiz() {
    // Restart the same quiz
    if (quizSystem.currentQuiz && quizSystem.currentQuiz.length > 0) {
        quizSystem.currentQuestionIndex = 0;
        quizSystem.score = 0;
        quizSystem.selectedAnswer = -1;
        
        showScreen('quiz');
        quizSystem.displayQuestion();
        quizSystem.startTimer();
    }
}

// CSS for quiz feedback
const feedbackStyles = `
.quiz-feedback {
    display: none;
    padding: 15px 25px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    animation: slideIn 0.3s ease-out;
}

.quiz-feedback.correct {
    background: #D5F4E6;
    color: #27AE60;
    border: 2px solid #27AE60;
}

.quiz-feedback.incorrect {
    background: #FADBD8;
    color: #E74C3C;
    border: 2px solid #E74C3C;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Add feedback styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = feedbackStyles;
document.head.appendChild(styleSheet);