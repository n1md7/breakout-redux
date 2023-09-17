import { Game } from '/src/Game';
import { BonusType } from '/src/enums/bonus';
import { Bonus } from '/src/commands/bonus/Bonus';
import { PickBalls } from '/src/commands/bonus/PickBalls';
import { PickLife } from '/src/commands/bonus/PickLife';
import { PickPaddle } from '/src/commands/bonus/PickPaddle';
import { PickShrink } from '/src/commands/bonus/PickShrink';
import { PickStars } from '/src/commands/bonus/PickStars';
import { PickWalls } from '/src/commands/bonus/PickWalls';

export class BonusCommand {
  private readonly commands: Record<BonusType, Bonus>;

  constructor(game: Game) {
    this.commands = {
      [BonusType.Balls]: new PickBalls(game),
      [BonusType.Life]: new PickLife(game),
      [BonusType.Paddle]: new PickPaddle(game),
      [BonusType.Shrink]: new PickShrink(game),
      [BonusType.Stars]: new PickStars(game),
      [BonusType.Wall]: new PickWalls(game),
    };
  }

  execute(type: BonusType) {
    this.commands[type].apply();
  }
}
