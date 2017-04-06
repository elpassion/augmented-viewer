import imageProcessor from '../services/image-processor';

module.exports = (socket) => {
  imageProcessor((imgBuffer, coords) => {
    socket.emit('frame', { buffer: imgBuffer, coords });
  });
};
