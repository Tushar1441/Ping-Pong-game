const ball = document.querySelector(".ball");
const initial_ball = document.querySelector(".ball");
const leftBar = document.querySelector(".left-bar");
const rightBar = document.querySelector(".right-bar");
const gameBoard = document.querySelector(".game-body");
let score_1 = document.querySelector(".player-1_score");
let score_2 = document.querySelector(".player-2_score");
let message = document.querySelector(".message");
let gameState = "start";

// Getting the coordinates of all the elements to be handled.
let leftBar_coord = leftBar.getBoundingClientRect();
let rightBar_coord = rightBar.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let gameBoard_coord = gameBoard.getBoundingClientRect();

let bar_common = document.querySelector(".bar").getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener("keydown", (e) => handleKeyPress(e));

function handleKeyPress(e) {
  if (e.key == "Enter") {
    gameState = gameState == "start" ? "play" : "start";
    if (gameState == "play") {
      message.innerHTML = "Game Started";
      requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        dxd = Math.floor(Math.random() * 2);
        dyd = Math.floor(Math.random() * 2);
        moveBall(dx, dy, dxd, dyd);
      });
    }
  }

  if (gameState == "play") {
    /**
     * We need to control the upward and downward movement of both the bars.
     * we are gonna slide the bars by window.innerHeight*0.06 px.
     * to restrict the bar going outside of the board we need to contraint it
     */

    if (e.key == "w") {
      leftBar.style.top =
        Math.max(
          gameBoard_coord.top + 4,
          leftBar_coord.top - window.innerHeight * 0.06
        ) + "px";
      leftBar_coord = leftBar.getBoundingClientRect();
    }

    if (e.key == "s") {
      leftBar.style.top =
        Math.min(
          gameBoard_coord.bottom - bar_common.height - 4,
          leftBar_coord.top + window.innerHeight * 0.06
        ) + "px";
      leftBar_coord = leftBar.getBoundingClientRect();
    }

    if (e.key == "ArrowUp") {
      rightBar.style.top =
        Math.max(
          gameBoard_coord.top + 4,
          rightBar_coord.top - window.innerHeight * 0.06
        ) + "px";
      rightBar_coord = rightBar.getBoundingClientRect();
    }

    if (e.key == "ArrowDown") {
      rightBar.style.top =
        Math.min(
          gameBoard_coord.bottom - bar_common.height - 4,
          rightBar_coord.top + window.innerHeight * 0.06
        ) + "px";
      rightBar_coord = rightBar.getBoundingClientRect();
    }
  }
}

function moveBall(dx, dy, dxd, dyd) {
  if (ball_coord.top <= gameBoard_coord.top) {
    dyd = 1;
  }
  if (ball_coord.bottom >= gameBoard_coord.bottom) {
    dyd = 0;
  }
  if (
    ball_coord.left <= leftBar_coord.right &&
    ball_coord.top >= leftBar_coord.top &&
    ball_coord.bottom <= leftBar_coord.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.right >= rightBar_coord.left &&
    ball_coord.top >= rightBar_coord.top &&
    ball_coord.bottom <= rightBar_coord.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.left <= gameBoard_coord.left ||
    ball_coord.right >= gameBoard_coord.right
  ) {
    if (ball_coord.left <= gameBoard_coord.left) {
      score_2.innerHTML = +score_2.innerHTML + 1;
    } else {
      score_1.innerHTML = +score_1.innerHTML + 1;
    }

    gameState = "start";

    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;

    message.innerHTML = "Press Enter to Play Pong";
    message.style.left = 38 + "vw";
    return;
  }

  ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + "px";
  ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + "px";
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}
