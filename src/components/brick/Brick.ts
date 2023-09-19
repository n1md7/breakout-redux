import * as L from 'littlejsengine/build/littlejs.esm';
import { Colors, Tiles } from '/src/constants/color';
import { RandomPicker } from '/src/components/utils/RandomPicker';
import { BrickType } from '/src/enums/brick';

type Strength = number;

export abstract class Brick extends L.EngineObject {
  protected strength: Strength = 1;
  protected hitCount = 0;
  protected tiles: [number, number];
  protected index: number = 0;
  protected readonly picker: RandomPicker<number>;

  protected constructor(position: L.Vector2, size: L.Vector2 = L.vec2(2, 1)) {
    super(position, size);

    this.picker = new RandomPicker<Strength>([
      [BrickType.Normal, 70], // 70% chance of being a weak brick
      [BrickType.Hard, 30], // 30% chance of being a strong brick
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
    this.renderOrder = -1;
  }

  abstract get isBreakable(): boolean;

  get score(): number {
    return this.strength;
  }

  getStrength() {
    return this.strength;
  }

  setStrength(strength: Strength) {
    this.strength = strength;
  }

  increaseHitCount(): void {
    this.tileIndex = this.tiles[++this.hitCount];
    this.angle = L.rand(-0.3, 0.3);
  }

  shallBeDestroyed(): boolean {
    return this.hitCount >= this.strength;
  }

  protected getColorByIndex(index: number) {
    return Colors[index];
  }

  protected getTileByIndex(index: number): [number, number] {
    return Tiles[index];
  }
}
