import { Mode } from '/src/managers/mode/Mode';

export class ClassicMode extends Mode {
  public readonly displayName = 'Classic';

  apply(): void {
    console.info('Classic mode activated');
    if (this.game.bricks.length === 0) throw new Error('No bricks to iterate');
    this.game.bricks.forEach((brick) => {
      // One hit to destroy
      brick.setStrength(1);
    });
  }
}
