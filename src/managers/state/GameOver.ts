import { State } from '/src/managers/state/State';
import { emitter } from '/src/utils/Emitter';
import { mode, setGameOverDialogShown, stage } from '/src/ui/store';
import { Game } from '/src/game/Game';

export class GameOver extends State {
  constructor(game: Game) {
    super(game);

    this.handleStartClick = this.handleStartClick.bind(this);
  }
  override async attach() {
    await super.attach();

    this.game.bonus.stop(); // Keep on screen
    setGameOverDialogShown(true);
    emitter.on('startClick', this.handleStartClick);
  }

  override async detach() {
    setGameOverDialogShown(false);
    emitter.off('startClick', this.handleStartClick);

    await super.detach();
  }

  private async handleStartClick() {
    this.game.mode.execute(mode());
    this.game.stage.execute(stage());

    this.game.balls.destroy();
    this.game.bonus.destroy();
    this.game.bricks.destroy();
    this.game.lives.restore();

    this.game.bricks.populate();

    if (this.game.state.previous.isExtraLifeDialog) {
      // "No, thanks" was clicked
      this.game.score.reset();
    }

    await this.game.state.changeTo('idle');
  }
}
