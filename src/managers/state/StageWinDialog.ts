import { State } from '/src/managers/state/State';
import { emitter } from '/src/utils/Emitter';
import * as store from '/src/ui/store';
import { Game } from '/src/game/Game';
import env from '/src/utils/Env';
import { sounds } from '/src/constants/sound';

export class StageWinDialog extends State {
  constructor(game: Game) {
    super(game);

    this.handleDoubleWin = this.handleDoubleWin.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }
  override async attach() {
    await super.attach();

    sounds.gameWin.play();
    if (env.isCrazyGames()) await window.CrazyGames.SDK.game.happytime();

    store.setGameWinDialogShown(true);
    emitter.on('doubleWin', this.handleDoubleWin);
    emitter.on('nextStage', this.handleNextStage);
    emitter.on('restartStage', this.handleRestart);
  }

  override async detach() {
    store.setGameWinDialogShown(false);
    emitter.off('doubleWin', this.handleDoubleWin);
    emitter.off('nextStage', this.handleNextStage);
    emitter.off('restartStage', this.handleRestart);

    await super.detach();
  }

  private async handleDoubleWin() {
    await this.game.state.changeTo('adBreakDoubleScore');
  }

  private async handleNextStage() {
    await this.game.state.changeTo('nextStage');
  }

  private async handleRestart() {
    await this.game.state.changeTo('restarted');
  }
}
