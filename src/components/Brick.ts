import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors, Tiles } from '/src/constants/color';
import { RandomPicker } from '/src/components/utils/RandomPicker';

type Strength = number;
export class Brick extends L.EngineObject {
  private strength: Strength = 1;
  private hitCount = 0;
  private readonly tiles: [number, number];
  private readonly index: number = 0;
  private readonly picker: RandomPicker<number>;

  constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    this.picker = new RandomPicker<Strength>([
      [1, 0.7], // 70% chance of being a weak brick
      [2, 0.3], // 30% chance of being a strong brick
    ]);
    this.mass = 0;
    this.angle = 0;
    this.setCollision(true);
    this.strength = this.picker.pick();
    this.index = L.randInt(0, Colors.length);
    this.tiles = this.getTileByIndex(this.index);
    this.color = this.getColorByIndex(this.index);
    this.tileIndex = this.tiles[this.hitCount];
    this.tileSize = L.vec2(384, 128);
  }

  getStrength() {
    return this.strength;
  }

  setStrength(strength: Strength) {
    this.strength = strength;
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
    this.angle = L.rand(-0.3, 0.3);
  }

  shallBeDestroyed(): boolean {
    return this.hitCount >= this.strength;
  }
}
