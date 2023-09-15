import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors } from '/src/constants/color';

export class Brick extends L.EngineObject {
  private strength = 1;
  private hitCount = 0;

  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    this.setCollision(true);
    this.mass = 0;
    this.strength = this.getStrength();
    this.color = this.getColor();
  }

  private getStrength() {
    const chance = L.randInt(0, 100);
    if (chance < 70) return 1;
    if (chance < 80) return 2;
    if (chance < 90) return 3;
    if (chance < 95) return 4;
    if (chance < 98) return 5;

    return 6;
  }

  private getColor() {
    return Colors[this.strength - this.hitCount - 1];
  }

  get score(): number {
    return this.strength;
  }

  increaseHitCount(): void {
    this.hitCount++;
    this.color = this.getColor();
  }

  evaluateAndDestroy(): boolean {
    if (this.hitCount === this.strength) {
      this.destroy();
      return true;
    }
    return false;
  }
}
