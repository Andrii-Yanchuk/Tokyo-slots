import "./App.css";
import { useEffect } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { Balance } from "./components/Balance";
import { SpinButton } from "./components/SpinButton";
import { ResultModal } from "./components/ResultModal";

function App() {
  const {
    balance,
    bet,
    reels,
    spinning,
    winAmount,
    loseAmount,
    incrementBet,
    decrementBet,
    spin,
    clearSpinTimers,
    clearResult,
  } = useSlotStore();
  const isResultModalOpen = winAmount !== null || loseAmount !== null;

  useEffect(() => {
    return clearSpinTimers;
  }, [clearSpinTimers]);

  useEffect(() => {
    if (!isResultModalOpen) {
      return;
    }

    const timer = setTimeout(() => {
      clearResult();
    }, 2000);

    return () => clearTimeout(timer);
  }, [clearResult, isResultModalOpen]);

  return (
    <div className="relative flex min-h-screen justify-center overflow-hidden p-4">
      <div className="zigzag"></div>
      <div className="absolute left-0 top-15 flex h-20 w-full items-center justify-center bg-[url('/label.webp')] bg-contain bg-center bg-no-repeat">
        <p className="text text-[#a5dff7] text-[28px]">Tokyo Slots</p>
      </div>

      <div className="relative flex w-full max-w-md mt-34 flex-col items-center gap-6 ">
        <SlotMachine reels={reels} />

        <BetControls
          decrementBet={decrementBet}
          incrementBet={incrementBet}
          bet={bet}
          spinning={spinning}
          balance={balance}
        />
        <SpinButton
          spin={spin}
          spinning={spinning}
          bet={bet}
          balance={balance}
        />
      </div>

      <Balance balance={balance} />

      {isResultModalOpen && (
        <ResultModal winAmount={winAmount} loseAmount={loseAmount} />
      )}
    </div>
  );
}

export default App;
