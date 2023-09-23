import { Mode } from '/src/commands/mode/Mode';
import { Game } from '/src/game/Game';

export class ClassicMode extends Mode {
  public readonly displayName = 'Classic';

  constructor(game: Game) {
    super(game);
  }

  apply(): void {
    console.info('Classic mode activated');
    if (this.game.bricks.length === 0) throw new Error('No bricks iterate');
    this.game.bricks.forEach((brick) => {
      // One hit to destroy
      brick.setStrength(1);
    });
  }
}
