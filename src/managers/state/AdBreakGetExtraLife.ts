import { State } from '/src/managers/state/State';
import { as } from 'vitest/dist/reporters-cb94c88b';

export class AdBreakGetExtraLife extends State {
  override async attach() {
    await super.attach();

    await window.CrazyGames.SDK.game.gameplayStop();
    window.CrazyGames.SDK.ad.requestAd('rewarded', {
      adStarted: () => console.info('Ad started'),
      adError: async (error) => {
        console.warn('Ad error', error);
        // No ad, game over
        await this.game.state.changeTo('gameOver');
      },
      adFinished: async () => {
        console.info('Ad finished');

        await this.rewardPlayer();
        await this.game.state.changeTo('idle');
      },
    });
  }

  override async detach() {
    await window.CrazyGames.SDK.game.gameplayStart();

    await super.detach();
  }

  private async rewardPlayer() {
    this.game.lives.increment();
  }
}
