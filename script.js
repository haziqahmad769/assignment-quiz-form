const questions = [
    {
        question: "Band manakah yang mengeluarkan album ikonik Wings of Heaven pada tahun 1990?",
        answers: [
            { text: "Search", correct: false},
            { text: "Wings", correct: true},
            { text: "May", correct: false},
            { text: "Iklim", correct: false},
        ]
    },
    {
        question: "Apakah nama album legenda Search yang dikeluarkan pada tahun 1989?",
        answers: [
            { text: "Fantasia Bulan Madu  ", correct: false},
            { text: "Mentari Merah di Ufuk Timur  ", correct: false},
            { text: "Isabella ", correct: true},
            { text: "Langit dan Bumi", correct: false},
        ]
    },
];

//called by ID from index.html
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

const scoreDisplay = document.getElementById("score"); //add new
const userDisplay = document.getElementById("user-dis"); //add new

//change current question number & score
let currentQuestionIndex = 0;
let score = 0;

//when start quiz, should restart question index & score to zero
//nextButton.innerHTML is currently "Next", because later at the end will change to "Play Again"
//this function = showQuestion(); will display question
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    
    scoreDisplay.textContent = 0; //add new
    userDisplay.style.display = "block"; //add new
    
    
    showQuestion();
}

function showQuestion() {
    //to reset previous question & answer
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    //change in index.html to display question from script.js
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //display answer from script.js
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        //display "button" in "btn" from index.html
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
       answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    // if(isCorrect){
    //     selectedBtn.classList.add("correct");
    //     score++;
        
    //     scoreDisplay.textContent = score; //add new

    // } else {
    //     selectedBtn.classList.add("incorrect");
    // }

    selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
    score += isCorrect ? 1 : 0;

    scoreDisplay.textContent = score; //add new


    //for each button check each dataset
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `${user_name}, YOU SCORED ${score}/${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    userDisplay.style.display = "none" //add new
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();