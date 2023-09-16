import { Game } from '/src/Game';
import { BonusType } from '/src/enums/bonus';
import { Bonus } from '/src/command/Bonus';
import { PickBalls } from '/src/command/PickBalls';
import { PickLife } from '/src/command/PickLife';
import { PickPaddle } from '/src/command/PickPaddle';
import { PickShrink } from '/src/command/PickShrink';
import { PickStars } from '/src/command/PickStars';
import { PickWalls } from '/src/command/PickWalls';

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
