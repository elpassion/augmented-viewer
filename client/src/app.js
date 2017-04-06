/* global io */

import Viewer from './viewer';

const socket = io('http://localhost:3000');
const viewer = new Viewer();

socket.on('frame', viewer.update);
