import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  INITIAL_BALANCE,
  MIN_BET,
  REEL_PHASES,
  RESULT_TYPES,
  REEL_STOP_DELAYS,
  REEL_SYMBOLS,
  SETTLE_DURATION_MS,
  SPIN_STEP_MS,
  type ReelPhase,
  type ResultType,
  type ReelSymbol,
} from "../data/mockData";

type SpinResult = { type: ResultType; amount: number } | null;

type SlotStore = {
  balance: number;
  bet: number;
  reels: ReelSymbol[];
  reelPhases: ReelPhase[];
  spinning: boolean;
  result: SpinResult;
  totalLost: number;
  incrementBet: () => void;
  decrementBet: () => void;
  spin: () => void;
  clearResult: () => void;
  cleanup: () => void;
};

const createReelPhases = (phase: ReelPhase = REEL_PHASES.idle) =>
  Array(REEL_STOP_DELAYS.length).fill(phase) as ReelPhase[];

const randomSymbol = () =>
  REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)];

const getWinnings = (bet: number, symbols: ReelSymbol[]) => {
  if (symbols.length === 0) {
    return 0;
  }

  const firstSymbol = symbols[0];
  let matchCount = 1;

  for (let index = 1; index < symbols.length; index += 1) {
    if (symbols[index].id !== firstSymbol.id) {
      break;
    }

    matchCount += 1;
  }

  if (matchCount === 4) {
    return firstSymbol.jackpot ?? bet * firstSymbol.payoutMultiplier * 10;
  }

  if (matchCount === 3) {
    return bet * firstSymbol.payoutMultiplier * 3;
  }

  if (matchCount === 2) {
    return bet * 0.5;
  }

  return 0;
};

let spinInterval: ReturnType<typeof setInterval> | null = null;
let stopTimeouts: ReturnType<typeof setTimeout>[] = [];
let settleTimeouts: ReturnType<typeof setTimeout>[] = [];

const clearSpinTimers = () => {
  if (spinInterval) {
    clearInterval(spinInterval);
    spinInterval = null;
  }

  stopTimeouts.forEach(clearTimeout);
  settleTimeouts.forEach(clearTimeout);
  stopTimeouts = [];
  settleTimeouts = [];
};

export const useSlotStore = create<SlotStore>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      bet: MIN_BET,
      reels: Array.from(
        { length: REEL_STOP_DELAYS.length },
        () => REEL_SYMBOLS[0],
      ),
      reelPhases: createReelPhases(),
      spinning: false,
      result: null,
      totalLost: 0,
      incrementBet: () =>
        set((state) => ({
          bet:
            state.bet < state.balance
              ? Math.min(state.bet + MIN_BET, state.balance)
              : state.bet,
        })),
      decrementBet: () =>
        set((state) => ({
          bet:
            state.bet > MIN_BET
              ? Math.max(state.bet - MIN_BET, MIN_BET)
              : state.bet,
        })),
      spin: () => {
        const { balance, bet, reels, spinning } = get();

        if (spinning || bet > balance) {
          return;
        }

        clearSpinTimers();

        const finalReels = [...reels];
        const stoppedReels = Array(reels.length).fill(false);

        set((state) => ({
          balance: state.balance - state.bet,
          spinning: true,
          reelPhases: createReelPhases(REEL_PHASES.spinning),
          result: null,
        }));

        spinInterval = setInterval(() => {
          set((state) => ({
            reels: state.reels.map((symbol, index) =>
              stoppedReels[index] ? symbol : randomSymbol(),
            ),
          }));
        }, SPIN_STEP_MS);

        stopTimeouts = REEL_STOP_DELAYS.map((delay, index) =>
          setTimeout(() => {
            const finalSymbol = randomSymbol();
            finalReels[index] = finalSymbol;
            stoppedReels[index] = true;

            set((state) => ({
              reels: state.reels.map((symbol, reelIndex) =>
                reelIndex === index ? finalSymbol : symbol,
              ),
              reelPhases: state.reelPhases.map((phase, reelIndex) =>
                reelIndex === index ? REEL_PHASES.settling : phase,
              ),
            }));

            settleTimeouts.push(
              setTimeout(() => {
                set((state) => ({
                  reelPhases: state.reelPhases.map((phase, reelIndex) =>
                    reelIndex === index ? REEL_PHASES.idle : phase,
                  ),
                }));
              }, SETTLE_DURATION_MS),
            );

            if (index !== REEL_STOP_DELAYS.length - 1) {
              return;
            }

            if (spinInterval) {
              clearInterval(spinInterval);
              spinInterval = null;
            }

            const winnings = getWinnings(bet, finalReels);
            const lostAmount = Math.max(bet - winnings, 0);

            set((state) => ({
              balance: winnings > 0 ? state.balance + winnings : state.balance,
              spinning: false,
              result:
                winnings > 0
                  ? { type: RESULT_TYPES.win, amount: winnings }
                  : lostAmount > 0
                    ? { type: RESULT_TYPES.lose, amount: lostAmount }
                    : null,
              totalLost: state.totalLost + lostAmount,
            }));
          }, delay),
        );
      },
      clearResult: () => set({ result: null }),
      cleanup: clearSpinTimers,
    }),
    {
      name: "tokyo-slots",
      partialize: (state) => ({ balance: state.balance }),
    },
  ),
);
