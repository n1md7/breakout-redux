export class Storage<T = string | number> {
  private readonly prefix = 'Breakout-';

  constructor(
    private readonly key: string,
    private readonly defaultValue: T,
  ) {
    this.set(this.get());
  }

  get(): T {
    const value = localStorage.getItem(this.prefix + this.key);
    if (!value) return this.defaultValue;

    return value as unknown as T;
  }

  toString() {
    return Number(this.get());
  }

  toValue() {
    return Number(this.get());
  }

  set(value: T) {
    localStorage.setItem(this.prefix + this.key, String(value));
  }

  reset() {
    this.set(this.defaultValue);
  }
}
