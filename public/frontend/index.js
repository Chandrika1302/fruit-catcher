import animate, { reset } from './lib/animation.js';
import { fetchHighScore } from './lib/api.js'
import state from './lib/state.js';
import UI, { hideLoadingScreen } from './lib/UI.js';


init();

async function init() {

    state.highscore = (await fetchHighScore()) ?? 0;
    hideLoadingScreen();

    UI.fruit.style.top = state.fruit.y;

    UI.fruit.addEventListener('dragstart', function (e) {
        state.dragging = true;
    })
    UI.fruit.addEventListener('dragend', function (e) {
        state.dragging = false;
    })

    UI.bin.addEventListener('dragover', (e) => e.preventDefault());

    UI.bin.addEventListener('drop', function (e) {
        e.preventDefault();
        incrementScore();
        reset();
    })

    requestAnimationFrame(animate);

    setInterval(() => {
        if (state.dragging) return;
        state.time--;
    }, 1000)

}

function incrementScore() {
    state.score++;
    if (state.score > state.highscore) {
        updateHighscore(state.score);
    }
}

function updateHighscore(score) {
    state.highscore = score;
}

