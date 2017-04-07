/* global THREE */

const toRadians = angle => angle * (Math.PI / 180);

export default class ModelPresenter {
  constructor(targetEl, width, height) {
    this.targetEl = targetEl;
    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, 0, 50);

    this.position = {
      x: 0,
      y: 0
    };

    this.isRotating = false;

    this.prevMousePosition = {
      x: 0,
      y: 0
    };

    this.init();
    this.initPlane();
    this.initMouse();
    this.loadModel();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.targetEl.appendChild(this.renderer.domElement);
  }

  initPlane() {
    this.tmpGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    this.tmpGeometry.position = new THREE.Vector3(0, 0, 0);
    this.tmpMesh = new THREE.Mesh(this.tmpGeometry);
  }

  initMouse() {
    this.targetEl.addEventListener('mousedown', this.handleMouseDown);
    this.targetEl.addEventListener('mousemove', this.handleMouseMove);
    this.targetEl.addEventListener('mouseup', this.handleMouseUp);
  }

  loadModel() {
    this.loader = new THREE.ColladaLoader();
    this.loader.load('/models/starwars-tie-fighter.dae', (collada) => {
      this.model = collada.scene;

      this.setSceneVisibility(false);

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

      this.setSceneVisibility(hasPosition);
    }
  }

  setSceneVisibility(isVisible) {
    this.renderer.domElement.style.visibility = (isVisible) ? 'visible' : 'hidden';
  }

  handleMouseDown = () => {
    this.isRotating = true;
  };

  handleMouseMove = (e) => {
    const delta = {
      x: e.offsetX - this.prevMousePosition.x,
      y: e.offsetY - this.prevMousePosition.y,
    };

    if (this.isRotating) {
      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
            toRadians(delta.y * 1),
            toRadians(delta.x * 1),
            0,
            'XYZ'
          )
        );

      this.model.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.model.quaternion);
    }

    this.prevMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  };

  handleMouseUp = () => {
    this.isRotating = false;
  };

  startRender = () => {
    this.render();
    requestAnimationFrame(this.startRender);
  };

  render = () => {
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.render(this.scene, this.camera);
  }
}
