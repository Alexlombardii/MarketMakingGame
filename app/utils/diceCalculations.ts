interface ProbabilityDistribution {
  [sum: number]: {
    probability: number;
    count: number;
  }
}

// Pre-calculated distributions for 1-3 dice
export const ONE_DIE_DISTRIBUTION: ProbabilityDistribution = {
  1: { count: 1, probability: 1/6 },
  2: { count: 1, probability: 1/6 },
  3: { count: 1, probability: 1/6 },
  4: { count: 1, probability: 1/6 },
  5: { count: 1, probability: 1/6 },
  6: { count: 1, probability: 1/6 }
};

export const TWO_DICE_DISTRIBUTION: ProbabilityDistribution = calculateDiceProbabilities(2);
export const THREE_DICE_DISTRIBUTION: ProbabilityDistribution = calculateDiceProbabilities(3);

// Helper function to calculate distributions (kept private)
function calculateDiceProbabilities(numDice: number): ProbabilityDistribution {
  const distribution: ProbabilityDistribution = {};
  const totalPossibilities = Math.pow(6, numDice);

  function addCombination(currentSum: number, remainingDice: number): void {
    if (remainingDice === 0) {
      if (!distribution[currentSum]) {
        distribution[currentSum] = { count: 0, probability: 0 };
      }
      distribution[currentSum].count++;
      return;
    }

    for (let value = 1; value <= 6; value++) {
      addCombination(currentSum + value, remainingDice - 1);
    }
  }

  addCombination(0, numDice);

  for (const sum in distribution) {
    distribution[sum].probability = distribution[sum].count / totalPossibilities;
  }

  return distribution;
}

export function getDistribution(numDice: number): ProbabilityDistribution {
  switch(numDice) {
    case 1:
      return ONE_DIE_DISTRIBUTION;
    case 2:
      return TWO_DICE_DISTRIBUTION;
    case 3:
      return THREE_DICE_DISTRIBUTION;
    default:
      throw new Error('Only 1-3 dice are supported');
  }
}