import { Component, For } from 'solid-js';
import { GameMode } from '/src/enums/mode';
import { mode, setMode } from '/src/ui/store';

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
  const handleMode = (value: number) => () => setMode(value);

  return (
    <section>
      <fieldset>
        <legend>
          <b>Mode</b>
        </legend>

        <For each={modes}>
          {(item) => (
            <>
              <input type="radio" id={item.name} checked={mode() === item.value} onChange={handleMode(item.value)} />
              <label for={item.name}>{item.name}</label>
              <br />
            </>
          )}
        </For>
      </fieldset>
    </section>
  );
};
