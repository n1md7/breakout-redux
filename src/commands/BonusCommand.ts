import { Game } from '/src/Game';
import { BonusType } from '/src/enums/bonus';
import { BonusType as AbstractBonus } from '/src/commands/bonus/BonusType';
import { ExtraBalls } from '/src/commands/bonus/ExtraBalls';
import { ExtraLife } from '/src/commands/bonus/ExtraLife';
import { PaddleIncrease } from '/src/commands/bonus/PaddleIncrease';
import { PaddleDecrease } from '/src/commands/bonus/PaddleDecrease';
import { ExtraScore } from '/src/commands/bonus/ExtraScore';
import { ExtraWall } from '/src/commands/bonus/ExtraWall';
import { DoubleBalls } from '/src/commands/bonus/DoubleBalls';
import { TripleBalls } from '/src/commands/bonus/TripleBalls';
import * as L from 'littlejsengine/build/littlejs.esm';
import { LevelSize } from '/src/constants/level';
import { Bonus } from '/src/components/Bonus';

export class BonusCommand {
  private readonly commands: Record<BonusType, AbstractBonus>;

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

  collect(type: BonusType) {
    // TODO: Play pickup sound
    this.commands[type].apply();
  }

  produce(type: BonusType) {
    new Bonus(L.vec2(L.randInt(2, LevelSize.x - 2), LevelSize.y - 2), type);
  }

  clearTimers() {
    for (const command of Object.values(this.commands)) {
      command.clearTimers();
    }
  }
}
