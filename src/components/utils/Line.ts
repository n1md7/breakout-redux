import { Wall } from '/src/components/Wall';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';

export class Line extends Wall {
  constructor() {
    super(L.vec2(LevelSize.x * 0.5, 3.0), L.vec2(LevelSize.x - 0.5, 0.1));

    this.color = new L.Color(1, 1, 1, 0.3);
    this.setCollision(false, false);
  }
}
