import { createSignal } from 'solid-js';
import { GameMode } from '/src/enums/mode';
import { stages } from '/src/managers/stage/stages';

export const [mode, setMode] = createSignal(GameMode.Modern);
export const [stage, setStage] = createSignal(0);

export const [sound, setSound] = createSignal(true);
export const [oldTVScreenEffect, setOldTVScreenEffect] = createSignal(false);
export const [music, setMusic] = createSignal(true);

export const [score, setScore] = createSignal(0);
export const [highScore, setHighScore] = createSignal(0);

export const [adRewardDisabled, setAdRewardDisabled] = createSignal(false);
export const [adRewardTimeLeft, setAdRewardTimeLeft] = createSignal(0);

export const [gameOverDialogShown, setGameOverDialogShown] = createSignal(false);
export const [gameWinDialogShown, setGameWinDialogShown] = createSignal(false);
export const [extraLifeDialogShown, setExtraLifeDialogShown] = createSignal(false);

export const [bonusLevelCounter, setBonusLevelCounter] = createSignal(0);

export const [stagesUnlocked, setStagesUnlocked] = createSignal(
  stages.map((stage) => {
    return {
      name: stage.name,
      unlocked: stage.isUnlocked(),
    };
  }),
);

export const unlockStage = (name: string, index: number) => {
  const stages = stagesUnlocked();
  stages[index].unlocked = true;
  setStagesUnlocked(stages.map((stage) => Object.assign({}, stage)));
};
