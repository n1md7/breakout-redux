import { Component, Show } from 'solid-js';
import { highScore, score } from '/src/ui/store';

type Props = {
  highScoreOnly?: boolean;
};

export const Scores: Component<Props> = ({ highScoreOnly }) => {
  return (
    <fieldset>
      <legend>
        <b>Score</b>
      </legend>
      <div>
        <Show when={!highScoreOnly}>
          <div>
            <div>
              Current Score: <b>{score()}</b>
            </div>
          </div>
        </Show>
        <div>
          <div>
            High Score: <b>{highScore()}</b>
          </div>
        </div>
      </div>
    </fieldset>
  );
};
