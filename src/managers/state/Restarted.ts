import { State } from '/src/managers/state/State';

export class Restarted extends State {
  override async attach() {
    await super.attach();

    this.game.stage.restart();
    this.game.balls.destroy();
    this.game.bonus.destroy();
    this.game.lives.restore();

    await this.game.state.changeTo('idle');
  }
}
