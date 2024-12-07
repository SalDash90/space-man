/*-------------------------------- Constants --------------------------------*/
const list = [
  {word: "BATTERY", hint: "Component that stores electrons to give the car electricity"},
  {word: "ENGINE", hint: "The main part of the car and its power can be measured by HP"},
  {word: "RADIATOR", hint: "Component of the engine's cooling system."},
  {word: "COMPRESSOR", hint: "Main part of car AC system"},
  {word: "GEAR-BOX", hint: "Part Helps the car to move forward and reverse"},
  {word: "STEERING-PUMP", hint: "Component to help steer the steering wheel"},
  {word: "DRIVE-BELT", hint: "Part that connects various parts together with the engine"},
  {word: "FUSE-BOX", hint: "Compartment to hold the electrical circuit protections"},
  {word: "BRAKES", hint:"Part in 4 tires to stop the car"}
];

/*-------------------------------- Variables --------------------------------*/
// Use a method to choose a random index number each time
let randomIndex = Math.floor(Math.random() * list.length) 
let randomObject = list[randomIndex] 
let correctWord = randomObject.word  // Get the random word
let hint = randomObject.hint;  // Get the hint
console.log(correctWord)
let guessedWord = []
let lives = 5
let splitWord = correctWord.split('')

/*------------------------ Cached Element References ------------------------*/
const buttonsElement = document.querySelectorAll(".letter");
const restartButElement = document.querySelector("#Restart");
const livesElement = document.querySelector(".Lives");
const guessedWordElement = document.querySelector("#Guessed-Wrod");
const messageContainerElement = document.querySelector(".Message-Container");
const hintElement = document.querySelector(".hint");

/*-------------------------------- Functions --------------------------------*/
const setupGame = () => {
  guessedWord = [];  // Reset guessedWord array
  guessedWordElement.innerHTML = ""  // Clear current guessed word display

  // Create an array with underscores for each letter and a space for the space characters
  splitWord.forEach((char) => {
    const dashElement = document.createElement("p")
    dashElement.className = "dash"
    dashElement.textContent = (char === " ") ? " " : "_"  // Preserve spaces in the display
    guessedWord.push(char === " " ? " " : "_") // Also update guessedWord for comparison
    guessedWordElement.appendChild(dashElement)
  })

  // Set the hint and lives display
  hintElement.textContent = hint;  // Display the hint
  updateLivesDisplay ()
  messageContainerElement.textContent = ""  // Clear any messages
}

const updateLivesDisplay = () => {
  let livesDisplay = "🏎️".repeat(lives) + "💀".repeat(5 - lives)
  livesElement.textContent = livesDisplay
}

const handleClick = (event) => {
  let letter = event.target.innerText;
  compare(letter);
}

const compare = (letter) => {
  let correctGuess = false

  splitWord.forEach((char, index) => {
    if (char === letter) {
      guessedWord[index] = letter
      guessedWordElement.children[index].textContent = letter; 
      correctGuess = true
    }
  });

  if (!correctGuess) {
    lives -= 1;
    updateLivesDisplay()
  }

  if (lives <= 0) {
    lives = 0
    updateLivesDisplay()
    messageContainerElement.textContent = "🧑‍🔧Game Over🧑‍🔧"
  }

  if (guessedWord.join("") === correctWord) {
    messageContainerElement.textContent = "You Win!"
  }
};



const restartGame = () => {
  lives = 5
  updateLivesDisplay()

  randomIndex = Math.floor(Math.random() * list.length)
  let randomObject = list[randomIndex]
  correctWord = randomObject.word
  hint = randomObject.hint
console.log(correctWord)
  guessedWord = []
  guessedWordElement.innerHTML = ""

  splitWord = correctWord.split('')
  setupGame()
}

// Initialize the game
setupGame();

/*----------------------------- Event Listeners -----------------------------*/
buttonsElement.forEach((buttonElement) => {
  buttonElement.addEventListener("click", handleClick);
});

restartButElement.addEventListener("click", restartGame);
