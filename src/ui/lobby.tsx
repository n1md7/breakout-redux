import { Component, createSignal } from 'solid-js';
import { Sound } from '/src/ui/settings/sound';
import { Mode } from '/src/ui/settings/mode';
import { Stages } from '/src/ui/settings/stages';
import { emitter } from '/src/utils/Emitter';

type Props = {};
export const Lobby: Component<Props> = () => {
  const [open, setOpen] = createSignal(true);
  const handleStart = () => {
    setOpen(false);
    emitter.emit('start');
  };

  return (
    <dialog id="lobby" open={open()}>
      <h2>Brick breaker</h2>
      <Mode />
      <Stages />
      <Sound />
      <section class="actions">
        <button onClick={handleStart}>Start</button>
      </section>
    </dialog>
  );
};
