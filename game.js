// Fetching necessary elements from the Document
var tower = document.getElementById("block");
var hole = document.getElementById("hole");
var bird = document.querySelector(".bird");
var body = document.querySelector(".body3");
var timer = document.getElementById("time");

const main = document.querySelector("#game");
var name = document.getElementById("name")
var nicky = document.getElementById("nick-name")

const nick_name = sessionStorage.getItem('nicky')

// Retrieving data from session storage and initializing variables
var score = Number(sessionStorage.getItem("scr")) || 0;

let birdLeft = 300;
let birdBottom = 370;
let isGameOver = false;
gap = 470;

const gravity = 1;
let jumping = 0;

// Function to move the bird downwards due to gravity
function start() {
    if (jumping == 0) {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    // Check if the bird hits the ground or ceiling and redirect to the gameover page
    if (birdBottom > 550) {
        sessionStorage.setItem("scr", score)
        window.location.href = "gameover.html"
    }
    else if (birdBottom < 10) {
        sessionStorage.setItem("scr", score)
        window.location.href = "gameover.html"
    }
}
let gameTimerId = setInterval(start, 10);

// Play the flap sound on bird jump
let flap = new Audio("flap.mp3")
body.onclick = () => {
    flap.pause()
    flap.currentTime = 0;
    flap.play()
}

// Background music settings
const bgm = new Audio("Flappy Bird Theme Song.mp3")
bgm.play()
bgm.loop = true;

// Function to handle the bird's jump when clicked      
function jump() {
    if (jumping === 0) {
        jumping = 1;
        var jumpCount = 0;
        var jumpInterval = setInterval(function () {
            birdBottom += 10;
            bird.style.bottom = birdBottom + 'px';
            bird.style.left = birdLeft + 'px';
            jumpCount++;
            if (jumpCount >= 5) {
                clearInterval(jumpInterval);
                jumping = 0;
            }
        }, 10);
    }
}

// Listening for the jump action
body.addEventListener('click', jump);

// Initializing score and countdown variables
let scr = 0;
let countdown = 0;

// Timer to increase score and update the time
const timeinterval = setInterval(() => {
    countdown++;

    if (Number(countdown) % 5 == 0) {
        console.log(scr)
        scr++
        // Update the score on the page and store it in local storage
        var score = document.getElementById("scr");
        score.innerText = scr;
        localStorage.setItem("score", scr);
            let point = new Audio("point.mp3")
            point.pause()
            point.currentTime = 0;
            point.play()
    }

    timer.innerText = countdown;
}, 1000);

// Function to detect collision between the bird and towers
function isCollision(bird, tower, toptower) {
    const birdRect = bird.getBoundingClientRect();
    const towerRect = tower.getBoundingClientRect();
    const toptowerRect = toptower.getBoundingClientRect();

    const collidewithtower = (
        birdRect.right > towerRect.left &&
        birdRect.left < towerRect.right &&
        birdRect.bottom > towerRect.top &&
        birdRect.top < towerRect.bottom
    );
    const collidewithtoptower = (
        birdRect.right > toptowerRect.left &&
        birdRect.left < toptowerRect.right &&
        birdRect.bottom > toptowerRect.top &&
        birdRect.top < toptowerRect.bottom
    );
    return collidewithtower || collidewithtoptower

}

// Function to generate towers and manage their movement
function generateTower() {
    let towerLeft = 1265;
    let randomHeight = -(Math.random() * 100) + 10
    let towerBottom = randomHeight;
    const tower = document.createElement('div')
    const topTower = document.createElement('div')

    tower.classList.add('tower')
    topTower.classList.add('topTower')
    main.appendChild(tower)
    main.appendChild(topTower)
    tower.style.left = towerLeft + 'px'
    topTower.style.left = towerLeft + 'px'
    tower.style.bottom = towerBottom + 'px'
    topTower.style.bottom = towerBottom + gap + 'px'
    function moveTower() {
        towerLeft -= 3
        tower.style.left = towerLeft + 'px'
        topTower.style.left = towerLeft + 'px'

        // Remove towers that have passed and check for collision
        if (towerLeft === -50) {
            clearInterval(timerId)
            main.removeChild(tower)
            main.removeChild(topTower)

        }
        if (isCollision(bird, tower, topTower)) {
            gameOver();
            clearInterval(gameTimerId);
            window.location.href = 'gameover.html';
        }
    }
    let timerId = setInterval(moveTower, 20)
    // Recursively generate new towers
    setTimeout(generateTower, 1700)
}

// Start tower generation
generateTower()

// Function to handle game over
function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('click', jump)
    // Play the die sound when the bird hits the tower and dies
    let die = new Audio("flappy-bird-hit-sound.mp3")
    die.pause()
    die.currentTime = 0;
    die.play()
}
