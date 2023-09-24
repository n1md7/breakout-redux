import { LinkedList } from '/src/data-structures/LinkedList';
import { Brick } from '/src/components/brick/Brick';
import { Counter } from '/src/components/utils/Counter';
import { Game } from '/src/game/Game';
import { BrickType } from '/src/enums/brick';
import { BrickUnbreakable } from '/src/components/brick/BrickUnbreakable';
import { BrickBreakable } from '/src/components/brick/BrickBreakable';

export class BrickManager {
  public readonly destroyed: Counter;
  private readonly bricks: LinkedList<Brick>;
  private readonly game: Game;

  constructor(game: Game) {
    this.game = game;
    this.bricks = new LinkedList();
    this.destroyed = new Counter(0, 0, 999);
  }

  populate() {
    for (const [type, position] of this.game.stage.current.getCoords()) {
      if (type === BrickType.Unbreakable) {
        this.bricks.add(new BrickUnbreakable(position));
        continue;
      }

      if ([BrickType.Normal, BrickType.Hard].includes(type)) {
        this.bricks.add(new BrickBreakable(position));
      }
    }
  }

  areEmpty() {
    return this.bricks.isEmpty();
  }

  destroy() {
    for (const brick of this.bricks) brick.destroy();
    this.bricks.clear();
    this.destroyed.setVal(0);
  }

  *[Symbol.iterator]() {
    for (const brick of this.bricks) {
      yield brick;
    }
  }
}
