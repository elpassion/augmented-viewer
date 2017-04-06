/* global io */

import Viewer from './viewer';
import ModelPresenter from './model-presenter';

const socket = io('http://localhost:3000');
const viewer = new Viewer();

const sceneEl = document.getElementById('scene');
const modelPresenter = new ModelPresenter(sceneEl, 640, 480);

modelPresenter.render();

socket.on('frame', (data) => {
  const { x, y } = data.coords;

  viewer.update(data);

  modelPresenter.updateModelPos(x, y);
});
