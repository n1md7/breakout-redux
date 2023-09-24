import * as store from '/src/ui/store';
import { Storage } from '/src/utils/Storage';
import { Counter } from '/src/components/utils/Counter';

export class Score {
  private readonly score: Counter;
  private readonly highScore: Storage<number>;

  constructor(private readonly initialValue: number) {
    this.score = new Counter(initialValue, 0, 10e15);
    this.highScore = new Storage('highScore', 0);
    store.setHighScore(this.highScore.toValue());
    store.setScore(this.score.getValue());
  }

  increment() {
    this.score.increment();
    store.setScore(this.score.getValue());
    this.evaluateHighScore();
  }

  decrement() {
    this.score.decrement();
    store.setScore(this.score.getValue);
    this.evaluateHighScore();
  }

  add(value: number) {
    this.score.add(value);
    store.setScore(this.score.getValue());
    this.evaluateHighScore();
  }

  double() {
    this.score.setVal(this.score.getValue() * 2);
    store.setScore(this.score.getValue());
    this.evaluateHighScore();
  }

  reset() {
    this.score.restore();
    store.setScore(this.initialValue);
  }

  toString() {
    return this.score.toString();
  }

  toValue() {
    return this.score.getValue();
  }

  getHighScore() {
    return this.highScore;
  }

  private evaluateHighScore() {
    if (this.score.getValue() > this.highScore.toValue()) {
      this.highScore.set(this.score.getValue());
      store.setHighScore(this.score.getValue());
    }
  }
}
