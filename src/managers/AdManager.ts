import { setAdRewardDisabled, setAdRewardTimeLeft } from '/src/ui/store';
import env from '/src/utils/Env';

export class AdManager {
  private readonly coolDown = 30_000;

  private enabled = true;
  private timer: NodeJS.Timeout | null = null;
  private timeLeft = 0;

  constructor() {}

  async showRewardAd() {
    if (!this.enabled) return;
    if (!env.isCrazyGames()) return;

    await window.CrazyGames.SDK.game.gameplayStop();
    return new Promise<void>((resolve, reject) => {
      window.CrazyGames.SDK.ad.requestAd('rewarded', {
        adStarted: () => console.info('Ad started'),
        adError: (error) => reject(error),
        adFinished: () => {
          this.disableAdManager();
          this.enableAdManager();
          return window.CrazyGames.SDK.game.gameplayStart().finally(resolve);
        },
      });
    });
  }

  private disableAdManager() {
    this.enabled = false;
    setAdRewardDisabled(true);
    this.timeLeft = this.coolDown / 1000;
    this.timer = setInterval(() => {
      setAdRewardTimeLeft(--this.timeLeft);
    }, 1000);
  }

  private enableAdManager() {
    setTimeout(() => {
      this.enabled = true;
      setAdRewardDisabled(false);
      if (this.timer) clearTimeout(this.timer);
    }, this.coolDown);
  }
}
