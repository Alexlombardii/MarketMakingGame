interface KellyResult {
    recommendedAction: 'BUY' | 'SELL' | 'NO_TRADE';
    betSize: number;
    expectedValue: number;
  }
  
  export function calculateKellyPosition(
    buyProbability: number,
    sellProbability: number,
    potentialBuyProfit: number,
    potentialBuyLoss: number,
    potentialSellProfit: number,
    potentialSellLoss: number,
    bankroll: number
  ): KellyResult {
    // First constraint: Must have > 50% chance of winning
    const MIN_WIN_PROBABILITY = 0.5;
    
    // Initialize result
    let result: KellyResult = {
      recommendedAction: 'NO_TRADE',
      betSize: 0,
      expectedValue: 0
    };
  
    // Calculate Kelly fraction for buy
    const buyKelly = calculateKellyFraction(
      buyProbability,
      potentialBuyProfit,
      potentialBuyLoss
    );
  
    // Calculate Kelly fraction for sell
    const sellKelly = calculateKellyFraction(
      sellProbability,
      potentialSellProfit,
      potentialSellLoss
    );
  
    // Compare probabilities and apply constraints
    if (buyProbability > MIN_WIN_PROBABILITY && buyProbability > sellProbability) {
      result = {
        recommendedAction: 'BUY',
        betSize: Math.floor(bankroll * buyKelly),
        expectedValue: buyProbability * potentialBuyProfit - (1 - buyProbability) * potentialBuyLoss
      };
    } else if (sellProbability > MIN_WIN_PROBABILITY && sellProbability > buyProbability) {
      result = {
        recommendedAction: 'SELL',
        betSize: Math.floor(bankroll * sellKelly),
        expectedValue: sellProbability * potentialSellProfit - (1 - sellProbability) * potentialSellLoss
      };
    }
  
    return result;
  }
  
  function calculateKellyFraction(
    winProbability: number,
    potentialProfit: number,
    potentialLoss: number
  ): number {
    // Kelly Formula: f* = (p(b+1) - 1)/b
    // where b = potentialProfit/potentialLoss
    
    if (potentialLoss === 0 || winProbability <= 0) return 0;
    
    const odds = potentialProfit / potentialLoss;
    const kellyFraction = (winProbability * (odds + 1) - 1) / odds;
  
    // Limit the Kelly fraction to be between 0 and 1
    // Often in practice, people use "fractional Kelly" (like half or quarter Kelly)
    return Math.max(0, Math.min(1, kellyFraction)) * 1; // Can adjust end const for fractional Kelly safety
  } 