import { Component, createSignal, For } from 'solid-js';
import * as stage from '/src/managers/stage/stages';
import * as store from '/src/ui/store';
import { emitter } from '/src/utils/Emitter';

type Props = {};

export const Stages: Component<Props> = () => {
  const [currentStage, setCurrentStage] = createSignal(store.stage());
  const handleChange = (stage: number) => () => {
    store.setStage(stage);
    setCurrentStage(stage);
    emitter.emit('stageChange', stage);
  };

  return (
    <section>
      <fieldset>
        <legend>
          <b>Levels</b>
        </legend>
        <div class="levels">
          <For each={stage.stages} fallback={<div>No items</div>}>
            {(stage, idx) => (
              <div class="level">
                <input
                  type="radio"
                  id={stage.name}
                  name="stage"
                  onChange={handleChange(idx())}
                  checked={idx() === currentStage()}
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
