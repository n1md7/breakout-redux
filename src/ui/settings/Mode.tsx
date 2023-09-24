import { Component, For } from 'solid-js';
import { GameMode } from '/src/enums/mode';
import { mode, setMode } from '/src/ui/store';
import { emitter } from '/src/utils/Emitter';

type Props = {};

export const Mode: Component<Props> = () => {
  const modes = [
    {
      name: 'Classic',
      value: GameMode.Classic,
    },
    {
      name: 'Dynamic',
      value: GameMode.Dynamic,
    },
    {
      name: 'Modern',
      value: GameMode.Modern,
    },
  ];
  const handleMode = (value: number) => () => {
    setMode(value);
    emitter.emit('modeChange', value);
  };

  return (
    <section class="modes">
      <fieldset>
        <legend>
          <b>Mode</b>
        </legend>

        <For each={modes}>
          {(item) => (
            <div class="mode">
              <input type="radio" id={item.name} checked={mode() === item.value} onChange={handleMode(item.value)} />
              <label for={item.name}>{item.name}</label>
            </div>
          )}
        </For>
      </fieldset>
    </section>
  );
};
