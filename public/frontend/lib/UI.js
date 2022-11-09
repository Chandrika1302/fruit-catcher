const UI = {
    fruit: document.getElementById('fruit'),
    bin: document.getElementById('bin'),
    score: document.getElementById('score'),
    highscore: document.getElementById('high-score'),
    loadingModal: document.getElementById('loading-screen'),
    container: document.getElementById('main'),
    time: document.getElementById('time'),
    gameOver: document.getElementById('gameover-screen'),

}

function hideLoadingScreen() {
    UI.loadingModal.classList.add('hide')
    setTimeout(() => {
        UI.loadingModal.classList.add('hidden')
    }, 500)
}

function showGameOver({ score }) {
    const textElement = UI.gameOver.querySelector('p')
    textElement.textContent = `You scored: ${score} points!`
    UI.gameOver.classList.toggle('show');
    UI.gameOver.classList.toggle('hidden');
}


function updateScoreBar({ score, highscore, time }) {
    UI.score.textContent = `Score: ${score}`;
    UI.highscore.textContent = `HighScore: ${highscore}`;
    UI.time.textContent = `Time remaining: ${time}`;
}



export default UI;
export { hideLoadingScreen, showGameOver, updateScoreBar }