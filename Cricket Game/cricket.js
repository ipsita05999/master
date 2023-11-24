const batButton = document.querySelector("#bat-button");
const ballButton = document.querySelector("#ball-button");
const stumpButton = document.querySelector("#stump-button");
const result = document.querySelector("#result");
const userChoice = document.querySelector('#userChoice');
const computerChoiceEle = document.querySelector('#computerChoice');
const resetBtn = document.querySelector('#resetBtn');
let scores;
let strScore = localStorage.getItem('scores');
resetScore(strScore);
function resetScore(strScore){
  scores = strScore ? JSON.parse(strScore) : {
    win:0,
    lost:0,
    tie:0,
  }
  
  scores.displayScore = function(){
    return `win: ${this.win}  lost: ${this.lost}  tie: ${this.tie}`;
  }
}

document.body.onload=()=>{
  let strScore = JSON.parse(localStorage.getItem('scores'));
  result.innerText = `${scores.displayScore()}`;
}

batButton.onclick = () => {
  let computerChoice = generateComputerChoice();
  result.innerText = getResult('Bat', computerChoice);
};

ballButton.addEventListener('click', ()=>{
  let computerChoice = generateComputerChoice();
  result.innerText = getResult('Ball', computerChoice);
})

function onStumpClick(){
  let computerChoice = generateComputerChoice();
  result.innerText = getResult('Stump', computerChoice);
}

function generateComputerChoice(){
  let randomNumber = Math.random() * 3;
  let computerChoice = "";
  if (randomNumber > 0 && randomNumber <= 1) {
    computerChoice = "Bat";
  } else if (randomNumber > 1 && randomNumber <= 2) {
    computerChoice = "Ball";
  } else {
    computerChoice = "Stump";
  }
  return computerChoice;
}

function getResult(userMove, computerMove){
  userChoice.innerHTML=`User choice is: <b>${userMove}<b/>`;

  if(userMove ==='Bat'){
    if (computerMove === "Ball") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.win++;
      adddToLocalStorage(scores);
      return `User Won.
      
      ${scores.displayScore()}`;
    } else if (computerMove === "Bat") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.tie++;
      adddToLocalStorage(scores);
      return `It's a tie.
      
      ${scores.displayScore()}`;
    } else {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.lost++;
      adddToLocalStorage(scores);
      return `Computer has Won.
      
      ${scores.displayScore()}`;
    }
  } else if (userMove ==='Ball'){
    if (computerMove === "Ball") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.tie++;
      adddToLocalStorage(scores);
      return `It's a tie.
      
      ${scores.displayScore()}`;
    } else if (computerMove === "Bat") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.lost++;
      adddToLocalStorage(scores);
      return `Computer has Won.
      
      ${scores.displayScore()}`;
    } else {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.win++;
      adddToLocalStorage(scores);
      return `User Won.
      
      ${scores.displayScore()}`;
    }
  } else{
    if (computerMove === "Ball") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.lost++;
      adddToLocalStorage(scores);
      return `Computer has Won.
      
      ${scores.displayScore()}`;
    } else if (computerMove === "Bat") {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.win++;
      adddToLocalStorage(scores);
      return `User Won.
      
      ${scores.displayScore()}`;
    } else {
      computerChoiceEle.innerHTML= `Computer choice is: <b>${computerMove}</b>`;
      scores.tie++;
      adddToLocalStorage(scores);
      return `It's a tie.
      
      ${scores.displayScore()}`;
  }
  }
}

function adddToLocalStorage(scores){
localStorage.setItem('scores', JSON.stringify(scores));
}

function clearLocalStrorage(){
  localStorage.clear();
 resetScore();

 userChoice.innerHTML="";
 computerChoiceEle.innerHTML="";
 result.innerText = `win: 0 lost: 0  tie: 0`;
}