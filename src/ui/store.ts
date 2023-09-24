import { createSignal } from 'solid-js';
import { GameMode } from '/src/enums/mode';

export const [mode, setMode] = createSignal(GameMode.Modern);
export const [stage, setStage] = createSignal(0);

export const [sound, setSound] = createSignal(false);
export const [music, setMusic] = createSignal(true);

export const [score, setScore] = createSignal(0);
export const [highScore, setHighScore] = createSignal(0);

export const [gameOverDialogShown, setGameOverDialogShown] = createSignal(false);
export const [gameWinDialogShown, setGameWinDialogShown] = createSignal(false);
export const [extraLifeDialogShown, setExtraLifeDialogShown] = createSignal(false);
