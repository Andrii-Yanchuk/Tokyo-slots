export type ReelSymbol = {
  id: string;
  imageSrc: string;
  payoutMultiplier: number;
  jackpot?: number;
};

export const INITIAL_BALANCE = 1000;
export const MIN_BET = 100;
export const SPIN_STEP_MS = 100;
export const REEL_STOP_DELAYS = [1000, 1500, 2000, 2500];
export const SETTLE_DURATION_MS = 520;
export const RESULT_POPUP_TIMINGS = {
  delay: 500,
  visible: 2000,
  exit: 220,
};
export const RESULT_TYPES = {
  win: "win",
  lose: "lose",
} as const;
export type ResultType = (typeof RESULT_TYPES)[keyof typeof RESULT_TYPES];
export const BALANCE_DECOR_IMAGE_SRC = "/reels/sdsssd.png";
export const BALANCE_MOBILE_DECOR = [
  "absolute h-11 w-11 bottom-4 -left-2",
  "absolute h-6 w-6 bottom-15 -left-11 rotate-60",
  "absolute h-16 w-16 bottom-22 -left-18 rotate-90",
  "absolute -z-20 h-6 w-6 bottom-20 left-14 rotate-90",
  "absolute h-5 w-5 bottom-25 right-15 rotate-120",
  "absolute h-9 w-9 bottom-5 right-0 rotate-280",
  "absolute h-9 w-9 bottom-25 -right-13 rotate-160",
];

export const REEL_SYMBOLS: ReelSymbol[] = [
  {
    id: "seven",
    imageSrc: "/reels/7slot.png",
    payoutMultiplier: 100,
    jackpot: 100000,
  },
  {
    id: "cherry",
    imageSrc: "/reels/cheryslot.png",
    payoutMultiplier: 5,
  },
  {
    id: "smile",
    imageSrc: "/reels/eew.png",
    payoutMultiplier: 2,
  },
  {
    id: "lemon",
    imageSrc: "/reels/lemonslot.png",
    payoutMultiplier: 3,
  },
  {
    id: "crown",
    imageSrc: "/reels/Crownslot.png",
    payoutMultiplier: 50,
  },
  {
    id: "crystal",
    imageSrc: "/reels/crystallslot.png",
    payoutMultiplier: 25,
  },
  {
    id: "gem",
    imageSrc: "/reels/sdsssd.png",
    payoutMultiplier: 15,
  },
  {
    id: "mask",
    imageSrc: "/reels/smile.png",
    payoutMultiplier: 10,
  },
];

export const DECOR = [
  {
    left: "3%",
    top: "22%",
    size: "h-8 w-8",
    rotate: "-8deg",
    duration: "4.8s",
    delay: "-1.2s",
    offset: "28px",
  },
  {
    left: "10%",
    top: "72%",
    size: "h-10 w-10",
    rotate: "14deg",
    duration: "5.6s",
    delay: "-2.4s",
    offset: "36px",
  },
  {
    left: "25%",
    top: "86%",
    size: "h-8 w-8",
    rotate: "-20deg",
    duration: "4.4s",
    delay: "-0.8s",
    offset: "24px",
  },
  {
    left: "78%",
    top: "70%",
    size: "h-10 w-10",
    rotate: "-12deg",
    duration: "5.2s",
    delay: "-3.1s",
    offset: "34px",
  },
  {
    left: "93%",
    top: "18%",
    size: "h-6 w-6",
    rotate: "18deg",
    duration: "4.1s",
    delay: "-1.7s",
    offset: "22px",
  },
  {
    left: "97%",
    top: "44%",
    size: "h-8 w-8",
    rotate: "0deg",
    duration: "6.1s",
    delay: "-2.9s",
    offset: "30px",
  },
  {
    left: "84%",
    top: "89%",
    size: "h-9 w-9",
    rotate: "10deg",
    duration: "4.9s",
    delay: "-0.5s",
    offset: "26px",
  },
  {
    left: "22%",
    top: "10%",
    size: "h-11 w-11",
    rotate: "8deg",
    duration: "5.8s",
    delay: "-3.6s",
    offset: "35px",
  },
];
