const questions=[
    {
        question: "Sanskriti which is Harsh favourite Bike?",

        answers:[
            {text: "Royal Enfield",correct:false },
            {text: "Harley Davidson",correct:true},
            {text: "Ninja",correct:false},
            {text: "Zx10r",correct:false},
            
        ]
    },

    {
        question: "Sanskriti what do you think , how much harsh loves you?",

        answers:[
            {text: "Enough",correct:false},
            {text: "Much",correct:false},
            {text: "Not much",correct:false},
            {text: "Very Much",correct:true}
        ]
    },

    {
        question: "Sanskriti what is Harsh favourite color?",

        answers:[
            {text: "Black",correct:true},
            {text: "Blue",correct:false},
            {text: "White",correct:false},
            {text: "Yellow",correct:false},
        ]
    },

    {
        question: "Sanskriti what is Harsh favourite food?",

        answers:[
            {text: "Chinese",correct:false},
            {text: "Butter Chicked and Naan",correct:true},
            {text: "Sweets",correct:false},
            {text: "Pizza",correct:false},
        ]
    },


];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}

function showScore(){
    resetState();
    questionElement.innerHTML=`Ypu Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();
