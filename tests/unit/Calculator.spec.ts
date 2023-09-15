import { Calculator } from '/src/Calculator';
import { describe, expect, it } from 'vitest';

describe('Calculator', () => {
  it('should add', () => {
    const calculator = new Calculator();

    calculator.push(2);
    calculator.push(3);
    calculator.add();

    expect(calculator.result()).toBe(5);
  });

  it('should subtract', () => {
    const calculator = new Calculator();

    calculator.push(2);
    calculator.push(3);
    calculator.subtract();

    expect(calculator.result()).toBe(-1);
  });

  it('should multiply', () => {
    const calculator = new Calculator();

    calculator.push(2);
    calculator.push(3);
    calculator.multiply();

    expect(calculator.result()).toBe(6);
  });

  it('should divide', () => {
    const calculator = new Calculator();

    calculator.push(6);
    calculator.push(3);
    calculator.divide();

    expect(calculator.result()).toBe(2);
  });

  it('should throw error when dividing by zero', () => {
    const calculator = new Calculator();

    calculator.push(6);
    calculator.push(0);

    expect(() => calculator.divide()).toThrow();
  });
});
