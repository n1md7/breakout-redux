import { Mode } from '/src/managers/mode/Mode';

export class ClassicMode extends Mode {
  public readonly displayName = 'Classic';

  apply(): void {
    console.info('Classic mode activated');
    if (this.game.bricks.areEmpty()) throw new Error('No bricks to iterate');
    this.game.balls.setStrength(1);
    for (const brick of this.game.bricks) {
      // One hit to destroy
      brick.setStrength(1);
    }
  }
}
