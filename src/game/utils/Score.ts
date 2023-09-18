export class Score {
  private score = 0;
  private highScore = 0;

  constructor(private readonly initialValue: number) {
    this.score = this.initialValue;
    this.highScore = Number(localStorage.getItem('highScore')) || 0;
  }

  increment() {
    this.score++;
    this.evaluateHighScore();
  }

  decrement() {
    this.score--;
    this.evaluateHighScore();
  }

  add(value: number) {
    this.score += value;
    this.evaluateHighScore();
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

  getHighScore() {
    return this.highScore;
  }

  private evaluateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toString());
    }
  }
}
