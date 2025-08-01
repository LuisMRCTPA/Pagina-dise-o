const tetrisCanvas = document.getElementById('tetris-canvas');
const tetrisCtx = tetrisCanvas.getContext('2d');
const tetrisScoreElement = document.getElementById('tetris-score');
const tetrisStartBtn = document.getElementById('tetris-start-btn');

// Scale canvas
tetrisCtx.scale(30, 30);

// Game state
let tetrisScore = 0;
let isTetrisPaused = false;
let isTetrisGameOver = false;
let tetrisDropCounter = 0;
let tetrisDropInterval = 1000;
let tetrisLastTime = 0;

// Tetriminos (now prefixed)
const tetrisPieces = [
    null, [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], // I
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ], // J
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ], // L
    [
        [4, 4],
        [4, 4]
    ], // O
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ], // S
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ], // T
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ] // Z
];

// Arena
const tetrisArena = createTetrisMatrix(12, 20);

// Player
const tetrisPlayer = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0
};

// Initialize
resetTetrisPlayer();
updateTetrisScore();

// Game loop
function updateTetris(time = 0) {
    if (isTetrisGameOver) return;

    const deltaTime = time - tetrisLastTime;
    tetrisLastTime = time;

    if (isTetrisPaused) {
        requestAnimationFrame(updateTetris);
        return;
    }

    tetrisDropCounter += deltaTime;
    if (tetrisDropCounter > tetrisDropInterval) {
        tetrisPlayerDrop();
    }

    drawTetris();
    requestAnimationFrame(updateTetris);
}

// Helper: Create matrix
function createTetrisMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// Reset player
function resetTetrisPlayer() {
    const piece = Math.floor(Math.random() * 7) + 1;
    tetrisPlayer.matrix = tetrisPieces[piece];
    tetrisPlayer.pos.y = 0;
    tetrisPlayer.pos.x = Math.floor(tetrisArena[0].length / 2) -
        Math.floor(tetrisPlayer.matrix[0].length / 2);

    if (tetrisCollide()) {
        isTetrisGameOver = true;
        alert('Game Over! Refresh to play again.');
        tetrisArena.forEach(row => row.fill(0));
        tetrisPlayer.score = 0;
        updateTetrisScore();
    }
}

// Collision detection
function tetrisCollide() {
    const [m, o] = [tetrisPlayer.matrix, tetrisPlayer.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (tetrisArena[y + o.y] && tetrisArena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Controls (Tetris-only)
document.addEventListener('keydown', e => {
    if (isTetrisGameOver) return;

    switch (e.key) {
        case 'ArrowLeft':
            tetrisPlayerMove(-1);
            break;
        case 'ArrowRight':
            tetrisPlayerMove(1);
            break;
        case 'ArrowDown':
            tetrisPlayerFall();
            break;
        case 'ArrowUp':
            tetrisPlayerRotate();
            break;
        case ' ':
            tetrisPlayerDrop();
            break;
    }
});

// Tetris Start/Pause button
tetrisStartBtn.addEventListener('click', () => {
    isTetrisPaused = !isTetrisPaused;
    if (!isTetrisPaused && !isTetrisGameOver) {
        tetrisLastTime = 0;
        tetrisDropCounter = 0;
        updateTetris();
    }
});

// Start the game
updateTetris();