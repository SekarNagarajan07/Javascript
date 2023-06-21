const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX = 13,
  foodY = 10;

let snakeX = 5,
  snakeY = 10;

let velocityX = 0,
  velocityY = 1;

let snakeBody = [];

let setIntervalId;

let score = 0;

// Getting the high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score ${highScore}`;

const changeFoodPosition = () => {
  //passing a random 0 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //Clearing the timer and reloading the page on game over
  clearInterval(setIntervalId);
  alert("Game Over!! Press OK to play again");
  location.reload();
};

const changeDirection = (e) => {
  //Changing velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"> </div>`;

  //Checking if the snake hit the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing food position to snake body array.
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score ${score}`;
    highScoreElement.innerText = `High Score ${highScore}`;

    // console.log(snakeBody);
  }

  //Shifting forward the values of the elements in the snake body by one.
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; //setting first element of snake body to current snake position.

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    // console.log("Game Over!!");
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    //Adding a div for each part of the snake's body
    htmlMarkup += `<div class = "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"> </div>`;

    // Checking if the snake's head is out of wall, if so setting gameover to true.
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
