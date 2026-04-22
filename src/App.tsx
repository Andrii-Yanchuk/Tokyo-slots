import "./App.css";
import { useEffect } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { Balance } from "./components/Balance";

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
    <div className="relative flex min-h-screen justify-center overflow-hidden p-4">
      <div className="zigzag"></div>
      <div className="absolute left-0 top-15 flex h-20 w-full items-center justify-center bg-[url('/label.webp')] bg-contain bg-center bg-no-repeat">
        <p className="text text-[#a5dff7] text-[28px]">Tokyo Slots</p>
      </div>

      <div className="relative flex w-full max-w-md mt-34 flex-col items-center gap-6 ">
        <SlotMachine reels={reels} />

        {winAmount !== null && (
          <div className="text-green-600 font-bold text-xl animate-bounce">
            WIN: {winAmount.toLocaleString()}
          </div>
        )}

        <BetControls
          decrementBet={decrementBet}
          incrementBet={incrementBet}
          bet={bet}
          spinning={spinning}
          balance={balance}
        />

        <button
          onClick={spin}
          disabled={spinning || bet > balance}
          className="bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>SPIN</span>
        </button>
      </div>

      <Balance balance={balance} />
    </div>
  );
}

export default App;
