import { Game } from '/src/game/Game';
import env from '/src/utils/Env';

export class AdManager {
  constructor() {}

  async showRewardAd() {
    if (!env.isCrazyGames()) return;

    await window.CrazyGames.SDK.game.gameplayStop();
    return new Promise<void>((resolve, reject) => {
      window.CrazyGames.SDK.ad.requestAd('rewarded', {
        adStarted: () => console.info('Ad started'),
        adError: (error) => reject(error),
        adFinished: () => {
          return window.CrazyGames.SDK.game.gameplayStart().finally(resolve);
        },
      });
    });
  }
}
