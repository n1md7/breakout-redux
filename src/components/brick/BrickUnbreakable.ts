import * as L from 'littlejsengine/build/littlejs.esm';
import { Brick } from '/src/components/brick/Brick';
import { UnbreakableTileColor, UnbreakableTileIndex } from '/src/constants/color';

export class BrickUnbreakable extends Brick {
  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    // Breakable after all but not meant to be easily broken
    this.strength = 16;
    this.tiles = this.getTileByIndex(1);
    this.color = UnbreakableTileColor;
    this.tileIndex = UnbreakableTileIndex;
  }

  get isBreakable(): boolean {
    return false;
  }

  override setStrength(strength: number) {}

  override get score(): number {
    return 0;
  }

  override increaseHitCount() {
    this.angle = L.rand(-0.01, 0.01);
    this.hitCount++;
  }
}
