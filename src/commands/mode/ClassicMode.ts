import { Mode } from '/src/commands/mode/Mode';
import { Game } from '/src/Game';

export class ClassicMode extends Mode {
  constructor(game: Game) {
    super(game);
  }

  apply(): void {
    console.info('Classic mode activated');
    this.game.bricks.forEach((brick) => {
      // One hit to destroy
      brick.setStrength(1);
    });
  }
}
