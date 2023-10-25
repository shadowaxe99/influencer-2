import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as HELPER from './helper.js';
let fullBody = true;
let canvasContainer = document.getElementById('hologram');
var hologram = document.getElementById('hologram');
let width = 200;
let height = 200;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true} );

// voice.connect(analyser);
renderer.setSize( window.innerWidth / 5, window.innerWidth / 5 );
hologram.appendChild( renderer.domElement );

renderer.outputColorSpace = THREE.SRGBColorSpace;
camera.position.z = 1;

const dirLight = new THREE.DirectionalLight( 0xefefff, 1 );
dirLight.position.set( 0, 2, 20 );
scene.add( dirLight );

let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .5 );
scene.add( hemiLight );


// Set up loader
const loader = new GLTFLoader();
let model;
let morphTargets;
loader.load(
  'models/spyro_head.glb', // replace this with the path to your model
  function (gltf) {
    console.log('loadigngggggg')
    console.log(gltf)
    model = gltf.scene
    console.log(model)
    scene.add(model)
    morphTargets = HELPER.getMorphTargets(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('An error happened', error);
  },
);

canvasContainer.addEventListener('click', (event) => {
  let path;
  scene.remove(model);
  if(fullBody){
    path = 'models/spyro_head.glb'
    camera.position.z = 1;
  }
  else{
    path = 'models/spyro.glb'
    camera.position.z = 1.5;
  }
  loader.load(
    path, 
    function (gltf) {
      model = gltf.scene
      scene.add(model)
      morphTargets = HELPER.getMorphTargets(model);
      fullBody = !fullBody;
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('An error happened', error);
    },
  );
});


let mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    const rect = hologram.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

window.addEventListener('resize', (event) => {
  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();

  // Update renderer's size
  renderer.setSize(window.innerWidth / 5, window.innerWidth / 5);
  console.log(canvasContainer.clientWidth, canvasContainer.clientHeight)
});
function animate() {
	requestAnimationFrame( animate );

	if (model) {
		const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
		model.lookAt(vector);
  }

	renderer.render( scene, camera );
}
animate();

window.isMuted = false;  // switched to window to have it be globally declared variable
document.getElementById('mute-btn').addEventListener('click', () => {
  isMuted = !isMuted;
  let muteIcon = document.getElementById('mute-icon');
  if (isMuted) {
      voice.pause();
      muteIcon.classList.remove('fa-volume-up');
      muteIcon.classList.add('fa-volume-mute');
  } else {
      voice.play();
      muteIcon.classList.remove('fa-volume-mute');
      muteIcon.classList.add('fa-volume-up');
  }
});

let pitch = document.getElementById('pitch')
pitch.addEventListener('slide.bs.carousel', event => {
let slide = parseInt(event.to) + 1;
console.log(slide)
if(slide == 1){
  document.getElementById("back").style.display = "none";
}
else{
  document.getElementById("back").style.display = "block";
}
let url = "/audio/slide_" + slide + ".mp3";
voice.src = url;
if (!isMuted) {
    voice.play();
}
})

let lastChange = Date.now();
let mouthOpen = false;

function animateBlendShape() {
  requestAnimationFrame(animateBlendShape);
  if (!voice.paused) {
    if (Date.now() - lastChange > 100) {
      mouthOpen = !mouthOpen;
      lastChange = Date.now();
    }

    morphTargets[0] = mouthOpen ? 1 : 0;
  } else {
    // Close mouth when voice is paused
    morphTargets[0] = 0;
  }

  renderer.render(scene, camera);
}

animateBlendShape();