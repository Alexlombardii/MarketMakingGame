'use client';
import { useState } from 'react';
import { calculateBuyEV, calculateSellEV } from './utils/evCalculations';
import { calculateKellyPosition } from './utils/kellyrisk';

export default function Home() {
  // State for user inputs
  const [inputs, setInputs] = useState({
    startingNumber: 0,
    unseenDice: 0,
    buyPrice: 0,
    sellPrice: 0,
    bankroll: 1000,
  });

  // State for calculation results
  const [results, setResults] = useState<{
    buyEV: any;
    sellEV: any;
    kellyPosition: any;
  } | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Calculate results
  const calculateResults = () => {
    const buyEV = calculateBuyEV(inputs.startingNumber, inputs.unseenDice, inputs.buyPrice);
    const sellEV = calculateSellEV(inputs.startingNumber, inputs.unseenDice, inputs.sellPrice);
    
    const kellyPosition = calculateKellyPosition(
      buyEV.probabilityPositive,
      sellEV.probabilityPositive,
      buyEV.positiveEV,
      Math.abs(buyEV.negativeEV),
      sellEV.positiveEV,
      Math.abs(sellEV.negativeEV),
      inputs.bankroll
    );

    setResults({ buyEV, sellEV, kellyPosition });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dice Market Making Calculator
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Inputs</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Number
              </label>
              <input
                type="number"
                name="startingNumber"
                value={inputs.startingNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unseen Dice
              </label>
              <input
                type="number"
                name="unseenDice"
                value={inputs.unseenDice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buy Price
              </label>
              <input
                type="number"
                name="buyPrice"
                value={inputs.buyPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sell Price
              </label>
              <input
                type="number"
                name="sellPrice"
                value={inputs.sellPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bankroll
              </label>
              <input
                type="number"
                name="bankroll"
                value={inputs.bankroll}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={calculateResults}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Right Side - Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Results</h2>
          {results ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Buy Position Analysis:</h3>
                <p>Total EV: {results.buyEV.totalEV.toFixed(4)}</p>
                <p>Win Probability: {(results.buyEV.probabilityPositive * 100).toFixed(2)}%</p>
                <p>Potential Profit: {results.buyEV.positiveEV.toFixed(4)}</p>
                <p>Potential Loss: {results.buyEV.negativeEV.toFixed(4)}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Sell Position Analysis:</h3>
                <p>Total EV: {results.sellEV.totalEV.toFixed(4)}</p>
                <p>Win Probability: {(results.sellEV.probabilityPositive * 100).toFixed(2)}%</p>
                <p>Potential Profit: {results.sellEV.positiveEV.toFixed(4)}</p>
                <p>Potential Loss: {results.sellEV.negativeEV.toFixed(4)}</p>
              </div>

              <div className="space-y-2 border-t pt-4">
                <h3 className="font-medium">Recommended Position:</h3>
                <p className="text-lg font-semibold text-blue-600">
                  {results.kellyPosition.recommendedAction}
                </p>
                <p>Bet Size: ${results.kellyPosition.betSize.toFixed(2)}</p>
                <p>Expected Value: ${results.kellyPosition.expectedValue.toFixed(4)}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Enter values and click Calculate to see results</p>
          )}
        </div>
      </div>
    </div>
  );
} 