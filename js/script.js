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


// Función para obtener la fecha y la hora actual basada en la zona horaria del navegador
function obtenerFechaHora() {
    const ahora = new Date();

    // Obtiene el nombre del mes
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
