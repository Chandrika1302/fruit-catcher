import { postScore, postHighScore } from "./api.js";
import state from "./state.js";
import UI, { showGameOver, updateScoreBar } from "./UI.js";

export default function animate() {

    if (state.dragging) return requestAnimationFrame(animate);

    setFruitPosition(state.fruit);
    incrementPosition();
    checkCollision();
    updateScoreBar({ time: state.time, highscore: state.highscore, score: state.score });

    if (state.time <= 0) {
        showGameOver({ score: state.score });
        postScore(state.score);
        postHighScore(state.highscore)

        return;
    }
    requestAnimationFrame(animate);
}

function incrementPosition() {
    state.fruit.y += state.fruit.vy;
    state.fruit.x += state.fruit.vx;
}

function setFruitPosition({ x, y }) {
    UI.fruit.style.top = y + "px";
    UI.fruit.style.transform = `translateX(${x}px)`
}

function checkCollision() {
    if (isOutside()) {
        reset();
    }
}

function reset() {
    state.fruit.x = 0;
    state.fruit.y = 0;
    state.fruit.vy = randomNumberFromInterval(2, 4)
    if (Math.random() < 0.5)
        state.fruit.vx = -randomNumberFromInterval(1, 2)
    else
        state.fruit.vx = randomNumberFromInterval(1, 2)

}

function randomNumberFromInterval(min, max) { // min and max included 
    const num = +(Math.random() * (max - min + 1) + min).toFixed(3)
    return num;
}

function isOutside() {
    const div1 = UI.container.getBoundingClientRect();
    const div2 = UI.fruit.getBoundingClientRect();

    const isHorizontiallyOutside = !(div1.right > div2.left &&
        div1.left < div2.right
    )

    return state.fruit.y >= window.innerHeight || isHorizontiallyOutside
}


export { reset }