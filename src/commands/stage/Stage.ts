import { Vector2, vec2 } from 'littlejsengine/build/littlejs.esm';
import { BrickType } from '/src/enums/brick';

export abstract class Stage {
  protected readonly offsetX = 0;
  protected readonly offsetY = 10;

  protected readonly blockWidth = 2;
  protected readonly blockHeight = 1;

  protected readonly count: number;
  protected readonly coords: [BrickType, Vector2][];

  private readonly key: string;

  protected constructor(
    readonly name: string,
    protected readonly map: number[][],
  ) {
    this.map = map.reverse();
    this.count = this.countBricks();
    this.coords = this.calcCoords();
    this.key = `Stage:${this.name}`;
  }

  getMap() {
    return this.map;
  }

  /**
   * Returns the number of {Breakable} bricks in the stage (Unbreakable bricks are not counted)
   */
  getBrickCount() {
    return this.count;
  }

  getCoords() {
    return this.coords;
  }

  private countBricks(): number {
    return this.map.reduce((acc, row) => {
      return (
        acc +
        row.reduce((acc, brick) => {
          return acc + (brick === 1 ? 1 : 0); // We count only 1s
        }, 0)
      );
    }, 0);
  }

  private calcCoords(): [BrickType, Vector2][] {
    const coords: [BrickType, Vector2][] = [];
    for (const [y, row] of this.map.entries()) {
      for (const [x, type] of row.entries()) {
        if (type === BrickType.Empty) continue;
        coords.push([type, vec2(x * this.blockWidth + this.offsetX, y * this.blockHeight + this.offsetY)]);
      }
    }

    return coords;
  }

  isUnlocked() {
    return localStorage.getItem(this.key) === 'unlocked';
  }

  unlock() {
    localStorage.setItem(this.key, 'unlocked');
  }
}
