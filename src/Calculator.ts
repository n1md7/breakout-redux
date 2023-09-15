export class Calculator {
  private stack: number[] = [];

  public push(value: number) {
    this.stack.push(value);
  }

  public pop() {
    return this.stack.pop();
  }

  public add() {
    const a = this.pop();
    const b = this.pop();

    this.push(a! + b!);
  }

  public subtract() {
    const b = this.pop();
    const a = this.pop();

    this.push(a! - b!);
  }

  public multiply() {
    const a = this.pop();
    const b = this.pop();

    this.push(a! * b!);
  }

  public divide() {
    const b = this.pop();
    const a = this.pop();

    if (b === 0) {
      throw new Error('Division by zero');
    }

    this.push(a! / b!);
  }

  public result() {
    return this.stack.pop();
  }

  public reset() {
    this.stack = [];
  }
}
