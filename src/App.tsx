import "./App.css";
import { useEffect, useState } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { Balance } from "./components/Balance";
import { SpinButton } from "./components/SpinButton";
import { ResultModal } from "./components/ResultModal";

const RESULT_POPUP_DELAY_MS = 500;
const RESULT_POPUP_VISIBLE_MS = 2000;

function App() {
  const {
    balance,
    bet,
    reels,
    spinningReels,
    settlingReels,
    spinning,
    winAmount,
    loseAmount,
    incrementBet,
    decrementBet,
    spin,
    clearSpinTimers,
    clearResult,
  } = useSlotStore();
  const [showResultModal, setShowResultModal] = useState(false);
  const isResultModalOpen = winAmount !== null || loseAmount !== null;

  useEffect(() => {
    return clearSpinTimers;
  }, [clearSpinTimers]);

  useEffect(() => {
    if (!isResultModalOpen) {
      const timer = setTimeout(() => {
        setShowResultModal(false);
      }, 0);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setShowResultModal(true);
    }, RESULT_POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isResultModalOpen]);

  useEffect(() => {
    if (!showResultModal) {
      return;
    }

    const timer = setTimeout(() => {
      clearResult();
    }, RESULT_POPUP_VISIBLE_MS);

    return () => clearTimeout(timer);
  }, [clearResult, showResultModal]);

  return (
    <div className="relative flex flex-col justify-center">
      <div className="zigzag"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-12 flex h-20 w-full max-w-93.75 items-center justify-center bg-[url('/label.webp')] bg-contain bg-center bg-no-repeat lg:top-12">
        <p className="text text-[#a5dff7] text-[28px] sm:text-5xl">
          Tokyo Slots
        </p>
      </div>

      <div className="relative flex w-full mt-34 flex-col items-center gap-6 ">
        <SlotMachine
          reels={reels}
          spinningReels={spinningReels}
          settlingReels={settlingReels}
          spin={spin}
          spinning={spinning}
        />

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

      {showResultModal && isResultModalOpen && (
        <ResultModal winAmount={winAmount} loseAmount={loseAmount} />
      )}
    </div>
  );
}

export default App;
