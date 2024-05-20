function randomColor() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return { r, g, b };
}
function toRad(deg) {
  return deg * (Math.PI / 180.0);
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}
// get percent between 2 number
function getPercent(input, min, max) {
  return ((input - min) * 100) / (max - min) / 100;
}
