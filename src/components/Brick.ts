import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors, Tiles } from '/src/constants/color';

export class Brick extends L.EngineObject {
  private hitCount = 0;
  private readonly tiles: [number, number];
  private readonly strength: 1 | 0 = 0;
  private readonly index: number = 0;

  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    this.setCollision(true);
    this.mass = 0;
    // 20% chance of being a strong brick
    this.strength = L.randInt(0, 10) > 7 ? 1 : 0;
    this.index = L.randInt(0, Colors.length);
    this.tiles = this.getTileByIndex(this.index);
    this.color = this.getColorByIndex(this.index);
    this.tileIndex = this.tiles[this.hitCount];
    this.tileSize = L.vec2(384, 128);
    this.angle = 0;
  }

  private getColorByIndex(index: number) {
    return Colors[index];
  }

  private getTileByIndex(index: number): [number, number] {
    return Tiles[index];
  }

  get score(): number {
    return this.strength + 1;
  }

  increaseHitCount(): void {
    this.tileIndex = this.tiles[++this.hitCount];
    this.angle = L.rand(-0.3, 0.3);
  }

  shallBeDestroyed(): boolean {
    return this.hitCount > this.strength;
  }
}
