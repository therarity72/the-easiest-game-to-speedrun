// the easiest game to speedrun

const app = document.createElement('div');
app.style.fontFamily = 'sans-serif';
app.style.textAlign = 'center';
app.style.marginTop = '50px';
document.body.appendChild(app);

let startTime = null;
let timerInterval = null;
let elapsed = 0;
let gameState = "start"; // "start", "running", "end"

// Pixel art for character and floor
function characterArt() {
    return `
    <div style="display:inline-block;">
      <div style="width:40px;height:40px;background:#fcd303;border-radius:50%;margin:auto;"></div>
      <div style="width:30px;height:40px;background:#3498db;margin:auto;"></div>
      <div style="width:60px;height:20px;background:#e17055;margin:auto;border-radius:10px;"></div>
    </div>
    `;
}
function floorArt() {
    return `<div style="height:20px;background:#444;width:200px;margin:20px auto 0;border-radius:10px;"></div>`;
}

// Utility to format time
function formatTime(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const msLeft = ms % 1000;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${msLeft.toString().padStart(3, '0')}`;
}

// Start Screen
function showStartScreen() {
    gameState = "start";
    app.innerHTML = `
        <h1>The Easiest Game to Speedrun</h1>
        <button id="startBtn" style="font-size:2em;padding:0.5em 2em;">Start Game</button>
        <div style="margin-top:40px;">
            ${characterArt()}
            ${floorArt()}
        </div>
        <div style="margin-top:20px;color:#888;">Press <b>Space</b> to Start</div>
    `;
    document.getElementById('startBtn').onclick = startGame;
}

// Game Screen
function showGameScreen() {
    gameState = "running";
    app.innerHTML = `
        <div id="timer" style="font-size:2em;margin-bottom:20px;">00:00:00.000</div>
        ${characterArt()}
        ${floorArt()}
        <button id="endBtn" style="margin-top:40px;font-size:1.5em;">End Game</button>
        <div style="margin-top:20px;color:#888;">Press <b>Space</b> to End</div>
    `;
    document.getElementById('endBtn').onclick = endGame;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsed = Date.now() - startTime;
        document.getElementById('timer').textContent = formatTime(elapsed);
    }, 16);
}

// End Screen
function showEndScreen() {
    gameState = "end";
    app.innerHTML = `
        <h2>Speedrun Complete!</h2>
        <div style="font-size:2em;margin:20px 0;">Your Time: <span style="font-weight:bold;">${formatTime(elapsed)}</span></div>
        ${characterArt()}
        ${floorArt()}
        <button id="restartBtn" style="margin-top:40px;font-size:1.2em;">Restart</button>
    `;
    document.getElementById('restartBtn').onclick = showStartScreen;
}

function startGame() {
    elapsed = 0;
    showGameScreen();
}

function endGame() {
    clearInterval(timerInterval);
    showEndScreen();
}

// Listen for spacebar to start/end/restart
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (gameState === "start") {
            startGame();
        } else if (gameState === "running") {
            endGame();
        } else if (gameState === "end") {
            showStartScreen();
        }
    }
});

// Initialize
showStartScreen();