/* global THREE */

const MAX_X_ROTATION = -80;

export default class ModelPresenter {
  constructor(targetEl, width, height) {
    this.targetEl = targetEl;
    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 50);

    this.position = {
      x: 0,
      y: 0
    };

    this.init();
    this.initLight();
    this.initPlane();
    this.loadModel();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.targetEl.appendChild(this.renderer.domElement);
  }

  initLight() {
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(50, 100, 1000);
    this.light.castShadow = true;
    this.scene.add(this.light);
  }

  initPlane() {
    this.tmpGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    this.tmpGeometry.position = new THREE.Vector3(0, 0, 0);
    this.tmpMesh = new THREE.Mesh(this.tmpGeometry);
  }

  initAxes() {
    const axes = new THREE.AxisHelper(60);
    axes.position.set(0, 0, 0);
    this.scene.add(axes);
  }

  loadModel() {
    this.loader = new THREE.ColladaLoader();
    this.loader.load('/models/starwars-tie-fighter.dae', (collada) => {
      this.model = collada.scene;

      // this.setSceneVisibility(false);

      this.scene.add(this.model);
    });
  }

  mapCoords(x = 0, y = 0) {
    const posX = ((x / this.width) * 2) - 1;
    const posY = (-(y / this.height) * 2) + 1;

    const ray = new THREE.Raycaster();
    ray.setFromCamera({ x: posX, y: posY }, this.camera);

    const intersects = ray.intersectObject(this.tmpMesh);

    return {
      x: intersects[0].point.x,
      y: intersects[0].point.y,
    };
  }

  updateModelPos(x, y) {
    const hasPosition = (x && y);
    const { x: posX, y: posY } = (hasPosition) ? this.mapCoords(x, y) : this.position;

    if (this.model) {
      this.model.position.x = posX;
      this.model.position.y = posY;

      this.position.x = posX;
      this.position.y = posY;

      // this.setSceneVisibility(hasPosition);
    }
  }

  updateModelRotation(boundWidth, boundHeight) {
    const rotationX = Math.round((boundHeight / boundWidth) * MAX_X_ROTATION) - 30;

    if (this.model && rotationX > MAX_X_ROTATION && boundHeight < boundWidth) {
      this.model.rotation.x = rotationX;
    }
  }

  setSceneVisibility(isVisible) {
    this.renderer.domElement.style.visibility = (isVisible) ? 'visible' : 'hidden';
  }

  render = () => {
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  }
}
