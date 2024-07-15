const micButton = document.querySelector(".fa-microphone");
const transcriptionElement = document.querySelector(".transcription");
let isRecording = false;
let recognition;

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    alert("Speech recognition is not supported in this browser.");
}

// Set up recognition settings
if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isRecording = true;
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        transcriptionElement.textContent = `${transcript}`;
        // analyze(transcript); // Uncomment if you define this function
    };

    recognition.onerror = (event) => {
        console.error(event);
        isRecording = false;
    };

    recognition.onend = () => {
        isRecording = false;
    };

    micButton.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
} else {
    micButton.disabled = true;
}

// Color mappings
const colors = {
    "red": "white",
    "blue": "green",
    "black": "brown",
    "grey": "yellow",
    "orange": "red",
    "white": "blue",
    "yellow": "orange",
    "pink": "purple",
    "green": "green",
    "brown": "pink",
    "mustard": "red",
    "silver": "white",
    "wheat": "silver",
    "gold": "yellow",
    "violet": "gold",
    "coffee": "grey",
    "indigo": "orange",
    "cream": "yellow",
    "cyan": "green",
    "crimson": "pink",
    "chocolate": "gold",
    "OVER": "wheat",
};

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector(".st");
    const colorDisplay = document.querySelector(".colortext");
    const ansArray = [];

    startButton.onclick = function() {
        let keys = Object.keys(colors);
        let index = 0;

        function displayNextKey() {
            if (index < keys.length) {
                let key = keys[index];
                colorDisplay.innerHTML = key;
                colorDisplay.style.color = colors[key];

                setTimeout(() => {
                    colorDisplay.innerHTML = "";
                    index++;
                    ansArray.push(transcriptionElement.textContent.trim());
                    transcriptionElement.textContent = ""; // Clear for next input
                    displayNextKey(); 
                }, 5000);
            }
        }

        displayNextKey();
    };

    const scoreButton = document.querySelector(".score");
    scoreButton.onclick = function() {
        const keyArray = Object.keys(colors);
        let score = 0;
        for (let i = 0; i < keyArray.length; i++) {
            if (colors[keyArray[i]] === ansArray[i]) {
                score++;
            }
        }

        const modal = document.querySelector(".score-card-modal");
        modal.style.display = "block";
        const rate = ((score / keyArray.length) * 100).toFixed(2);
        const scoreValue = document.querySelector(".scoreValue");
        scoreValue.innerHTML = `${rate}`;
        const conclusion = document.querySelector(".conclusion");
        
        let msg;
        if (rate < 33.33) {
            msg = "Less Executive";
        } else if (rate < 67.5) {
            msg = "Average Executive";
        } else {
            msg = "High Executive";
        }
        conclusion.innerHTML = `${msg}`;

        const testName = 'Executive Test';
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const testAttempt = {
            testName: testName,
            date: currentDate,
            time: currentTime,
            score: rate
        };

        let testAttempts = JSON.parse(localStorage.getItem('testAttempts')) || [];
        testAttempts.push(testAttempt);
        localStorage.setItem('testAttempts', JSON.stringify(testAttempts));
    };

    const closeScoreCardBtn = document.getElementById("closeScoreCardBtn");
    closeScoreCardBtn.addEventListener("click", function() {
        const scoreCardModal = document.querySelector(".score-card-modal");
        scoreCardModal.style.display = "none";
    });
});
