export async function fetchHighScore() {
    const url = '/api/highscore'
    const { highscore } = await ((await fetch(url)).json());
    return highscore;
}

export async function postHighScore(score) {
    await fetch('/api/highscore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            highscore: score
        })
    })
}

export async function fetchScores() {
    const url = '/api/scores'
    const { scores } = await ((await fetch(url)).json());
    return scores;
}

export async function postScore(score) {
    await fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score
        })
    })
}