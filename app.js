

class Game {
  constructor() {
    this.state = {
      top: { left: "", center: "", right: "" },
      middle: { left: "", center: "", right: "" },
      bottom: { left: "", center: "", right: "" },
    }
    this.currentPiece = "O"
  }

  placePiece(pos) {
    const row = this.state[pos.row]
    row[pos.cell] = this.currentPiece
    this.nextTurn()
  }

  nextTurn() {
    this.currentPiece = this.currentPiece == "O" ? "X" : "O"
  }
}

const game = new Game()
const gameBoard = document.getElementById("game-board")
gameBoard.addEventListener("click", selectCell)

function selectCell(e) {
  const { target } = e
  if (e.target.innerHTML == "") {
    target.innerHTML = `
      <div class="game-piece">
        ${game.currentPiece}
      </div>
    `
    const pos = getPosition(target)

    game.placePiece(pos)
  }
}

function getPosition(target) {
  const cell = target.classList[1]
  const row = target.parentElement.classList[1]
  return { cell, row }
}