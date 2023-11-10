// Selecting various elements from the Document
var play = document.querySelector(".play_again")
var home = document.querySelector(".home")
var score_board = document.querySelector("#overallScore");
const name = document.querySelector(".name")
var userName = document.getElementById('user-name');
var words = document.querySelector(".phrases")

// Retrieving user's nickname from sessionStorage and displaying it
userName.textContent = sessionStorage.getItem('Nickname');
console.log(userName)

// Retrieving and displaying the score from localStorage
const score = localStorage.getItem("score");
score_board.innerText = score;

// Event handling for 'Play Again' and 'Home' buttons
play.onclick = () => {
    window.location.href = "game.html"
    sessionStorage.removeItem("scr")
}
home.onclick = () => {
    window.location.href = "index.html"
    sessionStorage.removeItem("scr")
}

// Storing a value from sessionStorage into a variable named score_boardx
score_board = sessionStorage.getItem("scr");
// console.log(score_board)

// Arrays containing phrases for win and lose scenarios
const lose_phrases = ["Game over! Try again!",
    "Ouch! You can do better!",
    "Believe you can and you're halfway there.",
    "Your only limit is you.",
    "Flap harder next time!",
    "Oops! That's a tough one.",
    "Better luck next flap!",
    "You are capable of more than you know.",
    "The only way to do great work is to love what you do.",
    "You're stronger than you think.",
    "Crash landing! Retry?",
    "Lost your wings! Retry, maybe?",
    "Flappy fate! One more go?",
    "Close call! Want to try again?", "Flap flub! Another attempt?"]


const win_game = ["Congratulations! You soared past 100!",
    "You've reached 100! Keep flying higher!",
    "100 points! You're on fire!"]


// Checking the score and displaying a corresponding message
if (score ===100){
    const Display = win_game[Math.floor(Math.random() *3)]
    words.textContent = Display ;
    console.log(randomDisplay)
}
else{
    const randomDisplay = lose_phrases[Math.floor(Math.random() * 14)]
    words.textContent = randomDisplay ;
    console.log(randomDisplay)
}