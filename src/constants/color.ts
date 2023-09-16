import * as L from 'littlejsengine/build/littlejs.esm';

export const Tiles: [number, number][] = [
  [6, 1], // Green
  [5, 10], // Light Green
  [16, 11], // Yellow
  [12, 7], // Red
  [15, 20], // Purple
  [17, 0], // Blue
  [26, 21], // Light Blue
  [22, 25], // Grey
  [2, 27], // Orange
  [31, 30], // Brown
];

export const Colors = [
  new L.Color().setHex('#00854A'), // Green
  new L.Color().setHex('#8CC63F'), // Light Green
  new L.Color().setHex('#FFDD00'), // Yellow
  new L.Color().setHex('#ED1B25'), // Red
  new L.Color().setHex('#91278F'), // Purple
  new L.Color().setHex('#005AAB'), // Blue
  new L.Color().setHex('#00AAE5'), // Light Blue
  new L.Color().setHex('#486370'), // Grey
  new L.Color().setHex('#F7931F'), // Orange
  new L.Color().setHex('#744C1F'), // Brown
];

// Guard against mistakes
if (Colors.length !== Tiles.length) {
  throw new Error('Colors and Tiles must have the same length');
}
