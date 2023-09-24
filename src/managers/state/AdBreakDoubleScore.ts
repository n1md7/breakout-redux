import { State } from '/src/managers/state/State';

export class AdBreakDoubleScore extends State {
  override async attach() {
    await super.attach();

    await window.CrazyGames.SDK.game.gameplayStop();
    window.CrazyGames.SDK.ad.requestAd('rewarded', {
      adStarted: () => console.info('Ad started'),
      adError: async (error) => {
        console.warn('Ad error', error);
        // No ad, no reward
        await this.game.state.changeTo('nextStage');
      },
      adFinished: async () => {
        console.info('Ad finished');
        // Reward player on ad finished
        await this.rewardPlayer();
        await this.game.state.changeTo('nextStage');
      },
    });
  }

  override async detach() {
    await window.CrazyGames.SDK.game.gameplayStart();

    await super.detach();
  }

  private async rewardPlayer() {
    this.game.score.double();
  }
}
