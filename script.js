// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    answer: "Blue Whale",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
];

// DOM elements
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");
const timerProgress = document.querySelector(".timer-progress");
const timerText = document.querySelector(".timer-text");
const scoreElement = document.querySelector(".score-container");
const quizContainer = document.querySelector(".quiz-container");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedOption = null;
let quizCompleted = false;

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizCompleted = false;
  scoreElement.textContent = `Score: ${score}`;
  showQuestion();
}

// Show current question
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("div");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectOption(option));
    optionsElement.appendChild(button);
  });

  startTimer();
}

// Reset question state
function resetState() {
  clearInterval(timer);
  timeLeft = 10;
  timerProgress.style.width = "100%";
  timerText.textContent = `Time left: ${timeLeft}s`;
  selectedOption = null;
  nextButton.disabled = true;

  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

// Start timer for current question
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time left: ${timeLeft}s`;
    timerProgress.style.width = `${(timeLeft / 10) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, 1000);
}

// Handle time up
function timeUp() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    if (option.textContent === questions[currentQuestionIndex].answer) {
      option.classList.add("correct");
    }
    option.style.cursor = "not-allowed";
  });
  nextButton.disabled = false;
}

// Select an option
function selectOption(option) {
  clearInterval(timer);
  const options = document.querySelectorAll(".option");
  const currentQuestion = questions[currentQuestionIndex];

  options.forEach((opt) => {
    opt.style.cursor = "not-allowed";
    if (opt.textContent === currentQuestion.answer) {
      opt.classList.add("correct");
    }
    if (opt.textContent === option && option !== currentQuestion.answer) {
      opt.classList.add("incorrect");
    }
  });

  selectedOption = option;

  if (option === currentQuestion.answer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  }

  nextButton.disabled = false;
}

// Show next question or results
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Show quiz results
function showResults() {
  quizCompleted = true;
  resetState();
  questionElement.textContent = `Quiz Completed! Your score: ${score}/${questions.length}`;
  optionsElement.innerHTML = "";

  nextButton.style.display = "none";

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("restart-btn");
  restartButton.addEventListener("click", startQuiz);
  quizContainer.appendChild(restartButton);
}

// Event listeners
nextButton.addEventListener("click", showNextQuestion);

// Start the quiz when page loads
startQuiz();
