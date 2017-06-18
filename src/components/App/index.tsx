import * as React from "react";
import {Component} from "react";
import {RouteComponentProps} from "react-router";
import * as THREE from "three";

import Vars from "./Vars";
import GamepadManager from "../GamepadPlayground/GamepadManager";

const init = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  const geometry = new THREE.BoxGeometry( 200, 200, 200 );
  const material = new THREE.MeshBasicMaterial( { color: 0x20C820, wireframe: true } );

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

const datGui = () => {
  const gui = new dat.GUI();
  const camera = gui.addFolder("camera.position");

  camera.add(Vars.camera.position, "x", -500, 500);
  camera.add(Vars.camera.position, "y", -500, 500);
  camera.add(Vars.camera.position, "z", 0, 1000);
  camera.open();

  const rotation = gui.addFolder("camera.rotation");

  rotation.add(Vars.camera.rotation, "x", -2, 2, 0.01);
  rotation.add(Vars.camera.rotation, "y", -2, 2, 0.01);
  rotation.add(Vars.camera.rotation, "z", -2, 2, 0.01);
  rotation.open();
};

interface Prop extends RouteComponentProps<{}> {}
interface State {
  vy: number;
  vx: number;
  animateLoop: () => void;
}

class App extends Component<Prop, State> {
  constructor() {
    super();

    this.state = {
      vy: 0,
      vx: 0,
      animateLoop: () => {
        const {renderer, scene, camera, mesh} = Vars;
        const {vx, vy} = this.state;

        mesh.rotation.x += vx;
        mesh.rotation.y += vy;

        renderer.render( scene, camera );
      },
    };
  }

  componentDidMount() {
    init();
    this.animate.bind(this)();
    datGui();

    new GamepadManager((gamepad: Gamepad) => { // tslint:disable-line no-unused-expression
      const axes = gamepad.axes[gamepad.axes.length - 1].toFixed(4);
      const vymap = {
        "0.7143": -0.02,
        "-0.4286": 0.02,
      };
      const vxmap = {
        "-1.0000": 0.02,
        "0.1429": -0.02,
      };

      if (vymap[axes] || vxmap[axes]) {
        this.setState({
          vy: vymap[axes] || 0,
          vx: vxmap[axes] || 0,
        });
      } else {
        this.setState({
          vy: 0,
          vx: 0,
        });
      }
    });
  }

  animate() {
    const {animateLoop} = this.state;

    animateLoop();
    requestAnimationFrame(this.animate.bind(this));
  }

  render(): JSX.Element {
    return (
      <div>
      </div>
    );
  }
}

export default App;
