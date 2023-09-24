import { Component, createSignal } from 'solid-js';
import { Sound } from '/src/ui/settings/Sound';
import { Mode } from '/src/ui/settings/Mode';
import { Stages } from '/src/ui/settings/Stages';
import { emitter } from '/src/utils/Emitter';

type Props = {};
export const GameStart: Component<Props> = () => {
  const [open, setOpen] = createSignal(true);
  const handleStart = () => {
    setOpen(false);
    emitter.emit('start');
  };

  return (
    <dialog open={open()}>
      <h2>Brick breaker</h2>
      <Mode />
      <Stages />
      <Sound />
      <section class="actions">
        <button onClick={handleStart}>Play</button>
      </section>
    </dialog>
  );
};
