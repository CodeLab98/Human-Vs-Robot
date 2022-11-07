


// These are to display all the changes 
const roundNumberDisplay = document.getElementById('round-number');
const robotGuessDisplay = document.getElementById('robot-guess');
const humanScoreDisplay = document.getElementById('human-score');
const robotScoreDisplay = document.getElementById('robot-score');
const targetNumberDisplay = document.getElementById('target-number');
const robotWinsDisplay = document.getElementById('robot-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round')

// These are the starting point values for our game
let humanScore = 0;
let robotScore = 0;
let currentRoundNumber = 1;

// This function will generate a number between 1 - 10 which is going to be out target nuumber

const generateTarget = () => {

  let randomInt = Math.floor(Math.random() * 10);
  return randomInt

};

// This function compares the guesses and pick a winner, which is closest to the target number

const compareGuesses = (userGuess, robotGuess, targetNum) => {

  const humanDifference = Math.abs(targetNum - userGuess);
  const robotDifference = Math.abs(targetNum - robotGuess);

  return humanDifference <= robotDifference;

};

// Increments the scores depending on the winner  

const updateScore = (value) => {

    if(value === 'human') {
      humanScore++;
    } else if (value === 'robot') {
      robotScore++;
    }
};

// Increments the round
const advanceRound = () => {

  currentRoundNumber++

};


// ###########################

  //  Guess Button

// ###########################

let target;
const humanGuessInput = document.getElementById('human-guess');

guessButton.addEventListener('click', () => {
  // Generate the target value
  target = generateTarget();
  // Retrieve the player's guess
  const currentHumanGuess = humanGuessInput.value;
  // Make a random 'computer guess'
  const robotGuess = Math.floor(Math.random() * 10);

  // Display the computer guess and the target
  robotGuessDisplay.innerText = robotGuess;
  targetNumberDisplay.innerText = target;
  
  // Determine if the human or computer wins:
  const humanIsWinner = compareGuesses(currentHumanGuess, robotGuess, target)
  const winner = humanIsWinner ? 'human' : 'robot';

  // Update the correct score:
  updateScore(winner);

  // Display the winner
  if (humanIsWinner) {
    guessButton.innerText = 'You Win!!!!!';
    guessButton.classList.toggle('winning-text')
  } else {
    robotWinsDisplay.innerText = 'Robot Wins!';
  }



  // Display the current scores:
  humanScoreDisplay.innerText = humanScore;
  robotScoreDisplay.innerText = robotScore;
  
  // Set the correct disabled state for the buttons
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});


// ###########################

  // Next Round Button

// ###########################


nextRoundButton.addEventListener('click', () => {
  // Increase the round number
  advanceRound();
  // Display the new round number
  roundNumberDisplay.innerText = currentRoundNumber;

  // Set the correct disabled state for the buttons
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Reset the guess input box and the target number display:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = '';
  robotGuessDisplay.innerText = '?';
  robotWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});



// ###########################

  //  Add and Subtract Button Controls

// ###########################

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = + humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});


// ###########################

  //  Handle the Value Controls

// ###########################


const handleValueChange = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});
