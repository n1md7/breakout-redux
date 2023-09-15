export class Score {
  private score = 0;

  constructor(private readonly initialValue: number) {
    this.score = this.initialValue;
  }

  increment() {
    this.score++;
  }

  decrement() {
    this.score--;
  }

  add(value: number) {
    this.score += value;
  }

  reset() {
    this.score = this.initialValue;
  }

  toString() {
    return this.score.toString();
  }

  toValue() {
    return this.score;
  }
}
