import { Mode } from '/src/managers/mode/Mode';
import { Game } from '/src/game/Game';
import { BonusType } from '/src/enums/bonus';

export class ModernMode extends Mode {
  public readonly displayName = 'Modern';

  constructor(game: Game) {
    super(game);

    this.bonusPicker.setProbabilities([
      [BonusType.DoubleBalls, 5],
      [BonusType.TripleBalls, 5],
      [BonusType.ExtraBalls, 15],
      [BonusType.ExtraScore, 15],
      [BonusType.ExtraWall, 10],
      [BonusType.ExtraStrength, 20],
      [BonusType.PaddleDecrease, 15],
      [BonusType.PaddleIncrease, 15],
    ]);
  }

  apply(): void {
    console.info('Modern mode activated');
  }
}
