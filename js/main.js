import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from './RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Cargar textura HDR de escenario
new RGBELoader()
    .load("../hdr/autoshop_01_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
        console.log("carga de textura HDR");
    });

let skyboxy;
document.getElementById('skyboxSelector').addEventListener('change', function (event) {
    if (skyboxy) {
        scene.remove(skyboxy);
    }
    const skybox = event.target.value;
    new RGBELoader()
        .load(skybox, function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
            skyboxy = texture;
            console.log("carga de textura HDR");
        });
}, false);

// Cargar la textura para las tapas del cilindro
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('../images/logo.jpg');

// Crear materiales para las tapas y el cuerpo
const capMaterial = new THREE.MeshBasicMaterial({ map: logoTexture });
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

// Crear un cilindro
const geometry = new THREE.CylinderGeometry(30, 30, 1, 128);
const cylinder = new THREE.Mesh(geometry, [bodyMaterial, capMaterial, capMaterial]);
cylinder.position.set(0, 0,0);
scene.add(cylinder);


// Descripciones de los modelos
const carDescriptions = [
    "Último de la era de los Porsche 911 refrigerados por aire, conocido por su manejo clásico y diseño icónico.",
    "Un lujoso convertible roadster que combina potencia con elegancia, destacado por su motor V8 biturbo.",
    "Considerado uno de los superdeportivos más radicales, el F40 es un icono de pura velocidad y diseño aerodinámico.",
    "Vehículo pequeño y ligero que ofrece una experiencia de conducción emocionante y directa en pistas de carreras cortas.",
    "Vehículo utilitario diseñado para el transporte de oficiales de policía y, ocasionalmente, detenidos, equipado para respuestas rápidas",
    "Concepto de vehículo futurista que combina tecnología avanzada con un diseño aerodinámico y futurista."
];

// Cargador para el modelo 3D
const gltfLoader = new GLTFLoader();
gltfLoader.load('../glb/porsche_993.glb', gltf => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 2, 0);
    gltf.scene.scale.set(10, 10, 10);
    
}, undefined, error => {
    console.error('An error happened while loading the model:', error);
});


// Configurar luces
function setupLights() {
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(-5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.6);
    light2.position.set(5, 5, 5);
    scene.add(light2);
}
setupLights();

// Configurar la cámara
camera.position.set(20, 20, 50);
camera.lookAt(scene.position);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Manejar el cambio de tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
});

let paused = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'i') {
        // Code to be executed when the 'i' key is pressed
        // Add your logic here
        const lights = scene.children.filter(child => child instanceof THREE.DirectionalLight);
        lights.forEach(light => {
            light.visible = !light.visible; // Toggle the visibility of each light
        });
    }
    if (event.key === 'u') {
        paused = !paused;
    }
});

let mixer, modelName;
document.getElementById('modelSelector').addEventListener('change', function (event) {
    modelName = event.target.value;
    const modelIndex = event.target.selectedIndex; // Obtiene el índice del modelo seleccionado
    const descriptionText = carDescriptions[modelIndex]; // Accede a la descripción basada en el índice

    // Actualizar la descripción en la página
    const descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = descriptionText; // Establece la descripción del modelo seleccionado

    
    gltfLoader.load(modelName, gltf => {
        scene.remove(scene.children[scene.children.length - 1]);
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(10, 10, 10);

        mixer = new THREE.AnimationMixer(gltf.scene);
        if (gltf.animations.length > 0) {
            mixer.clipAction(gltf.animations[0]).play();
        }

        if (modelName == "../glb/porsche_993.glb") {
            gltf.scene.position.set(0, 2, 0);
        }

        if (modelName == "../glb/concept_004.glb") {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const action = mixer.clipAction(gltf.animations.find(anim => anim.name === "FrontDoorBumperAction"));
            action.play();
        }

        if (modelName == "../glb/go_kart.glb"){
            gltf.scene.scale.set(0.2, 0.2, 0.2);
        }

        if (modelName = "../glb/police_car.glb") {
            mixer = new THREE.AnimationMixer(gltf.scene);
            const action = mixer.clipAction(gltf.animations.find(anim => anim.name === "Siren_flash"));
            action.play();
        }

    }, undefined, error => {
        console.error('An error happened while loading the model:', error);
    });
}, false);

// Función de animación
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); // obtener el delta de tiempo

    scene.rotation.y += 0.005;

    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}

animate();

/*
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cargador para el modelo 3D
const loader = new GLTFLoader();
loader.load('truck.glb', function (gltf) {
    scene.add(gltf.scene);

    // Mostrar las animaciones en la consola
    console.log('Available animations:', gltf.animations);

    // Si deseas reproducir alguna animación
    if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play(); // Reproducir la primera animación
    }

    animate(); // Llamar a la función de animación si hay animaciones
}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
*/