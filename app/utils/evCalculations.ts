import { getDistribution } from './diceCalculations';

interface EVResult {
  totalEV: number;
  positiveEV: number;
  negativeEV: number;
  probabilityPositive: number;
  probabilityNegative: number;
}

export function calculateBuyEV(
  startingNumber: number,
  unseenDice: number,
  buyPrice: number
): EVResult {
  const distribution = getDistribution(unseenDice);
  
  let totalEV = 0;
  let positiveEV = 0;
  let negativeEV = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let totalOutcomes = 0;

  Object.entries(distribution).forEach(([sum, data]) => {
    const sumValue = parseInt(sum);
    const { probability } = data;
    
    const outcomeValue = (startingNumber + sumValue) - buyPrice;
    totalEV += probability * outcomeValue;
    
    // Track positive and negative EVs separately
    if (outcomeValue > 0) {
      positiveEV += probability * outcomeValue;
      positiveCount += data.count;
    } else if (outcomeValue < 0) {
      negativeEV += probability * outcomeValue;
      negativeCount += data.count;
    }
    
    totalOutcomes += data.count;
  });

  return {
    totalEV,
    positiveEV,
    negativeEV,
    probabilityPositive: positiveCount / totalOutcomes,
    probabilityNegative: negativeCount / totalOutcomes
  };
}

export function calculateSellEV(
  startingNumber: number,
  unseenDiceCount: number,
  sellPrice: number
): EVResult {

  const distribution = getDistribution(unseenDiceCount);

  let totalEV = 0;
  let positiveEV = 0;
  let negativeEV = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let totalOutcomes = 0;

  Object.entries(distribution).forEach(([sum, data]) => {
    const sumValue = parseInt(sum);
    const { probability } = data;

    const outcomeValue = sellPrice - (startingNumber + sumValue);
    totalEV += probability * outcomeValue;
    
    if (outcomeValue > 0) {
      positiveEV += probability * outcomeValue;
      positiveCount += data.count;
    } else if (outcomeValue < 0) {
      negativeEV += probability * outcomeValue;
      negativeCount += data.count;
    }
    

    totalOutcomes += data.count;
  });

  return {
    totalEV,
    positiveEV,
    negativeEV,
    probabilityPositive: positiveCount/totalOutcomes,
    probabilityNegative: negativeCount/totalOutcomes
  };
}