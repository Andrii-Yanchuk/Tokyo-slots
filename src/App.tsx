import "./App.css";
import { useEffect } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";

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
      <div className="absolute top-17">
        <img
          src="/public/label.webp"
          alt="label"
          className="w-[228px] h-[46px] relative"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text">
          Tokyo Slots
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6 max-w-md w-full">
        {/* Slot Machine */}
        <SlotMachine reels={reels} />

        {/* Win display */}
        {winAmount !== null && (
          <div className="text-green-600 font-bold text-xl animate-bounce">
            🎉 WIN: {winAmount.toLocaleString()} 🎉
          </div>
        )}

        {/* Bet Controls */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-600 text-sm font-medium tracking-wider">
            PLACE A BET
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={decrementBet}
              disabled={spinning || bet <= 100}
              className="w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              -
            </button>
            <div className="bg-orange-400 px-6 py-2 rounded-full min-w-35 text-center">
              <span className="text-white font-bold">
                {bet.toLocaleString()}
              </span>
            </div>
            <button
              onClick={incrementBet}
              disabled={spinning || bet >= balance}
              className="w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

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
