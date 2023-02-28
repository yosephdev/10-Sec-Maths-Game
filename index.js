$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  $('#restart-button').on('click', function () {
    if (interval) {
      clearInterval(interval);
    }
    timeLeft = 10;
    $('#time-left').text(timeLeft);
    score = 0;
    $('#score').text(score);
    renderNewQuestion()
  });

  // change the color of the equation
  $('#equation').css('color', '#27ae60');
  
  // animate the time-left value on load
  $('#time-left').animate({ fontSize: '100px' }, 1000, function() {
    $(this).animate({ fontSize: '40px' }, 1000);
  });
  
  // change the background color of the insertBox div
  $('.insertBox').css('background-color', '#ecf0f1');
  
  // add hover effect on restart button
  $('#restart-button').hover(function() {
    $(this).css('background-color', '#8e44ad');
  }, function() {
    $(this).css('background-color', '#9b59b6');
  });
  
  // add border to user-input field
  $('#user-input').css('border', '2px solid #34495e');
  
  renderNewQuestion();
});

$(document).ready(function () {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  $("#current-date").text(month + "/" + day + "/" + year);
});
