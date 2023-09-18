export class Counter {
  protected value: number;

  constructor(
    private readonly initialValue: number,
    protected readonly MIN: number = 0,
    protected readonly MAX: number = 9,
  ) {
    this.value = this.apply(initialValue);
  }

  decrement() {
    this.value = this.apply(--this.value);
  }

  increment() {
    this.value = this.apply(++this.value);
  }

  restore() {
    this.value = this.initialValue;
  }

  add(value: number) {
    this.value += value;
    this.value = this.apply(this.value);
  }

  sub(value: number) {
    this.value -= value;
    this.value = this.apply(this.value);
  }

  getValue() {
    return this.value;
  }

  hasValue() {
    return this.value > 0;
  }

  setMax() {
    this.value = this.MAX;
  }

  setMin() {
    this.value = this.MIN;
  }

  setVal(value: number) {
    this.value = this.apply(value);
  }

  private apply(value: number) {
    return Math.min(Math.max(value, this.MIN), this.MAX);
  }
}
