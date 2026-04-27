import "./App.css";
import { useEffect, useState } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { Balance } from "./components/Balance";
import { ResultModal } from "./components/ResultModal";
import { ReelDecor } from "./components/ReelDecor";
import { RESULT_POPUP_TIMINGS } from "./data/mockData";

type ResultModalPhase = "visible" | "closing" | null;

function App() {
  const {
    balance,
    bet,
    reels,
    reelPhases,
    spinning,
    result,
    incrementBet,
    decrementBet,
    spin,
    cleanup,
    clearResult,
  } = useSlotStore();
  const [resultModalPhase, setResultModalPhase] =
    useState<ResultModalPhase>(null);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (!result) return;

    const { delay, visible, exit } = RESULT_POPUP_TIMINGS;

    const timers = [
      setTimeout(() => setResultModalPhase("visible"), delay),

      setTimeout(() => setResultModalPhase("closing"), delay + visible),

      setTimeout(
        () => {
          setResultModalPhase(null);
          clearResult();
        },
        delay + visible + exit,
      ),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [result, clearResult]);

  return (
    <div className="relative flex min-h-227.5 h-dvh flex-col">
      <div className="zigzag"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-12 flex h-20 w-full max-w-93.75 items-center justify-center bg-[url('/label.webp')] bg-contain bg-center bg-no-repeat lg:top-12">
        <p className="text text-[#a5dff7] text-[28px] sm:text-5xl">
          Tokyo Slots
        </p>
      </div>

      <div className="relative flex w-full mt-34 flex-col items-center gap-6 ">
        <SlotMachine
          reels={reels}
          reelPhases={reelPhases}
          spin={spin}
          spinning={spinning}
        />

        <ReelDecor />

        <BetControls
          decrementBet={decrementBet}
          incrementBet={incrementBet}
          bet={bet}
          spinning={spinning}
          balance={balance}
        />
      </div>

      <Balance balance={balance} spin={spin} spinning={spinning} bet={bet} />

      {result && resultModalPhase && (
        <ResultModal
          isClosing={resultModalPhase === "closing"}
          result={result}
        />
      )}
    </div>
  );
}

export default App;
