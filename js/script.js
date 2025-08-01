document.addEventListener('DOMContentLoaded', function() {
    // Variables del juego de códigos
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const collectSound = document.getElementById('collectSound');
    let shipX = 180;
    const shipY = 360;
    const shipWidth = 40;
    const goodCode = ['<div>', '{color:blue;}', 'function()'];
    const badCode = ['<dog>', '++html', '@wrong'];
    let fallingItems = [];
    let score = 0;
    let gameRunning = false;
    let spawnInterval;
    // Variables del mini juego de estrellas
    let juegoActivo = false;
    let puntuacion = 0;
    const estrella = document.getElementById("estrella");
    const juegoArea = document.getElementById("juegoArea");
    const puntuacionTexto = document.getElementById("puntuacion");
    // Funciones del juego de códigos
    function drawShip() {
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(shipX, shipY, shipWidth, 20);
    }

    function drawItem(item) {
        ctx.fillStyle = item.correct ? '#00ff00' : '#ff4444';
        ctx.fillRect(item.x, item.y, 80, 20);
        ctx.fillStyle = 'black';
        ctx.fillText(item.text, item.x + 5, item.y + 15);
    }

    function updateGame() {
        if (!gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShip();
        for (let i = 0; i < fallingItems.length; i++) {
            let item = fallingItems[i];
            item.y += 2;
            drawItem(item);
            if (item.y + 20 >= shipY && item.x < shipX + shipWidth && item.x + 80 >
                shipX) {
                if (item.correct) {
                    score++;
                    collectSound.currentTime = 0;
                    collectSound.play();
                }
                fallingItems.splice(i, 1);
                i--;
            } else if (item.y > canvas.height) {
                fallingItems.splice(i, 1);
                i--;
            }
        }
        ctx.fillStyle = 'white';
        ctx.fillText('Puntaje: ' + score, 10, 20);
        requestAnimationFrame(updateGame);
    }

    function spawnItem() {
        const isGood = Math.random() > 0.5;
        const text = isGood ? goodCode[Math.floor(Math.random() *
            goodCode.length)] : badCode[Math.floor(Math.random() *
            badCode.length)];
        fallingItems.push({
            x: Math.random() * 320,
            y: 0,
            text: text,
            correct: isGood
        });
    }

    function startGame() {
        console.log("Iniciando juego...");
        if (!gameRunning) {
            gameRunning = true;
            fallingItems = [];
            score = 0;
            spawnInterval = setInterval(spawnItem, 1000);
            updateGame();
        }
    }

    function stopGame() {
        gameRunning = false;
        clearInterval(spawnInterval);
    }

    function exitGame() {
        stopGame();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillText('¡Gracias por jugar!', 120, 200);
    }
    // Manejo de eventos de teclado
    document.addEventListener('keydown', function(e) {
        if (gameRunning) {
            if (e.key === 'ArrowLeft' && shipX > 0) {
                shipX -= 10; // Mover a la izquierda
            }
            if (e.key === 'ArrowRight' && shipX < canvas.width - shipWidth) {
                shipX += 10; // Mover a la derecha
            }
        }
    });
    // Funciones del mini juego de estrellas
    function iniciarJuego() {
        if (juegoActivo) return;
        juegoActivo = true;
        puntuacion = 0;
        moverEstrella();
        estrella.style.display = "block";
    }

    function detenerJuego() {
        juegoActivo = false;
        estrella.style.display = "none";
    }

    function salirJuego() {
        detenerJuego();
        puntuacionTexto.textContent = "Puntos: 0";
        alert("Gracias por jugar");
    }

    function moverEstrella() {
        if (!juegoActivo) return;
        const x = Math.random() * (juegoArea.clientWidth - 30);
        const y = Math.random() * (juegoArea.clientHeight - 30);
        estrella.style.left = `${x}px`;
        estrella.style.top = `${y}px`;
        setTimeout(moverEstrella, 1000);
    }
    estrella.addEventListener("click", () => {
        if (!juegoActivo) return;
        puntuacion++;
        puntuacionTexto.textContent = "Puntos: " + puntuacion;
    });
    // Vinculación de eventos de botones
    document.getElementById('startCodeGame').addEventListener('click',
        startGame);
    document.getElementById('stopCodeGame').addEventListener('click',
        stopGame);
    document.getElementById('exitCodeGame').addEventListener('click',
        exitGame);
    document.getElementById('startStarGame').addEventListener('click',
        iniciarJuego);
    document.getElementById('stopStarGame').addEventListener('click',
        detenerJuego);
    document.getElementById('exitStarGame').addEventListener('click',
        salirJuego);
});
//cielo estrellado
const starfield = document.getElementById('starfield');
const starCtx = starfield.getContext('2d');
starfield.width = window.innerWidth;
starfield.height = window.innerHeight;
const stars = [];
const numStars = 100; // Número de estrellas
// Crear estrellas
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starfield.width,
        y: Math.random() * starfield.height,
        radius: Math.random() * 2 + 1, // Tamaño de las estrellas
        speed: Math.random() * 0.5 + 0.1 // Velocidad de movimiento
    });
}
// Función para dibujar estrellas
function drawStars() {
    starCtx.clearRect(0, 0, starfield.width, starfield.height);
    stars.forEach(star => {
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fillStyle = 'white';
        starCtx.fill();
    });
}
// Función para actualizar la posición de las estrellas
function updateStars() {
    stars.forEach(star => {
        star.y += star.speed; // Mover la estrella hacia abajo
        if (star.y > starfield.height) {
            star.y = 0; // Reiniciar la estrella en la parte superior
            star.x = Math.random() * starfield.width; // Mover a una nueva posición
            horizontal
        }
    });
}
// Función principal para animar el fondo estrellado
function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate); // Llamar a la función de animación
}
// Iniciar la animación
animate();

let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate.
let speedY = 0; //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); //for movements
    // Set snake speed
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 ||
        snakeX > total_col * blockSize ||
        snakeY < 0 ||
        snakeY > total_row * blockSize) {

        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {

            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;

    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}