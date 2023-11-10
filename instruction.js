// Selecting elements from the Document
var play_btn = document.querySelector(".play")
var intro_body = document.querySelector(".body1")
var fullname = document.querySelector("#name")
var nick = document.querySelector("#nick-name")

// Adding an event listener for the play button to navigate to the game page
play_btn.addEventListener('click', () => {
    window.location.href = "game.html"
})

// Setting up and playing background music for the game 
const bgm = new Audio("MainTheme-320bit(chosic.com).mp3")
bgm.play()
bgm.loop = true;

// Adding another event listener for the play button to enter the name compulsorily
play_btn.addEventListener('click', () => {
        // Checking if the full name is empty and the nickname is not empty
    if (fullname.value == "" && nick.value != "") {
        alert("Please Enter your Full name")
        window.location.reload()
    }
        // Checking if the full name is not empty and the nickname is empty
    else if (fullname.value != "" && nick.value == "") {
        alert("Please Enter your Nick name")
        window.location.reload()
    }
        // Checking if both full name and nickname are not empty
    else if (fullname.value != "" && nick.value != "") {
        sessionStorage.setItem('Nickname',nick.value)
        sessionStorage.setItem('Fullname',fullname.value)

        window.location.href="game.html"
    }
    else{
        alert("Please Enter the details")
        window.location.reload()
    }
})