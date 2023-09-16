import * as L from 'littlejsengine/build/littlejs.esm';
import { boolean } from 'yup';

export class Paddle extends L.EngineObject {
  constructor(private readonly levelSize: L.Vector2) {
    super(L.vec2(0, 1), L.vec2(6, 0.5));
    this.color = new L.Color(1, 1, 1, 0.5);

    this.setCollision(true);
    this.mass = 0; // Static object
  }

  override update() {
    const min = this.size.x * 0.5; // half the width of the paddle
    const max = this.levelSize.x - min;
    this.pos.x = L.clamp(L.mousePos.x, min, max);
  }

  increaseSize() {
    this.size.x += 2;
  }

  decreaseSize() {
    this.size.x -= 2;
  }

  resetSize() {
    this.size.x = 6;
  }
}
