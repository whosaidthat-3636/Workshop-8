# Workshop-8
Link: [https://whosaidthat-3636.github.io/Workshop-8/]

## Tasks
- Create a sketch that makes an API call to gather data from an external source. Here is a list of free-to-use APIsLinks to an external site.which do not require authentication.
- Visual elements of the sketch should be determined by data retrieved from the external source.

## Documentation
- The API used for this task
  * 104 by Open Trivia DB, Trivia Questions

### 1) Setup
- Found an API and did all the neccesary input
- However nothing was showing, no text or whatsoever
```
let ip;
let ip_api = 'https://api.ipify.org?format=json';
let question, answer;
let trivia_api = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy';

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
}

function setup() {
  createCanvas(400, 400);
  getIP();
  getTrivia();
}

function draw() {
  background(220);
  text(ip, 20, 380);
  text(question, 20, 40);
  text(correct_answer, 20, 70);
}
```
- It took some time but I learned that the issue with within the setup
- I remembered in the video Leo had mentioned about asynchorous functions and how it doesn't interrupt the whole operation so I tried it on different functions before settling on the setup
- normal 'function' blocks the whole operation
  * replace with async function as it can standalone without disrupting over codes
```
async function setup() {
  createCanvas(400, 400);
  await getIP();
  await getTrivia(); 
}
```

### 2) Input box
- Input box so users can actually answer
```
let input;
let submitButton;

input = createInput();
  input.position (20, 60);
  submitButton = createButton('submit');
  submitButton.position(input.x +input.width, input.y);
  submitButton.mousePressed()
```

### 3) Checking answers
- In addition, inserting text would be insufficient as it does not have any response
- I added a checkAnswer variable using an if function so that if answer is correct or incorrect, it will be displayed to the user
```
let answerFeedback = '';

submitButton.mousePressed(checkAnswer);

function checkAnswer() {
  let userAnswer = input.value(); 
  if (userAnswer === answer) {
    answerFeedback = 'Correct!';
  } else {
    answerFeedback = 'Incorrect!';
  }
}
```

### 4) Next question
- I also want users to be able to go onto the next question rather than having to refresh the sketch to get a new question
- I thought of using a setInterval to set a time after user has answered to move onto the next question but felt that of inefficient
- So add on a 'Next question' button
```
nextButton = createButton('Next Question');
  nextButton.position(submitButton.x, submitButton.y + 30);
  nextButton.mousePressed(async () => {
    await getTrivia(); // to load the next question
    input.value('');   // helps clear the input box
  });
```


## Notes
### 1) Storing IP address
```
let ip;
let ip_api = 'https://api.ipfy.org?format=json';

asynchronous function: make sure it functions without interrupting the rest of the program

async function getIP(){
let data = await fetch(ip_api);
let j_data = await data.json();
ip = j_data.ip;}

function setup()
getIP();}

function draw(){
text(ip, x, y);}
```
### 2) Adding on API
```
let other variables;
let smth_api='https://'

async function getJoke(){
let data = await fetch(smth_api);
let j_data = await data.json();
// with example

// ref to URL to know what to extract from data
Intro = j_data.setup;
Punchline = j_data.delivery;

Function setup(){
getIP();
getJoke();

function draw(){
text(ip, x, y);
text(intro, x, y)
text(punchline, x, y);
```
