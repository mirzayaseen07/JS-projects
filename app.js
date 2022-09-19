// Game Values
let min = 1,
  max = 20,
  winningNum = getRandomNum(min, max),
  guessesleft = 5;

// Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num");
guessBtn = document.querySelector("#guess-btn");
guessInput = document.querySelector("#guess-input");
message = document.querySelector(".message");

// Assign Min And Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event Listner 
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  } 
});

// Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a Number Between ${min} and ${max}`, "red");
  }

  // Check if Won
  if (guess === winningNum) {
    // Game Over - Won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);


  } else {
    // Wrong Number
    guessesleft -= 1;

    if (guessesleft === 0) {
      // Game Over - Lost

      gameOver(false, `Game Over, You Lost. The Correct Number Was ${winningNum}`);

    } else {
      // Game continues - answer wrong

      // Change Border Color
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      // Tell Users That Its The Wrong Number
      setMessage(`${guess} is not correct, ${guessesleft} guesses left`, "red");
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
won === true ? color = 'green' : color = 'red';

  // Disable Input
  guessInput.disabled = true;
  // Change Border Color
  guessInput.style.borderColor = color;
  // color of message 
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
