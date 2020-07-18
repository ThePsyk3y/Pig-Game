//*Variables
var scores, roundScores, activePlayer, dice;
//Variable Initialization
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//Hiding the Oppoite player's roll button and the dice
document
  .querySelector(".dice")
  .style.display = "none";
document
  .querySelector(".btn-roll" + (activePlayer + 1))
  .style.display = "none";

//*New Game Function (Resets Everything)
function newGame() {

  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("winner");
  document
    .querySelector(".player-0-panel")
    .classList.add("active");
  document
    .getElementById("name-" + activePlayer)
    .textContent = "Player "+(activePlayer+1);
  
  scores[0] = 0;
  scores[1] = 0;
  roundScore = 0;
  activePlayer = 0;
  
  document
    .querySelector(".dice")
    .style.display = "none";
  
  document
    .querySelector(".btn-roll" + activePlayer)
    .style.display = "block";
  document
    .querySelector(".btn-roll" + (activePlayer + 1))
    .style.display = "none";
  document
    .querySelector(".btn-hold")
    .style.display = "block";
  
  document
    .getElementById("score-0")
    .textContent = 0;
  document
    .getElementById("score-1")
    .textContent = 0;
  
  document
    .getElementById("current-0")
    .textContent = 0;
  document
    .getElementById("current-1")
    .textContent = 0;
}

//*Roll Button Press Funtion (Adds the rolled amount to round score)
function btn() {
  
  var diceDOM = document.querySelector(".dice");
  
  dice = Math.floor(Math.random() * 6) + 1;
  
  console.log(dice);
  
  if (dice != 1) {
    
    diceDOM.style.display = "block";
    diceDOM.src = "assets/dice-" + dice + ".png";
    
    roundScore += dice;
    
    document
      .getElementById("current-" + activePlayer)
      .textContent = roundScore;
  
  } else {
    
    roundScore = 0;
    
    diceDOM.src = "assets/dice-1.png";
    
    document
      .getElementById("current-" + activePlayer)
      .textContent = roundScore;
    
    changeActivePlayer();

  }

}

//*Hold Button Function (Adds round score to global score checks for winner)
function hold() {
  
  if (roundScore === 0) {
  
    return;
  
  }
  
  scores[activePlayer] += roundScore;
  roundScore = 0;
  
  document
    .getElementById("score-" + activePlayer)
    .textContent = scores[activePlayer];
  document
    .getElementById("current-" + activePlayer)
    .textContent = roundScore;
  
  if (scores[activePlayer] >= 100) {
    
    //Doesn't change activePlayer
    playerWin();
    return;
  
  }
  
  changeActivePlayer();

//*Player Win Function (Removes all buttons and dice)
}
function playerWin() {
  
  document
    .getElementById("name-" + activePlayer)
    .textContent = "Winner!";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active"); 
  //Hides Dice from view
  document
    .querySelector(".dice")
    .style.display = "none";

  //Automatically forces players to start new game
  document
    .querySelector(".btn-roll" + activePlayer)
    .style.display = "none";
  document
    .querySelector(".btn-hold")
    .style.display = "none";

}

//*Active Player Swap Function
function changeActivePlayer() {
  
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  document
    .querySelector(".player-" + activePlayer + "-current-box")
    .classList.remove("active-box");

  document
    .querySelector(".btn-roll" + activePlayer)
    .style.display = "none";

  
  if (activePlayer === 0) {
  
    activePlayer = 1;
  
  } else {
  
    activePlayer = 0;
  
  }
  
  //Also changes "Current" box's attribute to active
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
  document
    .querySelector(".player-" + activePlayer + "-current-box")
    .classList.add("active-box");

  document
    .querySelector(".btn-roll" + activePlayer)
    .style.display = "block";

}

//*Button Listeners
document
  .querySelector(".btn-roll0")
  .addEventListener("click", btn);
document
  .querySelector(".btn-roll1")
  .addEventListener("click", btn);

document
  .querySelector(".btn-hold")
  .addEventListener("click", hold);

document
  .querySelector(".btn-new")
  .addEventListener("click", newGame);
