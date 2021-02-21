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

  isOver() {
    let diagDown = "", diagUp = ""
    let horizontals = ["", "", ""]
    let verticals = ["", "", ""]
    for (let m = 0; m < this.board.length; m++) {
      const row = this.board[m]
      for (let n = 0; n < row.length; n++) {
        const cell = row[n]
        if (cell !== null) {
          // update horizontals
          horizontals[m] = horizontals[m] + cell

          // update verticals
          verticals[n] = verticals[n] + cell

          // update diaganonals
          if (m === n && cell) {
            diagDown += cell
          }
          if ((2 - m) === n && cell !== null) {
            diagUp += cell
          }

        }
      }
    }

    const isWin = line => {
      return line === "XXX" || line === "OOO"
    }
    return [diagDown, diagUp, ...horizontals, ...verticals].
      reduce((acc, val) => acc || isWin(val), false)
  }
}


let game = new Game()
const gameBoard = document.getElementById("game-board")
gameBoard.addEventListener("click", placePiece)
const rematchButton = document.querySelector(".rematch-button")
rematchButton.addEventListener("click", rematch)

function placePiece(e) {
  const { target } = e
  if (e.target.innerHTML == "" && !game.isOver()) {
    // update ui with new gamepiece
    target.innerHTML = `
      <div class="game-piece game-piece-${game.currentPiece}">
        ${game.currentPiece}
      </div>
    `

    // update game state
    const pos = getPosition(target)
    game.placePiece(pos)

    // check if game is over
    if (game.isOver()) {
      // display winner
      displayWinner(game.currentPiece)
    } else {
      // next turn
      game.nextTurn()
    }
  }
}

function getPosition(target) {
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

  const column = columnByClassName[target.classList[1]]
  const row = rowByClassName[target.parentElement.classList[1]]

  return { column, row }
}



function displayWinner(p) {
  const modal = document.getElementById("gameOverModal")
  modal.classList.add("show")
  modal.removeAttribute("aria-hidden")
  modal.setAttribute("aria-modal", "true")
  modal.style.display = "block"

  const title = modal.querySelector(".modal-title")
  title.innerHTML = `The winner is ${game.currentPiece}`
  const body = modal.querySelector(".modal-body")
  body.innerHTML = `Congratulations player ${game.currentPiece}, you destroyed your opponent 👏`
}

function rematch() {
  const modal = document.getElementById("gameOverModal")
  modal.style.display = "none"
  game = new Game()
  const cells = document.querySelectorAll(".cell")
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ""
  }
}