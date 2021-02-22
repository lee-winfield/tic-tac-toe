class Game {
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPiece = "O";
  };

  placePiece(pos) {
    const row = this.board[pos.row];
    row[pos.column] = this.currentPiece;
  };

  nextTurn() {
    this.currentPiece = this.currentPiece == "O" ? "X" : "O";
  };

  isOver() {
    let diagDown = "", diagUp = "";
    let horizontals = ["", "", ""];
    let verticals = ["", "", ""];
    for (let m = 0; m < this.board.length; m++) {
      const row = this.board[m];
      for (let n = 0; n < row.length; n++) {
        const cell = row[n];
        if (cell !== null) {
          // update horizontals
          horizontals[m] = horizontals[m] + cell;

          // update verticals
          verticals[n] = verticals[n] + cell;

          // update diaganonals
          if (m === n && cell) {
            diagDown += cell;
          };
          if ((2 - m) === n && cell !== null) {
            diagUp += cell;
          };
        };
      };
    };

    const isWin = line => {
      return line === "XXX" || line === "OOO";
    };

    return [diagDown, diagUp, ...horizontals, ...verticals].
      reduce((acc, val) => acc || isWin(val), false);
  };
};

class UI {
  displayWinner(winningPiece) {
    const modal = document.getElementById("gameOverModal");
    modal.classList.add("show");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.style.display = "block";

    const title = modal.querySelector(".modal-title");
    title.innerHTML = `The winner is ${winningPiece}`;

    const body = modal.querySelector(".modal-body");
    body.innerHTML = `Congratulations player ${winningPiece}, you destroyed your opponent 👏`;
  }

  placePiece(target) {
    target.innerHTML = `
      <div class="game-piece game-piece-${game.currentPiece}">
        ${game.currentPiece}
      </div>
    `;
  };

  getPosition(target) {
    const columnByClassName = {
      "left": 0,
      "center": 1,
      "right": 2,
    };

    const rowByClassName = {
      "top": 0,
      "middle": 1,
      "bottom": 2,
    };

    const column = columnByClassName[target.classList[1]];
    const row = rowByClassName[target.parentElement.classList[1]];

    return { column, row }
  };

  resetBoard() {
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "none";
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    };
  };
};

let game = new Game();
let ui = new UI();

const gameBoard = document.getElementById("game-board");
gameBoard.addEventListener("click", handleBoardClick);
const rematchButton = document.querySelector(".rematch-button");
rematchButton.addEventListener("click", rematch);

function handleBoardClick(e) {
  const { target } = e;
  const shouldUpdate = Array.from(target.classList).includes("cell") &&
    target.innerHTML == "";

  if (shouldUpdate) {
    ui.placePiece(target);
    game.placePiece(ui.getPosition(target));

    if (game.isOver()) {
      ui.displayWinner(game.currentPiece);
    } else {
      game.nextTurn();
    };
  };
};

function rematch() {
  ui.resetBoard();
  game = new Game();
};