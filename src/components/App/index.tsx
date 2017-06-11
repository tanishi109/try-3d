import * as React from "react";
import {Component} from "react";
import {RouteComponentProps} from "react-router";
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

  const {renderer, scene, camera} = Vars;

  renderer.render( scene, camera );
};

interface Prop extends RouteComponentProps<{}> {}
interface State {}

class App extends Component<Prop, State> {

  componentDidMount() {
    init();
    animate();

    const gui = new dat.GUI();
    const camera = gui.addFolder("camera");

    camera.add(Vars.camera.position, "x", -500, 500);
    camera.add(Vars.camera.position, "y", -500, 500);
    camera.add(Vars.camera.position, "z", 0, 1000);
    camera.open();

    const rotation = gui.addFolder("rotation");

    rotation.add(Vars.camera.rotation, "x", -2, 2, 0.01);
    rotation.add(Vars.camera.rotation, "y", -2, 2, 0.01);
    rotation.add(Vars.camera.rotation, "z", -2, 2, 0.01);
    rotation.open();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App;
