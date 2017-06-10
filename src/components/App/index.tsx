import * as React from "react";
import {Component} from "react";
import * as THREE from "three";

import Vars from "./Vars";

const init = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  const geometry = new THREE.BoxGeometry( 200, 200, 200 );
  const material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  Vars.mesh = mesh;
  Vars.renderer = renderer;
  Vars.scene = scene;
  Vars.camera = camera;
};

const animate = () => {
  requestAnimationFrame( animate );

  const {mesh, renderer, scene, camera} = Vars;

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render( scene, camera );
};

interface Prop {}
interface State {}

class App extends Component<Prop, State> {

  componentDidMount() {
    init();
    animate();

    const gui = new dat.GUI();

    gui.add(Vars.camera.position, "x", -500, 500);
    gui.add(Vars.camera.position, "y", -500, 500);
    gui.add(Vars.camera.position, "z", 0, 1000);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
