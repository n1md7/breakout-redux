import { Mode } from '/src/commands/mode/Mode';
import { Game } from '/src/Game';

export class ModernMode extends Mode {
  public readonly displayName = 'Modern';

  constructor(game: Game) {
    super(game);
  }

  apply(): void {
    console.info('Modern mode activated');
  }
}
