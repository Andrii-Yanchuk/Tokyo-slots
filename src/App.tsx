import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { PAYOUTS, SYMBOLS } from "./data/mockData";

function App() {
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(100);
  const [reels, setReels] = useState(["7", "7", "7", "7"]);
  const [spinning, setSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const spinIntervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const incrementBet = () => {
    if (bet < balance) {
      setBet((prev) => Math.min(prev + 100, balance));
    }
  };

  const decrementBet = () => {
    if (bet > 100) {
      setBet((prev) => Math.max(prev - 100, 100));
    }
  };

  const checkWin = (symbols: string[]) => {
    // Count occurrences of each symbol
    const counts: Record<string, number> = {};
    symbols.forEach((s) => {
      counts[s] = (counts[s] || 0) + 1;
    });

    // Check for wins
    let winnings = 0;

    // Four of a kind - JACKPOT!
    const fourOfAKind = Object.entries(counts).find(([, count]) => count === 4);
    if (fourOfAKind) {
      if (fourOfAKind[0] === "7") {
        // Jackpot win!
        winnings = 100000;
      } else {
        winnings = bet * PAYOUTS[fourOfAKind[0]] * 10;
      }
    }

    // Three of a kind
    const threeOfAKind = Object.entries(counts).find(
      ([, count]) => count === 3,
    );
    if (!fourOfAKind && threeOfAKind) {
      winnings = bet * PAYOUTS[threeOfAKind[0]] * 3;
    }

    // Two pairs or pair
    const pairs = Object.entries(counts).filter(([, count]) => count === 2);
    if (!fourOfAKind && !threeOfAKind) {
      if (pairs.length === 2) {
        winnings = bet * 2;
      } else if (pairs.length === 1) {
        winnings = bet * 0.5;
      }
    }

    if (winnings > 0) {
      setBalance((prev) => prev + winnings);
      setWinAmount(winnings);
    }
  };

  const spin = useCallback(() => {
    if (spinning || bet > balance) return;

    setSpinning(true);
    setWinAmount(null);
    setBalance((prev) => prev - bet);

    // Clear any existing intervals
    spinIntervals.current.forEach(clearInterval);
    spinIntervals.current = [];

    // Start spinning each reel
    const spinDurations = [1000, 1500, 2000, 2500];
    const finalSymbols: string[] = [];

    reels.forEach((_, index) => {
      const interval = setInterval(() => {
        setReels((prev) => {
          const newReels = [...prev];
          newReels[index] = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          return newReels;
        });
      }, 100);

      spinIntervals.current.push(interval);

      // Stop each reel after its duration
      setTimeout(() => {
        clearInterval(interval);
        const finalSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        finalSymbols[index] = finalSymbol;
        setReels((prev) => {
          const newReels = [...prev];
          newReels[index] = finalSymbol;
          return newReels;
        });

        // Check for win after last reel stops
        if (index === 3) {
          setTimeout(() => {
            checkWin(finalSymbols);
            setSpinning(false);
          }, 100);
        }
      }, spinDurations[index]);
    });
  }, [spinning, bet, balance]);

  useEffect(() => {
    return () => {
      spinIntervals.current.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        {/* Title */}
        <div className="bg-orange-400 px-8 py-3 rounded-full shadow-lg">
          <h1 className="text-white font-bold text-xl tracking-wider flex items-center gap-2">
            🎰 TOKYO SLOTS
          </h1>
        </div>

        {/* Slot Machine */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-sky-200 w-full">
          <div className="flex justify-center gap-3">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`w-16 h-20 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-4xl font-bold shadow-inner border-2 border-gray-200 ${
                  spinning ? "animate-pulse" : ""
                } ${symbol === "7" ? SYMBOLS["7"] : ""}`}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>

        {/* Win display */}
        {winAmount !== null && (
          <div className="text-green-600 font-bold text-xl animate-bounce">
            🎉 WIN: {winAmount.toLocaleString()} 🎉
          </div>
        )}

        {/* Bet Controls */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-600 text-sm font-medium tracking-wider">
            PLACE A BET
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={decrementBet}
              disabled={spinning || bet <= 100}
              className="w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              -
            </button>
            <div className="bg-orange-400 px-6 py-2 rounded-full min-w-[140px] text-center">
              <span className="text-white font-bold">
                {bet.toLocaleString()}
              </span>
            </div>
            <button
              onClick={incrementBet}
              disabled={spinning || bet >= balance}
              className="w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={spinning || bet > balance}
          className="bg-orange-400 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>🎰</span> SPIN
        </button>

        {/* Balance */}
        <div className="text-gray-600 font-medium">
          Balance:{" "}
          <span className="text-amber-600">💰 {balance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
