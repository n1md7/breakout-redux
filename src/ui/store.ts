import { createSignal } from 'solid-js';
import { GameMode } from '/src/enums/mode';

export const [mode, setMode] = createSignal(GameMode.Modern);
export const [stage, setStage] = createSignal(0);
