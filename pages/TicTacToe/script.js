let count = 0;
let fieldScores = Array(9).fill("");
let xCount = parseInt(localStorage.getItem("xCount")) || 0;
let oCount = parseInt(localStorage.getItem("oCount")) || 0;

updateScoresDisplay();

document.querySelectorAll(".field").forEach((field) => {
  field.addEventListener("click", () => {
    if (field.classList.contains("is-occupied")) return;

    field.classList.add("is-occupied");
    const fieldPos = field.getAttribute("data-title");
    const currentPlayer = count % 2 === 0 ? "X" : "O";

    field.textContent = currentPlayer;
    fieldScores[fieldPos] = currentPlayer;
    count++;

    if (checkWin(fieldScores)) {
      document.querySelectorAll(".field").forEach((field) => {
        field.classList.add("is-occupied");
      });
      displayWinMessage(currentPlayer);
      updateScores(currentPlayer);
      setTimeout(restart, 2000);
    } else if (isDraw(fieldScores)) {
      displayDrawMessage();
      setTimeout(restart, 2000);
    }
  });
});

function restart() {
  document.querySelectorAll(".field").forEach((field) => {
    field.textContent = "";
    field.classList.remove("is-occupied");
  });
  fieldScores.fill("");
  count = 0;
}

function checkWin(scores) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(
    ([a, b, c]) =>
      scores[a] && scores[a] === scores[b] && scores[b] === scores[c]
  );
}

function isDraw(scores) {
  return scores.every((score) => score) && !checkWin(scores);
}

function displayWinMessage(player) {
  const winMes = document.querySelector(".win-mes");
  winMes.textContent = `${player} has won!`;
  setTimeout(() => (winMes.textContent = ""), 2000);
}

function displayDrawMessage() {
  const winMes = document.querySelector(".win-mes");
  winMes.textContent = "It's a draw!";
  setTimeout(() => (winMes.textContent = ""), 2000);
}

function updateScores(player) {
  if (player === "X") {
    xCount++;
    localStorage.setItem("xCount", xCount);
  } else {
    oCount++;
    localStorage.setItem("oCount", oCount);
  }

  updateScoresDisplay();
}

function updateScoresDisplay() {
  document.getElementById("x-score").textContent = `X: ${xCount}`;
  document.getElementById("o-score").textContent = `O: ${oCount}`;
}

function resetScores() {
  oCount = xCount = 0;
  localStorage.setItem("oCount", oCount);
  localStorage.setItem("xCount", xCount);
  updateScoresDisplay();
}
