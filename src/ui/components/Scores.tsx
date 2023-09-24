import { Component } from 'solid-js';
import { highScore, score } from '/src/ui/store';

type Props = {};

export const Scores: Component<Props> = () => {
  return (
    <fieldset>
      <legend>
        <b>Score</b>
      </legend>
      <div>
        <div>
          <div>Current Score</div>
          <b>{score()}</b>
        </div>
        <div>
          <div>High Score</div>
          <b>{highScore()}</b>
        </div>
      </div>
    </fieldset>
  );
};
