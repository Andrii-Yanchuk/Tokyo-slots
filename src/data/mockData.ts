export type ReelSymbol = {
  id: string;
  imageSrc: string;
  payoutMultiplier: number;
  jackpot?: number;
};

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
