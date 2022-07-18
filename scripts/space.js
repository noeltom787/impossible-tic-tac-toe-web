import * as THREE from "three";
import marsmap from "../assets/textures/marsmap1k.jpg";
export function plsphereReset() {
    plsphere.position.z = -100;
}
export function updatePlcrash(a) {
    plcrash = a;
}
let plcrash = 0;

const scene = new THREE.Scene();
let stars = [];
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;	

const renderer = new THREE.WebGLRenderer({
  powerPreference : "high-performance",}
);
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);
document.body.appendChild(renderer.domElement);
//renderer.render(scene, camera);

var geometry  = new THREE.SphereBufferGeometry(0.5, 32, 32)
for ( var z= -1000; z < 2000; z+=20 ) {
		
  // Make a sphere
  var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  var sphere = new THREE.Mesh(geometry, material)

  sphere.position.x = Math.random() * 1000 - 500;
  sphere.position.y = Math.random() * 1000 - 500;
  sphere.position.z = z;

  // scale it up a bit
  sphere.scale.x = sphere.scale.y = 2;

  scene.add( sphere );

  stars.push(sphere); 
}
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set(50, 50, 50);
light.castShadow = true;
scene.add( light );

// function planetCrash() {
  let plgeometry  = new THREE.SphereGeometry(1,32,32)
  let plmaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(marsmap)
  } );
  let plsphere = new THREE.Mesh(plgeometry, plmaterial);
scene.add(plsphere);
plsphere.position.z = -100;
//loseanime();
//function loseanime() {
  //renderer.render(scene, camera);
  // for (let i = 0; ; i++) {
  //   console.log(plsphere.position.z);
  //   plsphere.position.z += .01;
  //   if (plsphere.position.z > 2.5)break;
  //   //requestAnimationFrame( loseanime );
  // }
//}
//loseanime();
// }


function animateStars() { 
				
  // loop through each star
  for (var i = 0; i < stars.length; i++) {
    
    let star = stars[i];
    star.position.z += i / 10;
      
    // if the particle is too close move it to the back
    if (star.position.z > 1000) star.position.z -= 2000;
    
  }
  if (plcrash == 1) {
    plsphere.position.z += .5;
  }
  if (plsphere.position.z > 0) {
    plcrash = 0;
    plsphere.position.z = 2;
  }

}

function animate() {
  renderer.render( scene, camera );
  animateStars();
  requestAnimationFrame( animate );

}
animate();