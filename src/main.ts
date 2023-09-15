import env from './utils/Env';
import { Calculator } from './Calculator';

console.info('Is development mode:', env.isDevelopment());

const calculator = new Calculator();

calculator.push(2);
calculator.push(3);
calculator.add();

console.log(calculator.result());
