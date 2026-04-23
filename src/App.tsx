import "./App.css";
import { useEffect, useState } from "react";
import { useSlotStore } from "./store/useSlotStore";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { Balance } from "./components/Balance";
import { SpinButton } from "./components/SpinButton";
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
    if (!result) {
      return;
    }

    const timeouts = [
      setTimeout(() => {
        setResultModalPhase("visible");
      }, RESULT_POPUP_TIMINGS.delay),
      setTimeout(() => {
        setResultModalPhase("closing");
      }, RESULT_POPUP_TIMINGS.delay + RESULT_POPUP_TIMINGS.visible),
      setTimeout(
        () => {
          setResultModalPhase(null);
          clearResult();
        },
        RESULT_POPUP_TIMINGS.delay +
          RESULT_POPUP_TIMINGS.visible +
          RESULT_POPUP_TIMINGS.exit,
      ),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [clearResult, result]);

  return (
    <div className="relative flex flex-col justify-center h-dvh">
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
        <SpinButton
          spin={spin}
          spinning={spinning}
          bet={bet}
          balance={balance}
        />
      </div>

      <Balance balance={balance} />

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
