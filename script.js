const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const difficultySelect = document.querySelector("#difficulty-select");

const wordList = [
    // Easy words
    {
        word: "html",
        hint:  "acronym for HyperText Markup Language.",
        difficulty: "easy"
    },
    {
        word: "css",
        hint:  "acronym for Cascading Style Sheet.",
        difficulty: "easy"
    },
    {
        word: "div",
        hint:  "HTML element for division or section.",
        difficulty: "easy"
    },
    {
        word: "span",
        hint:  "HTML inline container for text.",
        difficulty: "easy"
    },
    // Medium words
    {
        word: "strong",
        hint:  "used to define important text.",
        difficulty: "medium"
    },
    {
        word: "audio",
        hint:  "used for playing audio files.",
        difficulty: "medium"
    },
    {
        word: "header",
        hint:  "HTML element representing introductory content.",
        difficulty: "medium"
    },
    {
        word: "footer",
        hint:  "HTML element representing the footer of a document.",
        difficulty: "medium"
    },
    // Hard words
    {
        word: "equals",
        hint:  "used to assign a value to a variable.",
        difficulty: "hard"
    },
    {
        word: "onclick",
        hint:  "event occurs when the user clicks on an HTML element.",
        difficulty: "hard"
    },
    {
        word: "queryselector",
        hint:  "JavaScript method to select an element.",
        difficulty: "hard"
    },
    {
        word: "addeventlistener",
        hint:  "JavaScript method to attach an event handler.",
        difficulty: "hard"
    }
];

let currentWord, correctLetters, wrongGuessCount;
let maxGuesses;
const difficultySettings = {
    easy: 6,
    medium: 6,
    hard: 6
};

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const selectedDifficulty = difficultySelect.value;
    const filteredWords = wordList.filter(word => word.difficulty === selectedDifficulty);
    const { word, hint } = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    currentWord = word;
    maxGuesses = difficultySettings[selectedDifficulty];
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter">`).join("");
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
difficultySelect.addEventListener("change", getRandomWord);