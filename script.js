//localStorage.clear();
// Array to hold scores
let scores = JSON.parse(localStorage.getItem('scores')) || []; // Fetch scores from localStorage or initialize empty array

console.log(scores);
// Elements
const displayText = document.getElementById("display-text");
const typingInput = document.getElementById("typing-input");
const startButton = document.getElementById("start-button");
const result = document.getElementById("result");
const wordTracker = document.getElementById("word-tracker");

const sentences = [
    "Twist mango velvet brick glimmer offset flower.",
    "Torch prism clever garden stitch: ripple charm.",
    "Frost beacon lush, orbit silver canyon maple.",
    "Breeze amber crystal, jungle vivid !shadow oak.",
    "Spark drift. hollow meadow thunder blossom dusk."
];

let startTime, endTime;
let randomSentence, sentenceWords;
let correctWords = 0;

// Check if the start button exists before adding the event listener
if (startButton) {
    startButton.addEventListener("click", startTest);
}

function startTest() {
    randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceWords = randomSentence.split(" ");
    displayText.innerText = randomSentence;
    typingInput.innerText = "";
    typingInput.setAttribute("contenteditable", "true");
    typingInput.focus();
    startButton.disabled = true;
    result.innerText = "";
    wordTracker.innerHTML = "";
    startTime = new Date().getTime();
    correctWords = 0;

    typingInput.addEventListener("input", trackTyping);
}

function trackTyping() {
    const typedWords = typingInput.innerText.trim().split(" ");

    // Highlight words based on correctness
    let feedback = sentenceWords.map((word, index) => {
        if (index < typedWords.length) {
            if (word === typedWords[index]) {
                return `<span class="correct">${word}</span>`;
            } else {
                return `<span class="incorrect">${word}</span>`;
            }
        } else {
            return `<span>${word}</span>`;
        }
    }).join(" ");

    wordTracker.innerHTML = feedback;

    correctWords = typedWords.reduce((count, word, index) =>
        count + (word === sentenceWords[index] ? 1 : 0), 0);

    // End the test when the user finishes typing the sentence and presses space after the last word
    if (typedWords.length === sentenceWords.length && typingInput.innerText.endsWith(" ")) {
        endTime = new Date().getTime();
        calculateWPM();
    }
}

function calculateWPM() {
    const timeTaken = (endTime - startTime) / 1000;
    const wpm = Math.round((sentenceWords.length / timeTaken) * 60);
    result.innerText = `Your typing speed is ${wpm} WPM with ${correctWords} correct words.`;
    saveScore(wpm);
    typingInput.setAttribute("contenteditable", "false");
    startButton.disabled = false;
}

function saveScore(wpm) {
    const playerName = prompt("Enter your name:");

    const score = { name: playerName || "Anonymous", score: wpm };

    scores.push(score); // Add new score to array

    // Sort scores in descending order based on the score
    scores.sort((a, b) => b.score - a.score);

    // Save the updated leaderboard to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
}
