import { State } from '/src/managers/state/State';

export class AdBreakGetExtraLife extends State {
  override async attach() {
    await super.attach();

    try {
      await this.game.ads.showRewardAd();
      console.info('Ad finished');
      await this.rewardPlayer();
      await this.game.state.changeTo('idle');
    } catch (error) {
      console.warn('Ad error', error);
      // No ad, game over
      await this.game.state.changeTo('gameOver');
    }
  }

  override async detach() {
    await super.detach();
  }

  private async rewardPlayer() {
    this.game.lives.increment();
  }
}
