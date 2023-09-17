type Probability = number;

export class RandomPicker<TargetValue = unknown> {
  private probabilities: [TargetValue, Probability][] = [];

  constructor(probabilities?: [TargetValue, Probability][]) {
    if (probabilities) this.setProbabilities(probabilities);
  }

  setProbabilities(probabilities: [TargetValue, Probability][]) {
    this.probabilities = probabilities;
    this.assertProbabilitiesSumUpToOne();
  }

  pick(): TargetValue {
    this.assertProbabilitiesSumUpToOne();

    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (const [target, probability] of this.probabilities) {
      cumulativeProbability += probability;

      if (randomValue <= cumulativeProbability) {
        return target;
      }
    }

    // This should never happen if the probabilities are correctly set.
    throw new Error('Failed to pick a number based on probabilities.');
  }

  *[Symbol.iterator]() {
    for (const [target] of this.probabilities) {
      yield target;
    }
  }

  private assertProbabilitiesSumUpToOne() {
    if (this.probabilities.length === 0) throw new Error('Probabilities should not be empty.');

    const probabilitySum = this.probabilities.reduce((acc, [, prob]) => acc + prob, 0);
    if (probabilitySum !== 1) {
      throw new Error(`Probabilities should sum up to 1. Sum is ${probabilitySum}.`);
    }
  }
}
