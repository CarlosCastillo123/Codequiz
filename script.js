let timerEl = document.getElementById('time')
let startBtn = document.getElementById('start')
let submitBtn = document.getElementById("submit");
let choicesEl = document.getElementById('choices')
let initialsEl = document.getElementById("initials")
let questionsEl = document.getElementById("questions");
let feedbackEl = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;
let seconds = 10
let timerId


let questions = [
  {
    title: "What year was Java created",
    choices: ["1993",
      "1994",
      "1995",
      "1996"],
    answer: "1996"
  },

  {
    title: "How many modules does Java have",
    choices: ["1",
      "3",
      "2",
      "89"],
    answer: "2"
  },

  {
    title: "What's the last name of Java's Developer",
    choices: ["james",
      "gosling",
      "brown",
      "pierce"],
    answer: "gosling"
  },
]
let time = questions.length * 15;


function startQuiz() {
    console.log("clicked")
  // Set start screen to hide
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // show questions
  questionsEl.removeAttribute("class", "hide");

  // begin timer
  timerId = setInterval(clockTick, 1000);

  // show time as total time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // grab current guestion
  let currentQuestion = questions[currentQuestionIndex];

  // target title element to add title
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // set questions to clear
  choicesEl.innerHTML = "";

  // create loop for questions
  currentQuestion.choices.forEach(function (choice, i) {
    // make buttons for choices
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // add event listner to click
    choiceNode.onclick = questionClick;

    // show pafe
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // verifiy answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // remove time for wrong answers
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // update rendered time
    timerEl.textContent = time;



    feedbackEl.textContent = "Wrong!";
  } else {


    feedbackEl.textContent = "Correct!";
  }

  // set time for the feedback to display
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // add to question index to get next question
  currentQuestionIndex++;

  // verifiy if there are more questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  let endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  let finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  let initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // set score to amount of time left
    let newScore = {
      score: time,
      initials: initials
    };

    // set score to local info
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirerct to highscore page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // save high score
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;










