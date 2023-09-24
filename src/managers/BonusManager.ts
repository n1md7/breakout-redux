import { Game } from '/src/game/Game';
import { BonusType } from '/src/enums/bonus';
import { BonusType as AbstractBonus } from '/src/managers/bonus/BonusType';
import { ExtraBalls } from '/src/managers/bonus/ExtraBalls';
import { ExtraLife } from '/src/managers/bonus/ExtraLife';
import { PaddleIncrease } from '/src/managers/bonus/PaddleIncrease';
import { PaddleDecrease } from '/src/managers/bonus/PaddleDecrease';
import { ExtraScore } from '/src/managers/bonus/ExtraScore';
import { ExtraWall } from '/src/managers/bonus/ExtraWall';
import { DoubleBalls } from '/src/managers/bonus/DoubleBalls';
import { TripleBalls } from '/src/managers/bonus/TripleBalls';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Bonus } from '/src/components/Bonus';
import { LinkedList } from '/src/data-structures/LinkedList';

export class BonusManager {
  private readonly commands: Record<BonusType, AbstractBonus>;
  private readonly bonuses: LinkedList<Bonus> = new LinkedList<Bonus>();

  constructor(game: Game) {
    this.commands = {
      [BonusType.ExtraBalls]: new ExtraBalls(game),
      [BonusType.ExtraLife]: new ExtraLife(game),
      [BonusType.PaddleIncrease]: new PaddleIncrease(game),
      [BonusType.PaddleDecrease]: new PaddleDecrease(game),
      [BonusType.ExtraScore]: new ExtraScore(game),
      [BonusType.ExtraWall]: new ExtraWall(game),
      [BonusType.DoubleBalls]: new DoubleBalls(game),
      [BonusType.TripleBalls]: new TripleBalls(game),
      [BonusType.ExtraStrength]: new ExtraBalls(game),
    };
  }

  collect(current: Bonus) {
    // TODO: Play pickup sound
    this.commands[current.getType()].apply();
    for (const bonus of this.bonuses) {
      if (bonus.destroyed || current === bonus) {
        this.bonuses.remove(bonus);
      }
    }
  }

  produce(type: BonusType) {
    this.bonuses.add(new Bonus(L.vec2(L.randInt(2, LevelSize.x - 2), LevelSize.y - 2), type));
  }

  clearTimers() {
    for (const command of Object.values(this.commands)) {
      command.clearTimers();
    }
  }

  destroy() {
    this.clearTimers();
    for (const bonus of this.bonuses) {
      bonus.destroy();
      this.bonuses.remove(bonus);
    }
  }
}
