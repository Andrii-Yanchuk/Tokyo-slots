import { create } from "zustand";
import { PAYOUTS, SYMBOLS } from "../data/mockData";

const SPIN_DURATIONS = [1000, 1500, 2000, 2500];
const SPIN_STEP_MS = 100;

let spinInterval: ReturnType<typeof setInterval> | null = null;
let stopTimeouts: ReturnType<typeof setTimeout>[] = [];

type SlotStore = {
  balance: number;
  bet: number;
  reels: string[];
  spinning: boolean;
  winAmount: number | null;
  loseAmount: number | null;
  totalLost: number;
  incrementBet: () => void;
  decrementBet: () => void;
  getWinnings: (symbols: string[]) => number;
  spin: () => void;
  clearSpinTimers: () => void;
  clearResult: () => void;
  setBalance: (value: number | ((prev: number) => number)) => void;
  setBet: (value: number | ((prev: number) => number)) => void;
  setReels: (value: string[] | ((prev: string[]) => string[])) => void;
  setSpinning: (value: boolean) => void;
  setWinAmount: (value: number | null) => void;
  setLoseAmount: (value: number | null) => void;
};

export const useSlotStore = create<SlotStore>((set, get) => ({
  balance: 1000,
  bet: 100,
  reels: ["7", "7", "7", "7"],
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
      if (symbols[index] !== firstSymbol) {
        break;
      }

      matchCount += 1;
    }

    const { bet } = get();

    if (matchCount === 4) {
      return firstSymbol === "7" ? 100000 : bet * PAYOUTS[firstSymbol] * 10;
    }

    if (matchCount === 3) {
      return bet * PAYOUTS[firstSymbol] * 3;
    }

    if (matchCount === 2) {
      return bet * 0.5;
    }

    return 0;
  },
  spin: () => {
    const { balance, bet, reels, getWinnings, clearSpinTimers } = get();

    if (get().spinning || bet > balance) {
      return;
    }

    clearSpinTimers();

    const finalSymbols = [...reels];
    const stoppedReels = Array(reels.length).fill(false);

    set((state) => ({
      balance: state.balance - state.bet,
      spinning: true,
      winAmount: null,
      loseAmount: null,
    }));

    spinInterval = setInterval(() => {
      set((state) => ({
        reels: state.reels.map((symbol, index) =>
          stoppedReels[index]
            ? symbol
            : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ),
      }));
    }, SPIN_STEP_MS);

    stopTimeouts = SPIN_DURATIONS.map((duration, index) =>
      setTimeout(() => {
        const finalSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        finalSymbols[index] = finalSymbol;
        stoppedReels[index] = true;

        set((state) => ({
          reels: state.reels.map((symbol, reelIndex) =>
            reelIndex === index ? finalSymbol : symbol,
          ),
        }));

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
  setSpinning: (value) => set({ spinning: value }),
  setWinAmount: (value) => set({ winAmount: value }),
  setLoseAmount: (value) => set({ loseAmount: value }),
}));
