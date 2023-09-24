import { Game } from '/src/game/Game';
import { State } from '/src/managers/state/State';
import { Started } from '/src/managers/state/Started';
import { Paused } from '/src/managers/state/Paused';
import { Restarted } from '/src/managers/state/Restarted';
import { Idle } from '/src/managers/state/Idle';
import { AdBreakGetExtraLife } from '/src/managers/state/AdBreakGetExtraLife';
import { GameOver } from '/src/managers/state/GameOver';
import { StageWinDialog } from '/src/managers/state/StageWinDialog';
import { Initial } from '/src/managers/state/Initial';
import { ExtraLifeDialog } from '/src/managers/state/ExtraLifeDialog';
import { NextStage } from '/src/managers/state/NextStage';
import { StateTypes, StateUtils } from '/src/managers/state/utils/StateUtils';
import { AdBreakDoubleScore } from '/src/managers/state/AdBreakDoubleScore';

export class StateManager extends StateUtils {
  private readonly states: Record<StateTypes, State>;
  private readonly previousState: StateUtils;

  constructor(game: Game) {
    super(new Initial(game));

    this.states = {
      initial: new Initial(game),
      started: new Started(game),
      paused: new Paused(game),
      idle: new Idle(game),
      restarted: new Restarted(game),
      gameOver: new GameOver(game),
      nextStage: new NextStage(game),
      extraLifeDialog: new ExtraLifeDialog(game),
      stageWinDialog: new StageWinDialog(game),
      adBreakExtraLife: new AdBreakGetExtraLife(game),
      adBreakDoubleScore: new AdBreakDoubleScore(game),
    };
    this.state = this.states.initial;
    this.state.attach();
    this.previousState = new StateUtils(this.state);
  }

  get previous() {
    return this.previousState;
  }

  async changeTo(type: StateTypes) {
    this.previousState.value = this.state;
    await this.state.detach();
    this.state = this.states[type];
    await this.state.attach();
  }

  update(dt: number) {
    this.state.update(dt);
  }
}
