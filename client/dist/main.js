(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global io */

var socket = io('http://localhost:3000');

var canvas = document.getElementById('viewer');
var ctx = canvas.getContext('2d');
var image = new Image();

canvas.width = 640;
canvas.height = 480;

socket.on('frame', function (data) {
  var buffer = data.buffer,
      coords = data.coords;

  var uint8Arr = new Uint8Array(buffer);
  var str = String.fromCharCode.apply(null, uint8Arr);
  var base64String = btoa(str);

  image.onload = function () {
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeWidth = 1;
    ctx.arc(coords.x, coords.y, coords.radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  image.src = 'data:image/png;base64,' + base64String;
});

},{}]},{},[1])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBpbyAqL1xuXG52YXIgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xuXG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlcicpO1xudmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG5cbmNhbnZhcy53aWR0aCA9IDY0MDtcbmNhbnZhcy5oZWlnaHQgPSA0ODA7XG5cbnNvY2tldC5vbignZnJhbWUnLCBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgYnVmZmVyID0gZGF0YS5idWZmZXIsXG4gICAgICBjb29yZHMgPSBkYXRhLmNvb3JkcztcblxuICB2YXIgdWludDhBcnIgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICB2YXIgc3RyID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCB1aW50OEFycik7XG4gIHZhciBiYXNlNjRTdHJpbmcgPSBidG9hKHN0cik7XG5cbiAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGN0eC5kcmF3SW1hZ2UodGhpcywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XG4gICAgY3R4LnN0cm9rZVdpZHRoID0gMTtcbiAgICBjdHguYXJjKGNvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfTtcblxuICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBiYXNlNjRTdHJpbmc7XG59KTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKamJHbGxiblF2YzNKakwyRndjQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUdEJRMEZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUtHWjFibU4wYVc5dUlHVW9kQ3h1TEhJcGUyWjFibU4wYVc5dUlITW9ieXgxS1h0cFppZ2hibHR2WFNsN2FXWW9JWFJiYjEwcGUzWmhjaUJoUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN2FXWW9JWFVtSm1FcGNtVjBkWEp1SUdFb2J5d2hNQ2s3YVdZb2FTbHlaWFIxY200Z2FTaHZMQ0V3S1R0MllYSWdaajF1WlhjZ1JYSnliM0lvWENKRFlXNXViM1FnWm1sdVpDQnRiMlIxYkdVZ0oxd2lLMjhyWENJblhDSXBPM1JvY205M0lHWXVZMjlrWlQxY0lrMVBSRlZNUlY5T1QxUmZSazlWVGtSY0lpeG1mWFpoY2lCc1BXNWJiMTA5ZTJWNGNHOXlkSE02ZTMxOU8zUmJiMTFiTUYwdVkyRnNiQ2hzTG1WNGNHOXlkSE1zWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzQ5ZEZ0dlhWc3hYVnRsWFR0eVpYUjFjbTRnY3lodVAyNDZaU2w5TEd3c2JDNWxlSEJ2Y25SekxHVXNkQ3h1TEhJcGZYSmxkSFZ5YmlCdVcyOWRMbVY0Y0c5eWRITjlkbUZ5SUdrOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdG1iM0lvZG1GeUlHODlNRHR2UEhJdWJHVnVaM1JvTzI4ckt5bHpLSEpiYjEwcE8zSmxkSFZ5YmlCemZTa2lMQ0luZFhObElITjBjbWxqZENjN1hHNWNiaThxSUdkc2IySmhiQ0JwYnlBcUwxeHVYRzUyWVhJZ2MyOWphMlYwSUQwZ2FXOG9KMmgwZEhBNkx5OXNiMk5oYkdodmMzUTZNekF3TUNjcE8xeHVYRzUyWVhJZ1kyRnVkbUZ6SUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjNacFpYZGxjaWNwTzF4dWRtRnlJR04wZUNBOUlHTmhiblpoY3k1blpYUkRiMjUwWlhoMEtDY3laQ2NwTzF4dWRtRnlJR2x0WVdkbElEMGdibVYzSUVsdFlXZGxLQ2s3WEc1Y2JtTmhiblpoY3k1M2FXUjBhQ0E5SURZME1EdGNibU5oYm5aaGN5NW9aV2xuYUhRZ1BTQTBPREE3WEc1Y2JuTnZZMnRsZEM1dmJpZ25abkpoYldVbkxDQm1kVzVqZEdsdmJpQW9aR0YwWVNrZ2UxeHVJQ0IyWVhJZ1luVm1abVZ5SUQwZ1pHRjBZUzVpZFdabVpYSXNYRzRnSUNBZ0lDQmpiMjl5WkhNZ1BTQmtZWFJoTG1OdmIzSmtjenRjYmx4dUlDQjJZWElnZFdsdWREaEJjbklnUFNCdVpYY2dWV2x1ZERoQmNuSmhlU2hpZFdabVpYSXBPMXh1SUNCMllYSWdjM1J5SUQwZ1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTNWhjSEJzZVNodWRXeHNMQ0IxYVc1ME9FRnljaWs3WEc0Z0lIWmhjaUJpWVhObE5qUlRkSEpwYm1jZ1BTQmlkRzloS0hOMGNpazdYRzVjYmlBZ2FXMWhaMlV1YjI1c2IyRmtJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUdOMGVDNWtjbUYzU1cxaFoyVW9kR2hwY3l3Z01Dd2dNQ3dnWTJGdWRtRnpMbmRwWkhSb0xDQmpZVzUyWVhNdWFHVnBaMmgwS1R0Y2JpQWdJQ0JqZEhndVltVm5hVzVRWVhSb0tDazdYRzRnSUNBZ1kzUjRMbk4wY205clpWTjBlV3hsSUQwZ0ozSmxaQ2M3WEc0Z0lDQWdZM1I0TG5OMGNtOXJaVmRwWkhSb0lEMGdNVHRjYmlBZ0lDQmpkSGd1WVhKaktHTnZiM0prY3k1NExDQmpiMjl5WkhNdWVTd2dZMjl2Y21SekxuSmhaR2wxY3l3Z01Dd2dNaUFxSUUxaGRHZ3VVRWtwTzF4dUlDQWdJR04wZUM1emRISnZhMlVvS1R0Y2JpQWdmVHRjYmx4dUlDQnBiV0ZuWlM1emNtTWdQU0FuWkdGMFlUcHBiV0ZuWlM5d2JtYzdZbUZ6WlRZMExDY2dLeUJpWVhObE5qUlRkSEpwYm1jN1hHNTlLVHRjYmlKZGZRPT0ifQ==