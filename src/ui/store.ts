import { createSignal } from 'solid-js';
import { GameMode } from '/src/enums/mode';

export const [mode, setMode] = createSignal(GameMode.Modern);
export const [stage, setStage] = createSignal(0);

export const [sound, setSound] = createSignal(true);
export const [postProcessing, setPostProcessing] = createSignal(false);
export const [music, setMusic] = createSignal(true);

export const [score, setScore] = createSignal(0);
export const [highScore, setHighScore] = createSignal(0);

export const [adRewardDisabled, setAdRewardDisabled] = createSignal(false);
export const [adRewardTimeLeft, setAdRewardTimeLeft] = createSignal(0);

export const [gameOverDialogShown, setGameOverDialogShown] = createSignal(false);
export const [gameWinDialogShown, setGameWinDialogShown] = createSignal(false);
export const [extraLifeDialogShown, setExtraLifeDialogShown] = createSignal(false);

export const [bonusLevelCounter, setBonusLevelCounter] = createSignal(0);
