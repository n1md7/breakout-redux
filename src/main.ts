import env from './utils/Env';
import { Game } from '/src/game/Game';
import { emitter } from '/src/utils/Emitter';
import * as store from '/src/ui/store';

console.info('Is development mode:', env.isDevelopment());

const game = new Game();

emitter.on('start', async () => {
  game.run(store.mode(), store.stage());

  if (env.isCrazyGames()) await window.CrazyGames.SDK.game.gameplayStart();
});

function isPortrait() {
  return window.innerWidth < window.innerHeight;
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function applyMaxHeightToDialog() {
  if (isMobile() && isPortrait()) {
    document.documentElement.style.setProperty('--dialog-max-height', '90vh');
  }
}

window.addEventListener('resize', applyMaxHeightToDialog);
window.addEventListener('DOMContentLoaded', applyMaxHeightToDialog);
