let ip;
let ip_api = 'https://api.ipify.org?format=json';
let question, answer;
let trivia_api = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy';

let input;
let submitButton, nextButton;
let answerFeedback = '';  

async function getIP() {
  let data = await fetch(ip_api);
  let j_data = await data.json();
  ip = j_data.ip;
}

async function getTrivia() {
  let data = await fetch(trivia_api);
  let j_data = await data.json();
  question = j_data.results[0].question;
  answer = j_data.results[0].correct_answer;
  answerFeedback = '';
}

async function setup() {
  createCanvas(400, 400);
  await getIP();
  await getTrivia(); 

  input = createInput();
  input.position(20, 60);
  
  submitButton = createButton('submit');
  submitButton.position(input.x + input.width, input.y);
  submitButton.mousePressed(checkAnswer);

  nextButton = createButton('Next Question');
  nextButton.position(submitButton.x, submitButton.y + 30);
  nextButton.mousePressed(async () => {
    await getTrivia(); // Load the next question
    input.value('');   // Clear the input box
  });
}

function draw() {
  background(220);
  text(ip, 20, 380);
  text(question, 20, 40);
  text(answerFeedback, 20, 100);
}

function checkAnswer() {
  let userAnswer = input.value(); 
  if (userAnswer === answer) {
    answerFeedback = 'Correct!';
  } else {
    answerFeedback = 'Incorrect!';
  }
}
