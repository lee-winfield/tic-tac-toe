class Game {
  constructor() {
    this.board = {
      top: { left: "", center: "", right: "" },
      middle: { left: "", center: "", right: "" },
      bottom: { left: "", center: "", right: "" },
    }
    this.currentPiece = "O"
  }

  placePiece(pos) {
    const row = this.board[pos.row]
    row[pos.cell] = this.currentPiece
  }

  nextTurn() {
    this.currentPiece = this.currentPiece == "O" ? "X" : "O"
  }

  isGameOver() {
    // TODO
    return false
  }
}

const game = new Game()
const gameBoard = document.getElementById("game-board")
gameBoard.addEventListener("click", selectCell)

function selectCell(e) {
  const { target } = e
  if (e.target.innerHTML == "") {
    // update ui
    target.innerHTML = `
      <div class="game-piece">
        ${game.currentPiece}
      </div>
    `

    // update game state
    const pos = getPosition(target)
    game.placePiece(pos)

    // check if game is over
    if (game.isGameOver()) {
      // display winner
      displayWinner(game.currentPiece)
    } else {
      // next turn
      game.nextTurn()
    }
  }
}

function getPosition(target) {
  const cell = target.classList[1]
  const row = target.parentElement.classList[1]
  return { cell, row }
}

function displayWinner(p) {
  // TODO
}