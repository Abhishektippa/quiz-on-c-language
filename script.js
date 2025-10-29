const quizData = [
  { question: "Who developed the C language?", options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Ken Thompson"], correct: 1 },
  { question: "Which symbol ends a statement in C?", options: [".", ":", ";", ","], correct: 2 },
  { question: "Which is NOT a C data type?", options: ["int", "real", "char", "float"], correct: 1 },
  { question: "Function to print text in C?", options: ["echo()", "cout", "print()", "printf()"], correct: 3 },
  { question: "Header for printf()?", options: ["stdio.h", "conio.h", "iostream.h", "string.h"], correct: 0 },
  { question: "Size of int (most systems)?", options: ["2 bytes", "4 bytes", "6 bytes", "8 bytes"], correct: 1 },
  { question: "Loop guaranteed to execute once?", options: ["while", "do-while", "for", "if"], correct: 1 },
  { question: "Keyword for constant variable?", options: ["const", "define", "fixed", "let"], correct: 0 },
  { question: "Extension for C program?", options: [".cpp", ".py", ".c", ".java"], correct: 2 },
  { question: "Function to read input in C?", options: ["get()", "input()", "scanf()", "cin>>"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `⏱️ ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });
  updateProgress();
  startTimer();
}

function selectAnswer(index) {
  const q = quizData[currentQuestion];
  if (index === q.correct) score++;
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function updateProgress() {
  const progress = ((currentQuestion) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultEl.classList.remove("hidden");
  progressBar.style.width = "100%";
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  loadQuestion();
});

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
