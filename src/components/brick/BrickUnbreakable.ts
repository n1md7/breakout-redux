import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/brick/Brick';
import { UnbreakableTileColor, UnbreakableTileIndex } from '/src/constants/color';

export class BrickUnbreakable extends Brick {
  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    // Breakable after all but not meant to be broken
    this.strength = 99;
    this.tiles = this.getTileByIndex(1);
    this.color = UnbreakableTileColor;
    this.tileIndex = UnbreakableTileIndex;
  }

  override setStrength(strength: number) {}
  override increaseHitCount() {
    this.angle = L.rand(-0.01, 0.01);
  }
}
