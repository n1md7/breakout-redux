import { State } from '/src/managers/state/State';
import { emitter } from '/src/utils/Emitter';
import { setExtraLifeDialogShown } from '/src/ui/store';
import { Game } from '/src/game/Game';

export class ExtraLifeDialog extends State {
  constructor(game: Game) {
    super(game);

    this.handleGetExtraLife = this.handleGetExtraLife.bind(this);
  }

  override async attach() {
    await super.attach();

    setExtraLifeDialogShown(true);
    emitter.on('getExtraLife', this.handleGetExtraLife);
  }

  override async detach() {
    setExtraLifeDialogShown(false);
    emitter.off('getExtraLife', this.handleGetExtraLife);

    await super.detach();
  }

  private async handleGetExtraLife(confirmed: boolean) {
    if (confirmed) {
      return await this.game.state.changeTo('adBreakExtraLife');
    }

    await this.game.state.changeTo('gameOver');
  }
}
