// const board = document.getElementById("board")
// const playFriendBtn = document.getElementById("playFriend")
// const playComputerBtn = document.getElementById("playComputer")
// const resetBtn = document.getElementById("reset")

// let currentPlayer = "X"
// let gameBoard = ["", "", "", "", "", "", "", "", ""]
// let gameActive = false
// let isComputerGame = false

// function createBoard() {
//   board.innerHTML = ""
//   for (let i = 0; i < 9; i++) {
//     const cell = document.createElement("div")
//     cell.classList.add(
//       "bg-gray-200",
//       "h-24",
//       "flex",
//       "items-center",
//       "justify-center",
//       "text-4xl",
//       "font-bold",
//       "cursor-pointer",
//     )
//     cell.addEventListener("click", () => handleCellClick(i))
//     board.appendChild(cell)
//   }
// }

// function handleCellClick(index) {
//   if (!gameActive || gameBoard[index] !== "") return

//   gameBoard[index] = currentPlayer
//   updateBoard()

//   if (checkWinner()) {
//     alert(`Player ${currentPlayer} wins!`)
//     gameActive = false
//     return
//   }

//   if (gameBoard.every((cell) => cell !== "")) {
//     alert("It's a draw!")
//     gameActive = false
//     return
//   }

//   currentPlayer = currentPlayer === "X" ? "O" : "X"

//   if (isComputerGame && currentPlayer === "O") {
//     setTimeout(computerMove, 500)
//   }
// }

// function updateBoard() {
//   const cells = board.children
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].textContent = gameBoard[i]
//     cells[i].classList.remove("text-blue-500", "text-red-500")
//     if (gameBoard[i] === "X") {
//       cells[i].classList.add("text-blue-500")
//     } else if (gameBoard[i] === "O") {
//       cells[i].classList.add("text-red-500")
//     }
//   }
// }

// function checkWinner() {
//   const winPatterns = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8], // Rows
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8], // Columns
//     [0, 4, 8],
//     [2, 4, 6], // Diagonals
//   ]

//   return winPatterns.some((pattern) => {
//     const [a, b, c] = pattern
//     return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]
//   })
// }

// function computerMove() {
//   const emptyCells = gameBoard.reduce((acc, cell, index) => {
//     if (cell === "") acc.push(index)
//     return acc
//   }, [])

//   if (emptyCells.length > 0) {
//     const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
//     handleCellClick(randomIndex)
//   }
// }

// function resetGame() {
//   gameBoard = ["", "", "", "", "", "", "", "", ""]
//   currentPlayer = "X"
//   gameActive = true
//   isComputerGame = false
//   updateBoard()
// }

// playFriendBtn.addEventListener("click", () => {
//   resetGame()
//   isComputerGame = false
// })

// playComputerBtn.addEventListener("click", () => {
//   resetGame()
//   isComputerGame = true
// })

// resetBtn.addEventListener("click", resetGame)

// createBoard()
// resetGame()



const board = document.getElementById("board")
const playFriendBtn = document.getElementById("playFriend")
const playComputerBtn = document.getElementById("playComputer")
const resetBtn = document.getElementById("reset")
const toggleSoundBtn = document.getElementById("toggleSound")

let currentPlayer = "X"
let gameBoard = ["", "", "", "", "", "", "", "", ""]
let gameActive = false
let isComputerGame = false
let soundOn = true

// Sound effects
const clickSound = new Audio("sounds/click.mp3")
const winSound = new Audio("sounds/win.mp3")
const loseSound = new Audio("sounds/lose.mp3")
const drawSound = new Audio("sounds/draw.mp3")
const resetSound = new Audio("sounds/reset.mp3")

function playSound(sound) {
  if (soundOn) {
    sound.currentTime = 0
    sound.play()
  }
}

if (toggleSoundBtn) {
  toggleSoundBtn.addEventListener("click", () => {
    soundOn = !soundOn
    toggleSoundBtn.textContent = soundOn ? "Sound: On 🔊" : "Sound: Off 🔇"
  })
}

function createBoard() {
  board.innerHTML = ""
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add(
      "cell",
      "bg-gray-200",
      "h-24",
      "flex",
      "items-center",
      "justify-center",
      "text-4xl",
      "font-bold",
      "cursor-pointer"
    )
    cell.addEventListener("click", () => handleCellClick(i))
    board.appendChild(cell)
  }
}

function handleCellClick(index) {
  if (!gameActive || gameBoard[index] !== "") return

  gameBoard[index] = currentPlayer
  playSound(clickSound)
  updateBoard()

  if (checkWinner()) {
    gameActive = false
    if (isComputerGame) {
      if (currentPlayer === "X") {
        playSound(winSound)
        alert("You win!")
      } else {
        playSound(loseSound)
        alert("Computer wins!")
      }
    } else {
      playSound(winSound)
      alert(`Player ${currentPlayer} wins!`)
    }
    return
  }

  if (gameBoard.every((cell) => cell !== "")) {
    playSound(drawSound)
    alert("It's a draw!")
    gameActive = false
    return
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X"

  if (isComputerGame && currentPlayer === "O") {
    setTimeout(computerMove, 500)
  }
}

function updateBoard() {
  const cells = board.children
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = gameBoard[i]
    cells[i].classList.remove("text-blue-500", "text-red-500")
    if (gameBoard[i] === "X") {
      cells[i].classList.add("text-blue-500")
    } else if (gameBoard[i] === "O") {
      cells[i].classList.add("text-red-500")
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]
  })
}

function computerMove() {
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === "") acc.push(index)
    return acc
  }, [])

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    handleCellClick(randomIndex)
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""]
  currentPlayer = "X"
  gameActive = true
  updateBoard()
  playSound(resetSound) 
}

playFriendBtn.addEventListener("click", () => {
  resetGame()
  isComputerGame = false
})

playComputerBtn.addEventListener("click", () => {
  resetGame()
  isComputerGame = true
})

resetBtn.addEventListener("click", resetGame)

createBoard()
resetGame()
