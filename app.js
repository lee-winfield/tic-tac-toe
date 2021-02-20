const gameBoard = document.getElementById("game-board")
gameBoard.addEventListener("click", selectCell)

let currentPiece = "O"

function selectCell(e) {
  const { target } = e
  console.log(target)
  if (e.target.innerHTML == "") {
    target.innerHTML = `
      <div class="game-piece">
        ${currentPiece}
      </div>
    `
    nextTurn()
  }
}

function nextTurn() {
  currentPiece = currentPiece == "O" ? "X" : "O"
}