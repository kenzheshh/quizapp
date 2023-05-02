const questions = document.querySelector('.question')
const choice1 = document.querySelector('.choice1')
const choice2 = document.querySelector('.choice2')
const choice3 = document.querySelector('.choice3')
const choice4 = document.querySelector('.choice4')
const button = document.querySelector('#btn')
const scoreDisplay = document.querySelector('#score')
const innerWindow = document.querySelector('.innerWindow')
const answers = document.querySelector('.answers')

let questionsArr = []
let currentQuestionIndex = 0
let score = 0

function displayQuestion() {

  questions.innerText = questionsArr[currentQuestionIndex].question

  const choices = [
    questionsArr[currentQuestionIndex].correctAnswer,
    ...questionsArr[currentQuestionIndex].incorrectAnswers
  ]

  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  choice1.innerText = choices[0]
  choice2.innerText = choices[1]
  choice3.innerText = choices[2]
  choice4.innerText = choices[3]
}

function handleAnswer(e) {
  const selectedAnswer = e.target.innerText
  const correctAnswer = questionsArr[currentQuestionIndex].correctAnswer

  if (selectedAnswer === correctAnswer) {
    score++
    scoreDisplay.innerText = `Score: ${score}`
  }


  currentQuestionIndex++
  if (currentQuestionIndex < questionsArr.length) {
    displayQuestion()
  } else {
    endQuiz()
  }
}

// const showQuestion1 = questionsArr[0].question
// const showQuestion2 = questionsArr[1].question
// const showQuestion3 = questionsArr[2].question
// const showQuestion4 = questionsArr[3].question
// const showQuestion5 = questionsArr[4].question


// const showCorrectAnswer1 = questionsArr[0].correctAnswer
// const showCorrectAnswer2 = questionsArr[1].correctAnswer
// const showCorrectAnswer3 = questionsArr[2].correctAnswer
// const showCorrectAnswer4 = questionsArr[3].correctAnswer
// const showCorrectAnswer5 = questionsArr[4].correctAnswer



function endQuiz() {
  
  var choice5 = document.createElement('p')
  answers.append(choice5)

  scoreDisplay.innerText = `Your Score is ${score} out of ${questionsArr.length}`
  
  questions.innerText = `Here are the correct answers:`
  
  choice1.innerText = `1 Question: ${questionsArr[0].question} 
  Correct Answer: ${questionsArr[0].correctAnswer}`
  
  choice2.innerText = `2 Question: ${questionsArr[1].question} 
  Correct Answer: ${questionsArr[1].correctAnswer}`
  
  choice3.innerText = `3 Question: ${questionsArr[2].question} 
  Correct Answer: ${questionsArr[2].correctAnswer}`
  
  choice4.innerText = `4 Question: ${questionsArr[3].question} 
  Correct Answer: ${questionsArr[3].correctAnswer}`  
  
  choice5.innerText = `5 Question: ${questionsArr[4].question} 
  Correct Answer: ${questionsArr[4].correctAnswer}`

  choice5.style.opacity = '0.7';
  choice5.addEventListener('mouseenter', function() {
    choice5.style.opacity = '1';
    choice5.style.transform = 'translateY(-4px)';
  })

  choice5.addEventListener('mouseleave', function() {
    choice5.style.opacity = '0.7';
    choice5.style.transform = 'translateY(4px)';
  })
  

  // alert(`You finished the quiz! Your score is ${score} out of ${questionsArr.length}.`)
  // currentQuestionIndex = 0
  // score = 0
  // scoreDisplay.innerText = `Score: ${score}`

}

fetch('https://the-trivia-api.com/api/questions?categories=film_and_tv,food_and_drink,general_knowledge,geography,history,music,science&limit=5&region=KZ')
  .then(res => {
    res.json().then(data => {
      console.log(data)
      questionsArr = [...data]
      displayQuestion()
    })
  })


choice1.addEventListener('click', handleAnswer)
choice2.addEventListener('click', handleAnswer)
choice3.addEventListener('click', handleAnswer)
choice4.addEventListener('click', handleAnswer)


