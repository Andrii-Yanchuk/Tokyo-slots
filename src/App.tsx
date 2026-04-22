import "./App.css";
import { useEffect } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";

function App() {
  const {
    balance,
    bet,
    reels,
    spinning,
    winAmount,
    incrementBet,
    decrementBet,
    spin,
    clearSpinTimers,
  } = useSlotStore();

  useEffect(() => {
    return clearSpinTimers;
  }, [clearSpinTimers]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      {/* Top Label */}
      <div className="zigzag"></div>
      <div className="absolute top-15 left-0 w-full h-20 bg-[url('/label.webp')] bg-no-repeat bg-center bg-contain flex items-center justify-center">
        <p className="text text-[28px]">Tokyo Slots</p>
      </div>

      <div className="relative flex flex-col items-center gap-6 max-w-md w-full">
        <SlotMachine reels={reels} />

        {/* Win display */}
        {winAmount !== null && (
          <div className="text-green-600 font-bold text-xl animate-bounce">
            🎉 WIN: {winAmount.toLocaleString()} 🎉
          </div>
        )}

        {/* Bet Controls */}
        <BetControls
          decrementBet={decrementBet}
          incrementBet={incrementBet}
          bet={bet}
          spinning={spinning}
          balance={balance}
        />

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={spinning || bet > balance}
          className="bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>🎰</span> SPIN
        </button>

        {/* Balance */}
        <div className="text-gray-600 font-medium">
          Balance:{" "}
          <span className="text-amber-600">💰 {balance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
