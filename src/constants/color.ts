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
  new L.Color().setHex('#2D8303CC'), // Green
  new L.Color().setHex('#5B9E0DCC'), // Light Green
  new L.Color().setHex('#F2E205CC'), // Yellow
  new L.Color().setHex('#F21905CC'), // Red
  new L.Color().setHex('#F205A0CC'), // Purple
  new L.Color().setHex('#0564F2CC'), // Blue
  new L.Color().setHex('#05F2E2CC'), // Light Blue
  new L.Color().setHex('#A0A0A0CC'), // Grey
  new L.Color().setHex('#F28C05CC'), // Orange
  new L.Color().setHex('#A05F05CC'), // Brown
];

// Guard against mistakes
if (Colors.length !== Tiles.length) {
  throw new Error('Colors and Tiles must have the same length');
}
