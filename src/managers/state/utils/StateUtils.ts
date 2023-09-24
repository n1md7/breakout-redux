import { Paused } from '/src/managers/state/Paused';
import { Started } from '/src/managers/state/Started';
import { Idle } from '/src/managers/state/Idle';
import { GameOver } from '/src/managers/state/GameOver';
import { AdBreakGetExtraLife } from '/src/managers/state/AdBreakGetExtraLife';
import { ExtraLifeDialog } from '/src/managers/state/ExtraLifeDialog';
import { StageWinDialog } from '/src/managers/state/StageWinDialog';
import { NextStage } from '/src/managers/state/NextStage';
import { Restarted } from '/src/managers/state/Restarted';
import { Initial } from '/src/managers/state/Initial';
import { State } from '/src/managers/state/State';

export type StateTypes =
  | 'initial'
  | 'started'
  | 'paused'
  | 'adBreakExtraLife'
  | 'adBreakDoubleScore'
  | 'extraLifeDialog'
  | 'idle'
  | 'stageWinDialog'
  | 'gameOver'
  | 'nextStage'
  | 'restarted';

export class StateUtils {
  constructor(protected state: State) {}

  get isPaused() {
    return this.state instanceof Paused;
  }

  get isStarted() {
    return this.state instanceof Started;
  }

  get isIdle() {
    return this.state instanceof Idle;
  }

  get isGameOver() {
    return this.state instanceof GameOver;
  }

  get isAdBreak() {
    return this.state instanceof AdBreakGetExtraLife;
  }

  get isExtraLifeDialog() {
    return this.state instanceof ExtraLifeDialog;
  }

  get isStageWinDialog() {
    return this.state instanceof StageWinDialog;
  }

  get isNextStage() {
    return this.state instanceof NextStage;
  }

  get isRestarted() {
    return this.state instanceof Restarted;
  }

  get isInitial() {
    return this.state instanceof Initial;
  }

  get value() {
    return this.state;
  }

  set value(state: State) {
    this.state = state;
  }
}
