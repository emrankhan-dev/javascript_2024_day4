/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from '/data.js'

console.log(films.length)

// Some useful elements
const guessInput = document.getElementById('guess-input')
const messageContainer = document.getElementsByClassName('message-container')[0]
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0]
const guessForm = document.getElementById("guess-form")

let currentFilm 
let remainingGuesses = 3
let guessedFilmsAlready = []

// addEventListener
guessForm.addEventListener("submit", handleGuess)

// Call selectRandomFilm for every time 
selectRandomFilm()

/* Functions */ 
function handleGuess(e) {
    let message = ""
    e.preventDefault()
    const playerGuess = guessInput.value.split(' ').filter(Boolean).join(' ').toLowerCase()
    if (!playerGuess) {
        message = "Please enter a guess"
    } else if(playerGuess === currentFilm.title.split(' ').filter(Boolean).join(' ').toLowerCase()){
        message = "Correct! You guessed the movie!"
        remainingGuesses = 3
        guessedFilmsAlready.push(currentFilm)
        if(guessedFilmsAlready.length === films.length) {
            message = "That's all folks!"
        } else {
            setTimeout(selectRandomFilm, 3000)
        }
    } else {
        remainingGuesses--
        if(remainingGuesses > 0) {
           message = `Incorrect! You have ${remainingGuesses} more guesses remaining.` 
        } else {
            message = `The film was ${currentFilm.title}!`
            remainingGuesses = 3
            guessedFilmsAlready.push(currentFilm)
            setTimeout(selectRandomFilm, 3000)
        }
    }
    updateMessage(message)
    clearInputField()
}

function selectRandomFilm(){
    const availableFilms = films.filter(film => !guessedFilmsAlready.includes(film))
    if(availableFilms.length === 0) {
        messageContainer.textContent = "That's all folks!"
        return 
    }
    const randomIndex = Math.floor(Math.random() * availableFilms.length)
    currentFilm = availableFilms[randomIndex]
    emojiCluesContainer.textContent = currentFilm.emoji.join(" ")
}

function updateMessage(info) {
    messageContainer.textContent = info
}

function clearInputField() {
    guessInput.value = ""
}




