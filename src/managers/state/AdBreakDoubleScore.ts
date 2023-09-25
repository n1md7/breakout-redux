import { State } from '/src/managers/state/State';

export class AdBreakDoubleScore extends State {
  override async attach() {
    await super.attach();

    try {
      await this.game.ads.showRewardAd();
      console.info('Ad finished');
      await this.rewardPlayer();
    } catch (error) {
      console.warn('Ad error', error);
      // No ad, no reward
    } finally {
      await this.game.state.changeTo('nextStage');
    }
  }

  override async detach() {
    await super.detach();
  }

  private async rewardPlayer() {
    this.game.score.double();
  }
}
