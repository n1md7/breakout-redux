import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors, Tiles } from '/src/constants/color';

export class Brick extends L.EngineObject {
  private hitCount = 0;
  private readonly tiles: [number, number];
  private readonly strength = 1;
  private readonly index: number = 0;

  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    this.setCollision(true);
    this.mass = 0;
    this.index = L.randInt(0, Colors.length);
    this.tiles = this.getTileByIndex(this.index);
    this.color = this.getColorByIndex(this.index);
    this.tileIndex = this.tiles[this.hitCount];
    this.tileSize = L.vec2(384, 128);
  }

  private getColorByIndex(index: number) {
    return Colors[index];
  }

  private getTileByIndex(index: number): [number, number] {
    return Tiles[index];
  }

  get score(): number {
    return this.strength;
  }

  increaseHitCount(): void {
    this.tileIndex = this.tiles[++this.hitCount];
  }

  shallBeDestroyed(): boolean {
    return this.hitCount > this.strength;
  }
}
