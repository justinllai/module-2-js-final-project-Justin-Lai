let currentSonicTile;
let currentEggTile;
let currentMetalTile2;
let score = 0;
let gameOver = false;
let timeLeft = 60; // 60 seconds
let setSonicInterval;
let setEggInterval;
let setMetalInterval;

// resets the highest score to 0 when the user leaves the page
window.addEventListener("unload", function() {
    localStorage.setItem("HighestScore", 0);
});

window.onload = function() {
    setGame();
    startTime();
    updateHighestScore(getHighestScore()); // Display the highest score when the page loads
    
    // play again button
    document.getElementById("play-again").addEventListener("click", function() {
        resetGame();
    });
}

function setGame(){
    // setup grid for the game board in html
    for (i = 0; i < 9; i++){ // i goes from 0 to 8 but it stops at 9 since it's a 3x3 board 
        // div id = "0-8"</div>
        let tile = document.createElement("div"); // create a div tag
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    // intializes the tiles
    currentSonicTile = document.getElementById("0");
    currentEggTile = document.getElementById("0");
    currentMetalTile2 = document.getElementById("0");

    setSonicInterval = setInterval(setSonic, 900); // 900 milliseconds = .9 seconds
    setEggInterval = setInterval(setEgg, 900); // 900 milliseconds = .9 seconds
    setMetalInterval = setInterval(setMetal, 900); // 900 milliseconds = .9 seconds
}

function getRandomTile(){
    // math random (0-1) * 9 = (0-9) round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function startTime() {
    let timeInterval = setInterval(function() {
        timeLeft--;
        document.getElementById("time-left").innerText = "Time Left: " + timeLeft + "s";
        
        if (timeLeft <= 0 || gameOver) {
            clearInterval(timeInterval);
            endGame();
        }
    }, 1000); // Update timer every second
}

function selectTile(){
    if(gameOver){
        return;
    }

    if(this == currentSonicTile){
        score += 10;
        console.log("Score after adding 10: " + score);
        document.getElementById("score").innerText = score.toString(); // updates the score
        updateIfHighestScore(); // update highest score when it changes
    }

    else if(this == currentEggTile || this == currentMetalTile2){
        document.getElementById("score").innerText = " WOMP WOMP GAME OVER Score: " + score.toString();
        gameOver = true;
    }
}

function setSonic(){
    if(gameOver){
        return;
    }

    if (currentSonicTile){
        currentSonicTile.innerHTML = "";
    }
    let sonic = document.createElement("img");
    sonic.src = "./sonic.png";

    let num;

    do {
        num = getRandomTile();
    } while (num === currentEggTile.id || num === currentMetalTile2.id); 

    currentSonicTile = document.getElementById(num)
    currentSonicTile.appendChild(sonic);
}

function setEgg(){
    if(gameOver){
        return;
    }
    
    if (currentEggTile){
        currentEggTile.innerHTML = "";
    }

    let egg = document.createElement("img");
    egg.src = "./eggman-head.png";

    let num;
    
    do {
        num = getRandomTile();
    } while (num === currentSonicTile.id || num === currentMetalTile2.id);

    currentEggTile = document.getElementById(num)
    currentEggTile.appendChild(egg);
}

function setMetal(){
    if(gameOver){
        return;
    }

    if (currentMetalTile2){
        currentMetalTile2.innerHTML = "";
    }

    let metal = document.createElement("img");
    metal.src = "./metal-sonic-head.png";

    let num;
    
    do {
        num = getRandomTile();
    } while (num === currentSonicTile.id || num === currentEggTile.id);

    currentMetalTile2 = document.getElementById(num)
    currentMetalTile2.appendChild(metal);
}

function getHighestScore() { // updating score and it's highest score
    return localStorage.getItem("HighestScore") || 0;
}

function setHighestScore(score) {
    localStorage.setItem("HighestScore", score);
}

function updateHighestScore(score) {
    document.getElementById("Highest-Score").innerText = score.toString();
}

function updateIfHighestScore() {
    let highestScore = getHighestScore();
    if (score > highestScore) {
        setHighestScore(score);
        updateHighestScore(score);
    }
}

function resetGame() {
    console.log("Score before reset: " + score);
    gameOver = false;
    timeLeft = 60;
    document.getElementById("time-left").innerText = "60 seconds";
    // clears the game board so when i click play again it doesn't have another game board and the characters double up and get messy
    document.getElementById("board").innerHTML = "";

    clearInterval(setSonicInterval);
    clearInterval(setEggInterval);
    clearInterval(setMetalInterval);

    setGame(); // Reset the game board
    score = 0; // Reset the score to zero
    document.getElementById("score").innerText = "0";
    updateHighestScore(getHighestScore()); // keeps the update score without resetting it after clicking play again

    // restart the time after click play again
    startTime();
    
    console.log("Score after reset: " + score);
}

function endGame(){
    gameOver = true;
    updateIfHighestScore();
}