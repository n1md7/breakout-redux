import { Component, For } from 'solid-js';
import { stages } from '/src/commands/stage/stages';
import * as store from '/src/ui/store';

type Props = {};

export const Stages: Component<Props> = () => {
  const handleChange = (stage: number) => () => store.setStage(stage);

  return (
    <section>
      <fieldset>
        <legend>
          <b>Levels</b>
        </legend>
        <div class="levels">
          <For each={stages}>
            {(stage, idx) => (
              <div class="level">
                <input
                  type="radio"
                  id={stage.name}
                  name="stage"
                  onChange={handleChange(idx())}
                  checked={idx() === store.stage()}
                />
                <label for={stage.name}>{stage.name}</label>
              </div>
            )}
          </For>
        </div>
      </fieldset>
    </section>
  );
};
