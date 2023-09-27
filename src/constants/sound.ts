import * as L from 'littlejsengine/build/littlejs.esm';
import { music, sound } from '/src/ui/store';
import { emitter } from '/src/utils/Emitter';

emitter.on('sound', () => {
  L.setSoundEnable(sound());
  console.info('Sound is', sound() ? 'enabled' : 'disabled');
});
emitter.emit('music', () => {
  console.info('Music is', music() ? 'enabled' : 'disabled');
});

export const sounds = {
  gameLose: new L.Sound([2, , 1118, 0.02, 0.02, 0.12, , 1.85, -2.4, -0.1, -209, 0.04, , , , , 0.08, 0.99, , 0.13]),
  gameWin: new L.Sound([1.03, , 429, 0.07, 0.15, 0.23, 1, 1.43, , 8.8, , , 0.07, , , , , 0.4, 0.29, 0.47]),
  gameStart: new L.Sound([, 0, 500, , 0.04, 0.3, 1, 2, , , 570, 0.02, 0.02, , , , 0.04]),
  ballBounce: new L.Sound([, , 119, 0.02, 0.01, 0.02, , 0.26, , 0.5, , , , , -381, , , , 0.01, 0.8]), // Blip
  brickHit: new L.Sound([, , 141, , , 0.02, 1, 0, , , , , , 0.5, 70, , , , 0.01]), // Hit
  brickDestroy: new L.Sound([1.37, , 574, 0.04, 0.27, 0.3, 2, 2.9, 0.6, -0.1, , , 0.13, 1.8, , 0.3, , 0.25, 0.01]), //Destroy
} as const;
