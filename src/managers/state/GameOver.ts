import { State } from '/src/managers/state/State';
import { emitter } from '/src/utils/Emitter';
import { mode, setGameOverDialogShown, stage } from '/src/ui/store';
import { Game } from '/src/game/Game';

export class GameOver extends State {
  constructor(game: Game) {
    super(game);

    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleStageChange = this.handleStageChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }
  override async attach() {
    await super.attach();

    this.game.stage.reset();
    setGameOverDialogShown(true);
    emitter.on('modeChange', this.handleModeChange);
    emitter.on('stageChange', this.handleStageChange);
    emitter.on('startClick', this.handleStartClick);
  }

  override async detach() {
    setGameOverDialogShown(false);
    emitter.off('modeChange', this.handleModeChange);
    emitter.off('stageChange', this.handleStageChange);
    emitter.off('startClick', this.handleStartClick);

    await super.detach();
  }

  private handleModeChange() {
    this.game.mode.execute(mode());
  }

  private handleStageChange() {
    this.game.stage.execute(stage());
  }

  private async handleStartClick() {
    this.game.balls.reset();
    this.game.lives.restore();

    this.game.mode.execute(mode());
    this.game.stage.execute(stage());

    if (this.game.state.previous.isExtraLifeDialog) {
      // "No, thanks" was clicked
      this.game.score.reset();
    }

    await this.game.state.changeTo('idle');
  }
}
