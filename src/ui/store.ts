import { createSignal } from 'solid-js';
import { GameMode } from '/src/enums/mode';

export const [mode, setMode] = createSignal(GameMode.Modern);
export const [stage, setStage] = createSignal(0);

export const [sound, setSound] = createSignal(true);
export const [music, setMusic] = createSignal(true);
export const [gameOver, setGameOver] = createSignal(false);

export const [score, setScore] = createSignal(0);
export const [highScore, setHighScore] = createSignal(0);
