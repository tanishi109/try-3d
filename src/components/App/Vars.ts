import {
  Mesh,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
} from "three";

class Vars {
  mesh: Mesh;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
}

export default new Vars();
