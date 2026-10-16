let humanScore = 0;
let computerScore = 0;
let isGameRunning = false;

const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");

const roundResult = document.querySelector("#round-result");
const gameResult = document.querySelector("#game-result");

startBtn.addEventListener("click", () => {
  startGame();
});

restartBtn.addEventListener("click", () => {
  startGame();
});

rockBtn.addEventListener("click", () => {
  playRound("rock");
});

paperBtn.addEventListener("click", () => {
  playRound("paper");
});

scissorsBtn.addEventListener("click", () => {
  playRound("scissors");
});

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);

  if (random === 0) {
    return "rock";
  } else if (random === 1) {
    return "scissors";
  } else {
    return "paper";
  }
}

function getRoundWinner(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "draw";
  } else if (
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "rock" && computerChoice === "scissors")
  ) {
    return "user";
  } else {
    return "computer";
  }
}

function updateScore(winner) {
  if (winner === "user") {
    humanScore += 1;
  }

  if (winner === "computer") {
    computerScore += 1;
  }
}

function checkGameOver() {
  if (humanScore >= 5) {
    return "user";
  } else if (computerScore >= 5) {
    return "computer";
  } else {
    return null;
  }
}

function startGame() {
  humanScore = 0;
  computerScore = 0;
  isGameRunning = true;

  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;

  startBtn.hidden = true;
  restartBtn.hidden = true;

  roundResult.textContent = "";
  gameResult.textContent = "";

  updateDisplay();
}

function updateDisplay(humanChoice, computerChoice, winner, gameWinner) {
  const humanScoreDisplay = document.querySelector("#human-score");
  const computerScoreDisplay = document.querySelector("#computer-score");

  humanScoreDisplay.textContent = humanScore;
  computerScoreDisplay.textContent = computerScore;

  if (humanChoice === undefined) {
    return;
  }

  if (winner === "draw") {
    roundResult.textContent =
      `사용자: ${humanChoice} / 컴퓨터: ${computerChoice}\n무승부!`;
  } else {
    roundResult.textContent =
      `사용자: ${humanChoice} / 컴퓨터: ${computerChoice}\n${winner}가 이번 판에서 승리했습니다!`;
  }

  if (gameWinner !== null) {
    gameResult.textContent = `${gameWinner}가 최종승리했습니다!\n다시 하시겠습니까?`;
  }
}

function playRound(humanChoice) {
  // 1. 게임이 진행 중이 아니면 함수 종료
  if (!isGameRunning) {
    return;
  }

  // 2. 컴퓨터의 선택
  const computerChoice = getComputerChoice();

  // 3. 승패 판정
  const winner = getRoundWinner(humanChoice, computerChoice);

  // 4. 점수 변경
  updateScore(winner);

  // 5. 게임 종료 여부 확인
  const gameWinner = checkGameOver();

  if (gameWinner !== null) {
    isGameRunning = false;

    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

    restartBtn.hidden = false;
  }

  // 6. HTML 화면 갱신
  updateDisplay(humanChoice, computerChoice, winner, gameWinner);
}
