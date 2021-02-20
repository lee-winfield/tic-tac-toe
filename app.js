class Game {
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
    this.currentPiece = "O"
  }

  placePiece(pos) {
    const row = this.board[pos.row]
    row[pos.column] = this.currentPiece
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
      console.log("GAME OVER!!!")
      displayWinner(game.currentPiece)
    } else {
      // next turn
      game.nextTurn()
    }
  }
}

function getPosition(target) {
  const column = columnByClassName[target.classList[1]]

  const row = rowByClassName[target.parentElement.classList[1]]
  return { column, row }
}

const columnByClassName = {
  "left": 0,
  "center": 1,
  "right": 2,
}

const rowByClassName = {
  "top": 0,
  "middle": 1,
  "bottom": 2,
}

function displayWinner(p) {
  // TODO
}