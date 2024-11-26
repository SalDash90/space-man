/*-------------------------------- Constants --------------------------------*/
const list = ["BATTERY", "ENGINE", "RADIATOR", "COMPRESSOR", "GEAR BOX", "STEERING PUMP", "DRIVE BELT", "FUSE BOX", "BRACKES"]
/*-------------------------------- Variables --------------------------------*/
// Use a method to choose a random index number each time
let randomIndex = Math.floor(Math.random() * list.length)
let correctWord = list[randomIndex]
let guessedWord = [] 
let lives = 5
// split the actual word 
const splitWord = correctWord.split('')
/*------------------------ Cached Element References ------------------------*/
const buttonsElement = document.querySelectorAll(".letter")
const restartButElement = document.querySelector("#Restart")
const livesElement = document.querySelector(".Lives")
const guessedWordElement = document.querySelector("#Guessed-Wrod")
const messageContainerElement = document.querySelector(".Message-Container")
const dashElement = document.querySelectorAll(".dash")
/*-------------------------------- Functions --------------------------------*/
splitWord.forEach(() => {
    const dashElement = document.createElement ("p")
    dashElement.className = ('dash')
    dashElement.textContent = "_"
    guessedWordElement.appendChild(dashElement)
    }) 
   

let handleClick = (event) => {
    let letter = event.target.innerText
    compare(letter)
}
const compare = (letter) => {
    // correctWord is our "chosen word"
    // is letter in correct word?

    // if it is in correct word then _ should be replaced with letter 
        if (correctWord.includes(letter)) {
          splitWord.forEach((char, index) => {
            if (char === letter) {
              guessedWord[index] = letter
              guessedWordElement.children[index].textContent = letter
            }
          })
      } else {
        lives = (lives - 1) 
        livesElement.textContent = lives
       // after lives go down by 1, livesElement textContent should be updated to reflect lives
       // if lives reach 0, live counter should stop at 0
       // if lives reach 0, game is over - display game over
      } if (lives <= 0) {
        lives = 0
        livesElement.textContent = lives
        messageContainerElement.textContent = "Game Over"
      }
        // if i input the coreect word i need to display a message saying you win
      if (guessedWord.join("") === correctWord) {
      messageContainerElement.textContent = "You Win!"
      }
}
  // if i hit the reset button need to restart the game
const restartGame = () => {
  // Reset lives
  lives = 5
  livesElement.textContent = lives
  // Choose a new word
  randomIndex = Math.floor(Math.random() * list.length)
  console.log('randomIndex: ', randomIndex)
  correctWord = list[randomIndex]
  console.log('correctWord: ', correctWord)
  guessedWord = []
  guessedWordElement.innerHTML = ""

  const splitWord = correctWord.split('')
  splitWord.forEach(() => {
      const dashElement = document.createElement("p")
      dashElement.className = ('dash')
      dashElement.textContent = "_"
      guessedWordElement.appendChild(dashElement)
  })
  // Clear the message container
  messageContainerElement.textContent = ""
}
/*----------------------------- Event Listeners -----------------------------*/
buttonsElement.forEach( (buttonElement) => {
    buttonElement.addEventListener("click", handleClick) 
})
restartButElement.addEventListener("click", restartGame)