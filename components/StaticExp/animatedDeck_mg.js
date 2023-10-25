import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import './AnimatedDeckElysium.css';

// Additional JavaScript logic
export function getMorphTargets(model) {
    if (model.morphTargetInfluences) {
        return model.morphTargetInfluences;
    }

    let result = null;
    model.children.forEach((child) => {
        if (!result) {
            result = getMorphTargets(child);
        }
    });

    return result;
}
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

export default function AnimatedDeckElysium() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dynamicBackground, setDynamicBackground] = useState('defaultBackground');
  const threeDObjectRef = useRef(null);
  const slides = [
    `<div class='slide'><p>ELYSIUM INNOVATIONS
</p><p>Unlocking the full potential of AI through orchestration
</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>Go-To-Market Strategy</p><p>9</p><p>Milestones</p><p>10</p><p>Use of Funds</p><p>11</p><p>Financial Projections</p><p>12</p><p>Appendices</p><p>13</p><p>Problem</p><p>1</p><p>Solution</p><p>2</p><p>Why Now?</p><p>3</p><p>How it Works</p><p>4</p><p>Business Model</p><p>5</p><p>Competitive Landscape</p><p>6</p><p>Market Size</p><p>7</p><p>Management Team</p><p>8</p></div>`,`<div class='slide'><p>AI SYSTEMS OPERATE IN SILOS 
</p><p>LACK OF COLLABORATIVE SYNERGY 
</p><p>Isolated AI systems excel in specialized tasks but struggle with complex, multi-dimensional solutions.
</p><p>The traditional AI ecosystem lacks the ability to orchestrate multiple AI agents for collaborative problem-solving.
</p><p>LIMITATIONS OF ISOLATED AI SYSTEMS
</p><p>PROBLEM</p></div>`,`<div class='slide'><p>DECENTRALIZED PLATFORM
</p><p>Elysium OS provides a decentralized platform for managing AI agents, ensuring security and transparency.</p><p>BRIDGING THE GAP BETWEEN AI CAPABILITIES AND USER NEEDS
</p><p>MARKETPLACE
</p><p>Elysium empowers users by providing a tailor-made platform for managing AI agents according to their needs.</p><p>EMPOWERING USERS

</p><p>Automation Station offers a marketplace for users to access and utilize AI capabilities.</p><p>SOLUTION</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>Increasing Demand for AI Integration and Collaboration</p><p>Rapid growth in AI adoption across industries, with the global AI market projected to reach $190.61 billion by 2025 (MarketsandMarkets)
Growing need for AI orchestration to solve complex problems and enhance efficiency in organizations</p><p>Emerging Market for Decentralized AI Platforms</p><p>Rapid growth in AI adoption across industries, with the global AI market projected to reach $190.61 billion by 2025 (MarketsandMarkets)
Growing need for AI orchestration to solve complex problems and enhance efficiency in organizations</p><p>Growth Drivers and Market Opportunities for Elysium Innovations
</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>How It Works</p><p>Users adopt Elysium OS to access a decentralized platform, gaining enhanced control and management of AI agents. The built-in security features ensure data integrity while exploring AI capabilities.</p><p>Step 1</p><p>Decentralization with Elysium OS
</p><p>Users engage with Automation Station, a marketplace designed for discovering, customizing, and monetizing AI solutions. They can connect with a community of developers and users, fostering innovation and user-centric AI development.</p><p>Step 2</p><p>Engagement with Automation Station

</p><p>Users harness the power of orchestrating multiple AI agents to seamlessly handle complex tasks. They experience a tailor-made AI ecosystem, where the collective capabilities of AI agents are channeled to meet user needs and solve real-world problems.</p><p>Step 3</p><p>Holistic AI Management


</p></div>`,`<div class='slide'><p>Business Model</p><p>Allow brands to utilize Elysium's technology to build their dashboards and AI management platforms, generating licensing fees.</p><p>Licensing Fees
</p><p>Licensing
</p><p>Deliver tailored AI solutions, particularly in healthcare Revenue Cycle Management (RCM), charging for customization, implementation, and ongoing support.</p><p>Customization, Implementation, and Support Fees

</p><p>Enterprise Automation</p><p>Offer a consumer version with the ability to manage six agents at once for a monthly fee of $9.99.</p><p>$9.99 / mo</p><p>FREEMUM Subscription Model</p></div>`,`<div class='slide'><p>Elysium Innovations: Revolutionizing AI with Decentralized Orchestration and Unique Features
</p><p>Traditional AI Platforms</p><p>- Lack decentralized orchestration, limiting flexibility and tailored AI management.
- Often lack transparency and accountability.
- Pros: Established market presence.</p><p>Competing AI Agent Marketplaces</p><p>- Does not exist… yet!
- This does not include the plugin store which is not actually the action layer </p><p>Traditional AI Platforms</p><p>Competing AI Marketplaces</p><p>COMPETITIVE LANDSCAPE</p><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>Elysium Innovations, leveraging the booming blockchain market projected at 87.7% CAGR through 2030, aims to unify AI experiences with strategic orchestration, targeting substantial market capture.</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p></p><p>Market Size</p><p>The total available market for AI platforms and marketplaces in 2025 is projected to reach $12.3 billion. This figure includes the value of AI platforms, marketplaces, and related services. (Source: MarketsandMarkets)</p><p>The serviceable available market for AI platforms and marketplaces in 2025 is projected to be around $8.7 billion. This figure considers only the value of AI platforms and marketplaces, excluding related services. (Source: Grand View Research)</p><p>With its unique decentralized platform and marketplace, Elysium Innovations aims to capture a significant market share of 35% in the AI platforms and marketplaces industry by 2025. This is based on the company's innovative approach, which addresses the limitations of isolated AI systems and empowers users to manage AI agents securely and transparently.</p><p>TAM</p><p>SAM</p><p>SOM</p><p>$12.3 B
</p><p>$8.7 B

</p><p>35%


</p></div>`,`<div class='slide'><p>Founding Team</p><p>
Doug Schaer, a seasoned entrepreneur and sports agent, specializes in franchise asset development and sports foundation building. With a J.D. from USC Gould School of Law and MLBPA certification, he's a respected figure in Baseball Salary Arbitration.</p><p>Doug Schaer</p><p>CBO</p><p>Michael Gruen is a dynamic and accomplished Gen Z entrepreneur, investor, and media personality who has significantly impacted various industries in his young career. His drive, creativity, and innovative vision have made him a rising star in entrepreneurship and investment. Gruen co-founded Frax, the world's first fractional stablecoin and cryptocurrency consumer price index, and has driven the success of numerous ventures such as Sway House, TalentX Entertainment, and Ani Energy. </p><p>Michael Gruen</p><p>CEO</p><p>Michael "Merk" Daigler is a rising star in Computer Science, boasting real-world experience from internships at Gatsby Labs and Worksense Analytics. A pioneer at Genie.xyz, he's not just a developer but also a blockchain influencer. Specializing in Ethereum, Merk frequently shares crypto insights via his Twitter handle, @0xmerkle.</p><p>Merk</p><p>CTO/VP of Engineering</p></div>`,`<div class='slide'><p>Go-To-Market Strategy</p><p>Host Hackathons</p><p>Forums & Online Communities</p><p>Educational Content</p><p>Engage with the developer community through hackathons and coding challenges to stimulate innovation and build a strong user base.</p><p>Establish forums and online communities to foster interaction, support, and feedback among users and developers.</p><p>Provide tutorials, webinars, and documentation to ease the learning curve and encourage the adoption of the platform.</p></div>`,`<div class='slide'><p>23</p><p>Milestones</p><p>Q2</p><p>Platform Development: Build and launch the Elysium OS platform</p><p>Marketplace Development: Create and launch the Automation Station marketplace</p><p>23</p><p>Q3</p><p>Revenue Generation: Implement monetization strategies to generate revenue from platform usage and marketplace transactions</p><p>24</p><p>Q2</p><p>User Adoption: Onboard and engage users to utilize the Elysium OS platform and Automation Station marketplace</p><p>24</p><p>Q1</p><p>Agent Integration: Integrate multiple AI agents into the Elysium OS platform</p><p>23</p><p>Q4</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>The AI orchestration market, ensuring cohesive management of AI tools and operations, is projected to reach $17.1 billion by 2028, growing at a 20.0% CAGR, facilitating streamlined, integrated AI applications within organizations.</p><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>Elysium Innovations debuts "Butler," an AI agent designed to simplify user navigation across AI platforms like ChatGPT, which garners 1.4B monthly visits. Butler focuses on elevating user experience in high-adoption industries like Marketing (37%) and Tech (35%).

</p><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>
</p><p>Elysium Innovations debuts "Butler," an AI agent designed to simplify user navigation across AI platforms like ChatGPT, which garners 1.4B monthly visits. Butler focuses on elevating user experience in high-adoption industries like Marketing (37%) and Tech (35%).

</p><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/></div>`,`<div class='slide'><p>Use Of Funds</p><p>3,500,000  M Raise</p><p>Product Development  | 55%
Marketing and Sales | 20%
Operations | 15%
Miscellaneous | 10%</p><img src='image_here' alt='Slide Image'/><img src='image_here' alt='Slide Image'/><p>Rapid AI adoption is pushing the global market toward a $915B valuation by 2028. This growth fuels a rising demand for AI orchestration to tackle complex issues and boost organizational efficiency.</p></div>`,`<div class='slide'><p>
</p><img src='image_here' alt='Slide Image'/><p>See you on our cap table!

 Gotta blast.

AutomationStation.org
Elysiuminnovations.ai
Elysiuminnovations.ai/fundraising

</p></div>`,`<div class='slide'><p>Disclaimer</p><p></p><p>The material in this presentation has been prepared by ELYSIUM INNOVATIONS and is general background information about ELYSIUM INNOVATIONS’s activities current as of the date of this presentation. This information is given in the summary form and does not purport to be complete. Information in this presentation, including forecast financial information, should not be considered as advice or a recommendation to investors or potential investors. 

All securities and financial product or instrument transactions involve risks. This presentation may contain forward-looking statements including statements regarding our intent, belief, or current expectations with respect to ELYSIUM INNOVATIONS’s businesses and operations, market conditions, results of operation and financial condition, capital adequacy, specific provisions, and risk management practices. ELYSIUM INNOVATIONS does not undertake any obligation to publicly release the result of any revisions to these forward-looking statements. 

While due care has been used in the preparation of forecast information, actual results may vary in a materially positive or negative manner. Forecasts and hypothetical examples are subject to uncertainty and contingencies outside ELYSIUM INNOVATIONS’s control.</p></div>`
  ];
  const audio = new Audio('/path/to/well_known_background_music.mp3');
  const backgrounds = [
    'backgroundSlide0',
    'backgroundSlide1',
    // Add more backgrounds here
  ];

  useEffect(() => {
    // Initialize background music
    audio.loop = true;
    audio.play();

    // Dynamic background change based on the current slide
    setDynamicBackground(backgrounds[currentSlide]);

    // Initialize your component logic here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeDObjectRef.current.appendChild(renderer.domElement);

    // Load Iron Man 3D model (this is a placeholder; actual path should be specified)
    const loader = new THREE.OBJLoader();
    let mesh;
    loader.load('/path/to/IronMan.obj', (object) => {
      mesh = object;
      scene.add(object);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Iron Man model dynamically based on current slide
      if (mesh) {
        mesh.rotation.x += 0.01 * (currentSlide + 1);
        mesh.rotation.y += 0.01 * (currentSlide + 1);
      }

      renderer.render(scene, camera);
    };
    animate();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1));
    new Audio('/path/to/well_known_transition_sound.mp3').play();
  };
  const prevSlide = () => {
    setCurrentSlide(Math.max(currentSlide - 1, 0));
    new Audio('/path/to/well_known_transition_sound.mp3').play();
  };
  const zoomIn = () => {
    setZoomLevel(zoomLevel * 1.1);
    new Audio('/path/to/well_known_zoom_sound.mp3').play();
  };
  const zoomOut = () => {
    setZoomLevel(zoomLevel / 1.1);
    new Audio('/path/to/well_known_zoom_sound.mp3').play();
  };

  return (
    <div className={dynamicBackground}>
      {/* Slide Content */}
      <div dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
      
      {/* 3D Object Interaction */}
      <div ref={threeDObjectRef} className="threeD-object" />
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>

      {/* Slide Navigation */}
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
}
