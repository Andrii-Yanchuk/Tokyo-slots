import { MIN_BET } from "../data/mockData";

interface BetControlsProps {
  decrementBet: () => void;
  incrementBet: () => void;
  bet: number;
  spinning: boolean;
  balance: number;
}

export function BetControls({
  decrementBet,
  incrementBet,
  bet,
  spinning,
  balance,
}: BetControlsProps) {
  const canDecrementBet = !spinning && bet > MIN_BET;
  const canIncrementBet = !spinning && bet < balance;

  const handleDecrementBet = () => {
    if (!canDecrementBet) {
      return;
    }

    decrementBet();
  };

  const handleIncrementBet = () => {
    if (!canIncrementBet) {
      return;
    }

    incrementBet();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text text-[#a5dff7] text-lg">PLACE A BET</span>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrementBet}
          disabled={!canDecrementBet}
          className="w-16 h-16 rounded-2xl border-2 border-[#341D1A] bg-[#FEFEFF] text-[#341D1A] text-xl font-bold flex items-center justify-center shadow-[0_6px_0_#515895] transition-all duration-100 active:translate-y-1.5 active:shadow-[0_0px_0_#515895] disabled:opacity-50 disabled:translate-y-1.5 disabled:shadow-[0_0px_0_#515895] cursor-pointer disabled:cursor-not-allowed"
        >
          -
        </button>

        <div className="relative w-47.5 h-14 bg-[url('/bet-place.png')] bg-no-repeat bg-center bg-size-[100%_100%] flex items-center justify-between px-4 md:h-16">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF315F] text-black font-black text-sm border-[5px] border-[#341D1A] shadow-[0_4px_0_#5B5354]">
            T
          </div>

          <span className="text-[20px] leading-none font-black text-white [text-shadow:0_4px_0_#1F1F1F]">
            {bet.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleIncrementBet}
          disabled={!canIncrementBet}
          className="w-16 h-16 rounded-2xl border-2 border-[#341D1A] bg-[#FEFEFF] text-[#341D1A] text-xl font-bold flex items-center justify-center shadow-[0_6px_0_#515895] transition-all duration-100 active:translate-y-1.5 active:shadow-[0_0px_0_#515895] disabled:opacity-50 disabled:translate-y-1.5 disabled:shadow-[0_0px_0_#515895] cursor-pointer disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}
