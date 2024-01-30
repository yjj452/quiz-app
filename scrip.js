const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Madrid", "Berlin", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let quizOver = false;
const questionText = document.getElementById("question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.getElementById("next");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const play=document.getElementById("playagain");
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;

        optionButton.classList.add("option");

        optionButton.addEventListener("click", () => checkAnswer(option, index));
      nextButton.style.display="none";

        optionsContainer.appendChild(optionButton);
    });
}

function startTimer() {
    let timeLeft = 30;
    const timerText = document.getElementById("timer");
    timerText.textContent = `Time Left: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Time Left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            timerText.style.display="none";
         showResult();
   
            clearInterval(timer);
            checkAnswer(null); // Auto-submit the question when time runs out
        }
    }, 1000);
}
function checkAnswer(selectedOption, optionIndex) {
    clearInterval(timer)
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option");
    // optionButtons.forEach((button, index) => {
    //     button.style.backgroundColor = "red";
    //     button.disabled = true;
    // });
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
      // If the answer is correct, set the correct option to green  
        optionsContainer.children[optionIndex].style.backgroundColor = "green";
    } 
      
    else { 
        // If the answer is wrong, set the selected (incorrect) option to red
        optionsContainer.children[optionIndex].style.backgroundColor = "red";
         // Set the correct option to green
        optionsContainer.children[currentQuestion.options.indexOf(currentQuestion.correctAnswer)].style.backgroundColor = "green";
    }
   
    disableOptions();
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = "block";
    } 
    
    
    else {
        showResult();
        resultText.textContent = `Your Score: ${score} out of ${questions.length}`;
        nextButton.style.display = "none";
     
    }
 
}

function disableOptions() {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button) => {
        button.disabled = true;
    });
}
if (currentQuestionIndex < questions.length) {
    setTimeout(() => {  
        displayQuestion();
        startTimer() ;// Display the next question
      }, 1000); // Delay for 1 se]cond
 

    } 
    function showResult() {

        questionText.textContent = "Quiz Completed!";
        //questionText.textContent = "Quiz Completed!";: This line sets the text content of the questionText element to "Quiz Completed!" to indicate that the quiz has been completed.
        optionsContainer.innerHTML = ""; // Clear the options
       // Hide the "Next" button
    nextButton.style.display="none";

   
        // resultText.style.display = "block"; // Show the result text
        resultText.textContent = `Your Score: ${score} out of ${questions.length}`;
    //In this modified showResult() function, we added the line clearInterval(timer); to stop the timer when the quisz is completed. This ensures that the timer stops counting down once the user has finished the quiz.
       const timerElement = document.getElementById("timer");
    timerElement.style.display="none";
     const play=document.getElementById("playagain");
    play.style.display="block";
    }
     
function nextQuestion() {
   
    clearInterval(timer);
    startTimer();
    resultText.textContent = "";
    enableOptions();

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextButton.style.display = "none";
    }

else{
    showResult();
  nextButton.style.display="block"; 
  s();
}
}
function enableOptions() {
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button) => {
        button.disabled = false;
        button.style.backgroundColor = "#3498db"; // Reset option button color
    });

}
function showplay(){
    play.style.display="block";
}

function hideplay(){
    play.style.display="none";

}

function playagain(){
   hideplay();
    score=0;
    currentQuestionIndex=0;
    displayQuestion();
    
clearInterval(timer);
startTimer();
    const ti=document.getElementById("timer");
    ti.style.display="block";//With this change, when you click the "Play Again" button, it will reset the quiz, start the timer again, and display the time left.
 nextButton.style.display="none";
displayQuestion();
resultText.textContent="";//hide your score;
    
}

      play.addEventListener("click", playagain);

nextButton.addEventListener("click", nextQuestion);
// Start the quiz
displayQuestion();
startTimer();
hideplay();
checkAnswer();


