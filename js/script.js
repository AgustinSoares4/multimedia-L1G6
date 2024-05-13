class Cabecera extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `        <nav class="navbar navbar-expand-lg bg-body-tertiary nav-propio" id="top">
            <div class="container-fluid">
                <div>
                    <img src="../images/logo.png" alt="Logo" width="50" height="50">
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="../index.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./blog.html">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./events.html">Events</a>
                        </li>
                        <li>
                            <a class="nav-link" href="./roadGame.html">Road Game</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./visualizer.html">Visualizer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./globalData.html">Data</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./login.html">Log in</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./signin.html">Sign in</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
    }
}
window.customElements.define('mi-nav', Cabecera);



// Circulo del cursor
const circle = document.getElementById('circle');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX + window.pageXOffset;
    const mouseY = e.clientY + window.pageYOffset;

    circle.style.left = (mouseX-15) + 'px';
    circle.style.top = (mouseY-15) + 'px';
});


// FECHA Y HORA
// Función para obtener la fecha y la hora actual basada en la zona horaria del navegador
function obtenerFechaHora() {
    const ahora = new Date();

    // Obtiene el nombre del mes
    const meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes = meses[ahora.getMonth()];

    // Obtiene el día y el año
    const dia = ahora.getDate();
    const año = ahora.getFullYear();

    // Obtiene la hora y los minutos
    let hora = ahora.getHours();
    let minutos = ahora.getMinutes();

    // Agrega un cero delante si los minutos son menores que 10
    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    // Calcula el desplazamiento de la zona horaria en horas
    // const desplazamientoHorario = ahora.getTimezoneOffset() / 60;

    // Determina el signo del desplazamiento horario para construir correctamente la cadena de zona horaria
    // const signoDesplazamiento = desplazamientoHorario >= 0 ? '+' : '-';
    //  const desplazamientoHorarioAbs = Math.abs(desplazamientoHorario);

    // Construye la cadena de fecha y hora
    const fechaHoraString = mes + " " + dia + ", " + año + " | " + hora + ":" + minutos + " hrs UTC +1";

    // Devuelve la cadena de fecha y hora formateada
    return fechaHoraString;
}

// Función para actualizar la fecha y hora en el navbar cada segundo
function actualizarFechaHora() {
    const datetimeDiv = document.getElementById('datetime');
    if (datetimeDiv) {
        datetimeDiv.textContent = obtenerFechaHora();
    }
}

// Actualiza la fecha y hora al cargar la página
actualizarFechaHora();

// Actualiza la fecha y hora cada segundo
setInterval(actualizarFechaHora, 1000);


// VIDEO PLAYER
// Funciones para el reproductor de video
function togglePlayPause(videoId) {
    if (videoId.paused) {
        playVideo(videoId);
    } else {
        pauseVideo(videoId);
    }
}

// Reproduce el video
function playVideo(videoId) {
    videoId.play();
    videoId.style.border = "5px solid rgb(79, 126, 213)";
}

// Pausa el video
function pauseVideo(videoId) {
    videoId.pause();
    videoId.style.border = "5px solid rgb(121, 140, 121)";
}

// Detiene el video y lo reinicia
function stopVideo(videoId) {
    videoId.pause();
    videoId.currentTime = 0;
}

// Avanza 10 segundos
function forwardVideo(videoId) {
    videoId.currentTime = videoId.currentTime + 10;
}

// Va al final del video
function skipVideo(videoId) {
    videoId.currentTime = videoId.duration;
}

// Pantalla completa
function fullScreenVideo(videoId) {
    videoId.requestFullscreen();
}

// Maximiza el video
function maximizeVideo(videoId) {
    videoId.requestFullscreen();
}

var slidervolume = 50;

// Mutea el video
function muteVideo(videoId, sliderId) {
    var slider = document.getElementById("volumeSlider");

    if (videoId.muted == true) {
        videoId.muted = false;
        sliderId.value = slidervolume;
    }
    else if (videoId.muted == false) {
        slidervolume = sliderId.value;
        sliderId.value = 0;
        videoId.muted = true;
    }
}

// Cambia el volumen del video según el valor del slider
function changeVolume(videoId, sliderId) {
    videoId.volume = sliderId.value; // Establece el volumen del video según el valor del slider
    slidervolume = sliderId.value;
}

// Actualiza la barra de progreso del video
function updateProgress(vid1, progress1){
    var time = vid1.currentTime * (100 / vid1.duration);
    progress1.value = time;
}

// Actualiza la duración del video
function displayDuration(vidID, lengthID) {
    var duration = vidID.duration;
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    lengthID.textContent = "Length of the video: " + minutes + " minutes " + seconds + " seconds";
}

// Actualiza el tiempo actual del video
function updateTime(vidID, actualtimeID){
    var time = vidID.currentTime;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    actualtimeID.textContent = "Current time of the video: " + minutes + " minutes " + seconds + " seconds";
}


// AUDIO PLAYER
// Funciones para el reproductor de audio
var url1 = "https://pixabay.com/es/music/late-fun-life-112188/";
var url2 = "https://pixabay.com/es/music/melodias-para-ninos-felices-happiness-129206/";
var url3 = "https://pixabay.com/es/music/late-best-time-112194/";
var url4 = "https://pixabay.com/es/music/afrobeat-energetic-music-dance-background-hip-hop-latin-reggaeton-150280/";
var url5 = "https://pixabay.com/es/music/optimista-catch-it-117676/";

var audioElegido = 1;
// Carga el audio correspondiente
function loadAudio(audioID, audio) {
    if (audioID == "audio1") { 
        audio.src = "../audio/fun.mp3";
        audioElegido = 1;
    }
    else if (audioID == "audio2") {
        audio.src = "../audio/happy.mp3";
        audioElegido = 2;
    }
    else if (audioID == "audio3") {
        audio.src = "../audio/rap.mp3";
        audioElegido = 3;
    }
    else if (audioID == "audio4") {
        audio.src = "../audio/reggaeton.mp3";
        audioElegido = 4;
    }
    else if (audioID == "audio5") {
        audio.src = "../audio/jazzmodern.mp3";
        audioElegido = 5;
    }
}

// Calcula duración total del audio
function audioDuration(audio, length) {
    if (audioElegido == 1) { length.textContent = "Length of the audio: 1 minute and 49 seconds"; }
    else if (audioElegido == 2) { length.textContent = "Length of the audio: 2 minute and 00 seconds"; }
    else if (audioElegido == 3) { length.textContent = "Length of the audio: 2 minute and 08 seconds"; }
    else if (audioElegido == 4) { length.textContent = "Length of the audio: 2 minute and 10 seconds"; }
    else if (audioElegido == 5) { length.textContent = "Length of the audio: 1 minute and 28 seconds"; }
    console.log(audioElegido);
    console.log(length.textContent);
}

// Calcula el tiempo restante del audio
function timeRemaining(audio, timeRemaining) {
    var duration = audio.duration;
    var currentTime = audio.currentTime;
    var time = duration - currentTime;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    timeRemaining.textContent = "Time remaining: " + minutes + " minutes " + seconds + " seconds";
    console.log(currentTime);
}

// Indica el url del audio
function urlAudio(audio, url) {
    if      (audioElegido == 1) { url.textContent = "Audio source: https://pixabay.com/es/music/late-fun-life-112188/";  }
    else if (audioElegido == 2) { url.textContent = "Audio source: https://pixabay.com/es/music/melodias-para-ninos-felices-happiness-129206/"; }
    else if (audioElegido == 3) { url.textContent = "Audio source: https://pixabay.com/es/music/late-best-time-112194/";    }
    else if (audioElegido == 4) { url.textContent = "Audio source: https://pixabay.com/es/music/afrobeat-energetic-music-dance-background-hip-hop-latin-reggaeton-150280/";    }
    else if (audioElegido == 5) { url.textContent = "Audio source: https://pixabay.com/es/music/optimista-catch-it-117676/";    }
}


function updateStatePause(audio, state) {
    state.textContent = "State of the audio: paused";
}
function updateStatePlay(audio, state) {
    state.textContent = "State of the audio: playing";
}

// Music 
function playRadioMusic() {
    var radioMusic = document.getElementById('radioMusic');
    //radioMusic.play();
}


// Mini Road Game
document.getElementById('gameSettings').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene los valores seleccionados por el usuario del formulario
    var selectedCarColor = document.getElementById('carColor').value;
    var gameTimeForVictory = parseInt(document.getElementById('gameTime').value); // Convierte el valor a entero
    var obstacleSpawnRate = parseInt(document.getElementById('spawnSpeed').value); // Convierte el valor a entero

    console.log(selectedCarColor);
    console.log(gameTimeForVictory);
    console.log(obstacleSpawnRate);

    game(selectedCarColor, gameTimeForVictory, obstacleSpawnRate); // Inicia el juego con los valores seleccionados
});

function game(selectedCarColor, gameTimeForVictory, obstacleSpawnRate) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 500; // Asegúrate de establecer un ancho adecuado para tu canvas
    canvas.height = 600; // Asegúrate de establecer una altura adecuada para tu canvas

    const roadWidth = 500;
    const laneWidth = roadWidth / 4; // Ancho de cada carril en la carretera

    let gameInterval;
    let animationFrameId;

    let lineOffset = 0; // Desplazamiento inicial de las líneas discontinuas

    let carPosition = { x: canvas.width / 2 - 15, y: canvas.height * 0.75 };

    let carColors = ['black', 'blue', 'cyan', 'green', 'grey', 'orange', 'red', 'yellow'];
    let obstacles = [];

    let isGameOver = false; // Nuevo estado del juego

    setTimeout(() => {
        isGameOver = true;
        gameWon();
    }, gameTimeForVictory * 1000); // Establece el tiempo de juego en segundos

    function gameWon() {
        if (isGameOver) {
            ctx.font = "30px Arial";
            ctx.fillStyle = "green";
            ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2 - 60);
            ctx.fillText("You WIN!", canvas.width / 2 - 75, canvas.height / 2 - 20);
            ctx.fillStyle = "black";
            ctx.fillText("Restart", canvas.width / 2 - 55, canvas.height / 2 + 25);
        }
    }

    function draw() {
        if (isGameOver) return; // Detiene la ejecución si el juego ha terminado

        preloadCarImages(); // Carga las imágenes del coche antes de dibujarlas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRoad();         // Dibuja la carretera en el canvas
        drawCar();          // Dibuja el coche en el canvas
        drawObstacles();    // Dibuja los obstáculos en el canvas
        moveChaser();       // Actualiza la posición del perseguidor
        drawChaser();       // Dibuja el perseguidor en el canvas
        checkCollision();   // Verifica colisiones en cada frame

        // Movimiento de la carretera
        lineOffset += 1;    // Ajusta este valor para controlar la velocidad de la animación
        if (lineOffset >= 20) { // El doble del tamaño de la línea y el espacio
            lineOffset = 0;
        }

        // Verifica si el jugador ha ganado
        if (!isGameOver) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    let carImages = {};

    function preloadCarImages(callback) {
        let loadedImagesCount = 0;
        const carColors = ['black', 'blue', 'cyan', 'green', 'grey', 'orange', 'red', 'yellow'];
        const totalImages = carColors.length;

        carColors.forEach(color => {
            const carImage = new Image();
            carImage.src = `../images/cars/${color}Car.png`;
            carImage.onload = () => {
                loadedImagesCount++;
                carImages[color] = carImage;
                if (loadedImagesCount === totalImages) {
                    if (typeof callback === "function") {
                        callback(); // Llama al callback solo si es una función
                    }
                }
            };
            carImage.onerror = () => {
                console.error(`Error al cargar la imagen del coche: ${color}`);
            };
        });
    }

    function drawRoad() {
        // Draw road background
        ctx.fillStyle = '#808080';
        ctx.fillRect((canvas.width - roadWidth) / 2, 0, roadWidth, canvas.height);

        // Draw dotted line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -lineOffset; // Negativo para mover hacia abajo
        ctx.beginPath();
        ctx.moveTo(laneWidth, 0);
        ctx.lineTo(laneWidth, canvas.height);
        ctx.stroke();

        // Draw dotted line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(laneWidth * 2, 0);
        ctx.lineTo(laneWidth * 2, canvas.height);
        ctx.stroke();

        // Draw dotted line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -lineOffset; // Negativo para mover hacia abajo
        ctx.beginPath();
        ctx.moveTo(laneWidth * 3, 0);
        ctx.lineTo(laneWidth * 3, canvas.height);
        ctx.stroke();
    }

    function drawCar() {
        // Asume que `selectedCarColor` es una de las claves válidas en `carImages`
        if (carImages[selectedCarColor]) {
            ctx.drawImage(carImages[selectedCarColor], carPosition.x, carPosition.y, 30, 70);
        }
    }

    function moveCar() {
        window.addEventListener('keydown', function (event) {
            const moveStep = 30;
            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    carPosition.y = Math.max(carPosition.y - moveStep, 0);
                    break;
                    carPosition.y = Math.max(carPosition.y - moveStep, 0);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    carPosition.y = Math.min(carPosition.y + moveStep, canvas.height - 70);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    carPosition.x = Math.min(carPosition.x + moveStep, canvas.width - 30);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    carPosition.x = Math.max(carPosition.x - moveStep, 0);
                    break;
            }
        });
    }

    function addObstacle() {
        console.log("addObstacle");
        obstacles = []; // Reinicia la lista de obstáculos

        for (let i = 1; i <= 4; i++) {
            let obstacleX = (canvas.width - roadWidth) / 2 + laneWidth * (i - 0.5) - 15;
            let obstacleY = i > 2 ? canvas.height : -70;
            let color = carColors[Math.floor(Math.random() * carColors.length)]; // Elige un color al azar de los disponibles
            obstacles.push({ x: obstacleX, y: obstacleY, direction: i > 2 ? 'up' : 'down', color: color });
        }
        console.log(obstacles);

        drawObstacles();
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => {
            ctx.save(); // Guardar el estado actual del contexto del canvas

            // Si el obstáculo se mueve hacia abajo, rotar la imagen
            if (obstacle.direction === 'down') {
                ctx.translate(obstacle.x + 15, obstacle.y + 35); // Mover el origen al centro del auto
                ctx.rotate(Math.PI); // Rotar 180 grados
                ctx.translate(-obstacle.x - 15, -obstacle.y - 35); // Volver a trasladar el origen a su posición original
            }

            if (carImages[obstacle.color].complete) {
                // Dibuja la imagen del auto para el obstáculo, ajustando las coordenadas si se rotó
                ctx.drawImage(carImages[obstacle.color], obstacle.x, obstacle.y, 30, 70);
            }

            ctx.restore(); // Restaurar el estado original del contexto del canvas

            // Actualiza la posición del obstáculo dependiendo de su dirección
            if (obstacle.direction === 'down') {
                obstacle.y += 5; // Mueve hacia abajo los obstáculos que van hacia abajo
            } else {
                obstacle.y -= 5; // Mueve hacia arriba los obstáculos que van hacia arriba
            }
        });

        // Elimina los obstáculos que han salido de la pantalla
        obstacles = obstacles.filter(obstacle => obstacle.direction === 'down' ? obstacle.y < canvas.height : obstacle.y > -70);
    }
    /*
    function drawObstacles() {
        obstacles.forEach(obstacle => {
            const colorIndex = carColors.indexOf(obstacle.color);
            
            // Asume que `obstacle.color` es una de las claves válidas en `carImages`
            if (carImages[colorIndex]) {
                ctx.save();  // Guarda el estado actual del contexto del canvas

                // Si el obstáculo se mueve hacia abajo, rotar la imagen
                if (obstacle.direction === 'down') {
                    ctx.translate(obstacle.x + 15, obstacle.y + 35);  // Mover el origen al centro del auto
                    ctx.rotate(Math.PI);  // Rotar 180 grados
                    ctx.translate(-obstacle.x - 15, -obstacle.y - 35);  // Volver a trasladar el origen a su posición original
                }

                // Dibuja la imagen del obstáculo en el canvas
                ctx.drawImage(carImages[colorIndex], obstacle.x, obstacle.y, 30, 70);  // Tamaño del coche

                ctx.restore();  // Restaura el estado original del contexto del canvas
            }
        });
    }*/

    function checkCollision() {
        // Verificar colisión con obstáculos regulares
        const collisionWithObstacle = obstacles.some(obstacle => {
            return carPosition.x < obstacle.x + 30 &&
                carPosition.x + 30 > obstacle.x &&
                carPosition.y < obstacle.y + 70 &&
                carPosition.y + 70 > obstacle.y;
        });

        // Verificar colisión con el perseguidor
        const collisionWithChaser = carPosition.x < chaser.x + 20 &&
            carPosition.x + 30 > chaser.x &&
            carPosition.y < chaser.y + 20 &&
            carPosition.y + 70 > chaser.y;

        if (collisionWithObstacle || collisionWithChaser) {
            // Insertar sonido de choque

            // Reproducir audio de choque de coche
            const audio = new Audio('../audio/CarCrash.mp3');
            audio.volume = 0.2; // Set the audio volume to 20%
            audio.play();
            handleGameOver();
        }
    }

    function handleGameOver() {
        window.cancelAnimationFrame(animationFrameId);
        clearInterval(gameInterval);
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2 - 60);

        ctx.fillText("You crashed. You lose.", canvas.width / 2 - 150, canvas.height / 2 - 20);

        // Mostrar texto de reinicio
        ctx.fillStyle = "black";
        ctx.fillText("Restart", canvas.width / 2 - 55, canvas.height / 2 + 25);
        isGameOver = true;
    }

    // Reinicia el juego al hacer clic en el texto "Reiniciar Juego"
    canvas.addEventListener('click', function (event) {
        if (isGameOver) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Como el texto está centrado, determinamos su área basándonos en un rango estimado alrededor del centro.
            // Asumimos un ancho aproximado del texto y ajustamos el rango vertical adecuadamente.
            const textWidth = 200; // Estimación del ancho del texto "Reiniciar Juego"
            const textHeight = 40; // Estimación conservadora de la altura del texto
            const textX = (canvas.width / 2) - 100 - textWidth / 2; // X inicial basado en el texto centrado
            const textY = (canvas.height / 2) + 25 - textHeight / 2; // Y inicial ajustado para centrar verticalmente el texto

            if (x >= textX && x <= textX + textWidth && y >= textY && y <= textY + textHeight) {
                restartGame(); // Reinicia el juego si se clickea sobre el texto
            }
        }
    });

    // Perseguidor
    let chaser = { x: 100, y: 0, speed: 0.5 }; // Posición inicial y velocidad del perseguidor

    function drawChaser() {
        const chaserImage = new Image();
        chaserImage.src = '../images/car-wheel.png';
        ctx.drawImage(chaserImage, chaser.x, chaser.y, 20, 20);
    }

    function moveChaser() {
        // Movimiento en X
        if (chaser.x < carPosition.x) {
            chaser.x += chaser.speed;
        } else if (chaser.x > carPosition.x) {
            chaser.x -= chaser.speed;
        }

        // Movimiento en Y
        if (chaser.y < carPosition.y) {
            chaser.y += chaser.speed;
        } else if (chaser.y > carPosition.y) {
            chaser.y -= chaser.speed;
        }
    }

    function restartGame() {
        // Reiniciar las variables del juego a sus valores iniciales
        carPosition = { x: canvas.width / 2 - 15, y: canvas.height * 0.75 };
        chaser = { x: 100, y: 0, speed: 0.5 }; // Reinicia la posición y velocidad del perseguidor
        obstacles = [];
        isGameOver = false;

        // Reiniciar el bucle del juego
        draw();
        //gameInterval = setInterval(addObstacle, 5000);
    }

    // Inicia el juego
    gameInterval = setInterval(addObstacle, obstacleSpawnRate * 1000); // Añade un obstáculo cada 5 segundos
    //gameInterval = setInterval(addObstacle, 5000);
    moveCar(); // Inicializa el movimiento del coche
    draw(); // Inicia el bucle del juego

}

function checkSpeedValue() {
    var speed = parseInt(document.getElementById('spawnSpeed').value);
    if (speed < 3) {
        document.getElementById('spawnSpeed').value = 3;
    }
    if (speed > 7) {
        document.getElementById('spawnSpeed').value = 7;
    }
}