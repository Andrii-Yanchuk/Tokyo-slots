import { create } from "zustand";
import { REEL_SYMBOLS, type ReelSymbol } from "../data/mockData";

const SPIN_DURATIONS = [1000, 1500, 2000, 2500];
const SPIN_STEP_MS = 100;
const SETTLE_DURATION_MS = 520;

let spinInterval: ReturnType<typeof setInterval> | null = null;
let stopTimeouts: ReturnType<typeof setTimeout>[] = [];
let settleTimeouts: ReturnType<typeof setTimeout>[] = [];

type SlotStore = {
  balance: number;
  bet: number;
  reels: ReelSymbol[];
  spinningReels: boolean[];
  settlingReels: boolean[];
  spinning: boolean;
  winAmount: number | null;
  loseAmount: number | null;
  totalLost: number;
  incrementBet: () => void;
  decrementBet: () => void;
  getWinnings: (symbols: ReelSymbol[]) => number;
  spin: () => void;
  clearSpinTimers: () => void;
  clearResult: () => void;
  setBalance: (value: number | ((prev: number) => number)) => void;
  setBet: (value: number | ((prev: number) => number)) => void;
  setReels: (
    value: ReelSymbol[] | ((prev: ReelSymbol[]) => ReelSymbol[]),
  ) => void;
  setSpinning: (value: boolean) => void;
  setWinAmount: (value: number | null) => void;
  setLoseAmount: (value: number | null) => void;
};

const createBoolArray = (length: number, value: boolean) =>
  Array(length).fill(value);

export const useSlotStore = create<SlotStore>((set, get) => ({
  balance: 1000,
  bet: 100,
  reels: [REEL_SYMBOLS[0], REEL_SYMBOLS[0], REEL_SYMBOLS[0], REEL_SYMBOLS[0]],
  spinningReels: [false, false, false, false],
  settlingReels: [false, false, false, false],
  spinning: false,
  winAmount: null,
  loseAmount: null,
  totalLost: 0,
  incrementBet: () =>
    set((state) => ({
      bet:
        state.bet < state.balance
          ? Math.min(state.bet + 100, state.balance)
          : state.bet,
    })),
  decrementBet: () =>
    set((state) => ({
      bet: state.bet > 100 ? Math.max(state.bet - 100, 100) : state.bet,
    })),
  getWinnings: (symbols) => {
    if (symbols.length === 0) return 0;

    const firstSymbol = symbols[0];
    let matchCount = 1;

    for (let index = 1; index < symbols.length; index += 1) {
      if (symbols[index].id !== firstSymbol.id) {
        break;
      }

      matchCount += 1;
    }

    const { bet } = get();

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
  },
  spin: () => {
    const { balance, bet, reels, getWinnings, clearSpinTimers, spinning } =
      get();

    if (spinning || bet > balance) {
      return;
    }

    clearSpinTimers();

    const finalSymbols = [...reels];
    const stoppedReels = Array(reels.length).fill(false);

    set((state) => ({
      balance: state.balance - state.bet,
      spinning: true,
      spinningReels: [true, true, true, true],
      settlingReels: [false, false, false, false],
      winAmount: null,
      loseAmount: null,
    }));

    spinInterval = setInterval(() => {
      set((state) => ({
        reels: state.reels.map((symbol, index) =>
          stoppedReels[index]
            ? symbol
            : REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
        ),
      }));
    }, SPIN_STEP_MS);

    stopTimeouts = SPIN_DURATIONS.map((duration, index) =>
      setTimeout(() => {
        const finalSymbol =
          REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)];

        finalSymbols[index] = finalSymbol;
        stoppedReels[index] = true;

        set((state) => ({
          reels: state.reels.map((symbol, reelIndex) =>
            reelIndex === index ? finalSymbol : symbol,
          ),
          spinningReels: state.spinningReels.map((isSpinning, reelIndex) =>
            reelIndex === index ? false : isSpinning,
          ),
          settlingReels: state.settlingReels.map((isSettling, reelIndex) =>
            reelIndex === index ? true : isSettling,
          ),
        }));

        const settleTimeout = setTimeout(() => {
          set((state) => ({
            settlingReels: state.settlingReels.map((isSettling, reelIndex) =>
              reelIndex === index ? false : isSettling,
            ),
          }));
        }, SETTLE_DURATION_MS);

        settleTimeouts.push(settleTimeout);

        if (index !== SPIN_DURATIONS.length - 1) {
          return;
        }

        clearSpinTimers();

        const winnings = getWinnings(finalSymbols);
        const loseAmount = Math.max(bet - winnings, 0);

        set((state) => ({
          balance: winnings > 0 ? state.balance + winnings : state.balance,
          spinning: false,
          winAmount: winnings > 0 ? winnings : null,
          loseAmount: loseAmount > 0 ? loseAmount : null,
          totalLost: state.totalLost + loseAmount,
        }));
      }, duration),
    );
  },
  clearSpinTimers: () => {
    if (spinInterval) {
      clearInterval(spinInterval);
      spinInterval = null;
    }

    stopTimeouts.forEach(clearTimeout);
    stopTimeouts = [];

    settleTimeouts.forEach(clearTimeout);
    settleTimeouts = [];
  },
  clearResult: () =>
    set({
      winAmount: null,
      loseAmount: null,
    }),
  setBalance: (value) =>
    set((state) => ({
      balance: typeof value === "function" ? value(state.balance) : value,
    })),
  setBet: (value) =>
    set((state) => ({
      bet: typeof value === "function" ? value(state.bet) : value,
    })),
  setReels: (value) =>
    set((state) => ({
      reels: typeof value === "function" ? value(state.reels) : value,
    })),
  setSpinning: (value) =>
    set((state) => ({
      spinning: value,
      spinningReels: createBoolArray(state.reels.length, value),
      settlingReels: createBoolArray(state.reels.length, false),
    })),
  setWinAmount: (value) => set({ winAmount: value }),
  setLoseAmount: (value) => set({ loseAmount: value }),
}));
