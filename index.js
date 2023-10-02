document.addEventListener("DOMContentLoaded", function () {
  const MAX_QUESTIONS = 10;
  const COUNTDOWN_SECONDS = 10;
  let currentQuestion;
  let interval;
  let timeLeft = COUNTDOWN_SECONDS;
  let score = 0;
  let questionsRemaining = MAX_QUESTIONS;

  const scoreElement = document.querySelector("#score");
  const userInput = document.querySelector("#user-input");
  const restartButton = document.querySelector("#restart-button");
  const equationElement = document.querySelector(".equation");

  const updateTimeLeft = (amount) => {
    timeLeft += amount;
  };

  const updateScore = (amount) => {
    score += amount;
    scoreElement.textContent = score;
  };

  const startGame = () => {
    if (!interval) {
      interval = setInterval(() => {
        updateTimeLeft(-1);
        if (timeLeft <= 0 || questionsRemaining <= 0) {
          clearInterval(interval);
          endGame();
        }
      }, 1000);
      renderNewQuestion();
    }
  };

  const randomNumberGenerator = (size) => {
    return Math.ceil(Math.random() * size);
  };

  const questionGenerator = () => {
    const num1 = randomNumberGenerator(10);
    const num2 = randomNumberGenerator(10);
    return {
      answer: num1 + num2,
      equation: `${num1} + ${num2}`,
    };
  };

  const renderNewQuestion = () => {
    currentQuestion = questionGenerator();
    equationElement.textContent = currentQuestion.equation;
  };

  const checkAnswer = () => {
    if (Number(userInput.value) === currentQuestion.answer) {
      renderNewQuestion();
      userInput.value = "";
      updateTimeLeft(1);
      updateScore(1);
      questionsRemaining--;
    }
  };

  const endGame = () => {
    userInput.disabled = true;
    restartButton.disabled = false;
  };

  userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      startGame();
      checkAnswer();
    }
  });

  restartButton.addEventListener("click", function () {
    clearInterval(interval);
    interval = null;
    timeLeft = COUNTDOWN_SECONDS;
    score = 0;
    questionsRemaining = MAX_QUESTIONS;
    scoreElement.textContent = score;
    userInput.disabled = false;
    restartButton.disabled = true;
    startGame();
  });

  startGame();
});
