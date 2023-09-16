import * as L from 'littlejsengine/build/littlejs.esm';

export const Sounds = {
  BallBounce: new L.Sound([, , 119, 0.02, 0.01, 0.02, , 0.26, , 0.5, , , , , -381, , , , 0.01, 0.8]), // Blip
  BrickHit: new L.Sound([, , 141, , , 0.02, 1, 0, , , , , , 0.5, 70, , , , 0.01]), // Hit
  BrickDestroy: new L.Sound([1.37, , 574, 0.04, 0.27, 0.3, 2, 2.9, 0.6, -0.1, , , 0.13, 1.8, , 0.3, , 0.25, 0.01]), //Destroy
} as const;
