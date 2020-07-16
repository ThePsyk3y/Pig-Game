/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll" + (activePlayer + 1)).style.display = "none";

function newGame() {
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("winner");
  document.querySelector("#name-" + activePlayer).textContent = "Player 1";
  scores[0] = 0;
  scores[1] = 0;
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".btn-roll" + activePlayer).style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
}
function btn() {
  var diceDOM = document.querySelector(".dice");
  dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);
  if (dice != 1) {
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    roundScore += dice;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    diceDOM.src = "dice-1.png";
    document.getElementById("current-" + activePlayer).textContent = roundScore;
    changeActivePlayer();
  }
}

function hold() {
  if (roundScore === 0) {
    return;
  }
  scores[activePlayer] += roundScore;
  roundScore = 0;
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  if (scores[activePlayer] >= 20) {
    playerWin();
    return;
  }
  changeActivePlayer();
}
function playerWin() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
  document.querySelector(".btn-roll" + activePlayer).style.display = "none";
  document.querySelector(".btn-hold").style.display = "none";
}


function changeActivePlayer() {
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  document.querySelector(".btn-roll" + activePlayer).style.display = "none";
  document
    .querySelector(".player-" + activePlayer + "-current-box")
    .classList.remove("active-box");
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
  document.querySelector(".btn-roll" + activePlayer).style.display = "block";
  document
    .querySelector(".player-" + activePlayer + "-current-box")
    .classList.add("active-box");
}

document.querySelector(".btn-roll0").addEventListener("click", btn);
document.querySelector(".btn-roll1").addEventListener("click", btn);
document.querySelector(".btn-hold").addEventListener("click", hold);
document.querySelector(".btn-new").addEventListener("click", newGame);
