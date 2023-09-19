import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/brick/Brick';

export class BrickBreakable extends Brick {
  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);
  }

  get isBreakable(): boolean {
    return true;
  }
}
