import { REEL_SYMBOLS, type ReelSymbol } from "../data/mockData";

interface SlotMachineProps {
  reels: ReelSymbol[];
  spinningReels: boolean[];
  settlingReels: boolean[];
  spin: () => void;
  spinning: boolean;
}

function ReelSymbolImage({ symbol }: { symbol: ReelSymbol }) {
  return (
    <img
      className="h-10 w-10 object-contain select-none pointer-events-none md:w-15 md:h-15"
      src={symbol.imageSrc}
      alt=""
      draggable={false}
    />
  );
}

export function SlotMachine(props: SlotMachineProps) {
  const { reels, spinningReels, settlingReels, spin, spinning } = props;

  const rodHeight = spinning ? 0 : 48;

  return (
    <div className="flex items-center">
      <div className=" relative w-75 h-65 bg-[url('/slot-machine.png')] bg-no-repeat bg-contain bg-center md:w-120.5">
        <div className="absolute top-22 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 md:top-18">
          {reels.map((symbol, index) => (
            <div
              key={`${symbol.id}-${index}`}
              className="relative flex h-21 w-14 items-center justify-center overflow-hidden md:w-19 md:h-30"
            >
              {spinningReels[index] ? (
                <div
                  className="absolute inset-x-0 top-0 w-full animate-[slot-reel-spin_280ms_linear_infinite] [filter:blur(0.8px)] [will-change:transform,filter]"
                  style={{
                    animationDelay: `${index * -80}ms`,
                    animationDuration: `${260 + index * 25}ms`,
                  }}
                >
                  {REEL_SYMBOLS.map((stripSymbol, symbolIndex) => (
                    <div
                      key={`${stripSymbol.id}-${symbolIndex}`}
                      className="flex h-21 w-full items-center justify-center leading-none md:h-30"
                    >
                      <ReelSymbolImage symbol={stripSymbol} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex h-21 w-full items-center justify-center leading-none md:h-30 ${
                    settlingReels[index]
                      ? "animate-[slot-reel-bounce_520ms_cubic-bezier(0.18,0.9,0.24,1.2)] [transform-origin:center_bottom]"
                      : ""
                  }`}
                  style={{
                    animationDuration: `${480 + index * 35}ms`,
                  }}
                >
                  <ReelSymbolImage symbol={symbol} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`
          cursor-pointer relative h-20 w-10 -ml-5 md:-ml-14
        `}
        onClick={spin}
      >
        <div className="absolute top-0 h-20 w-3 bg-[#0076CC] border border-[#341D1A]" />
        <div className="absolute top-5 left-3 h-9 w-4 bg-[#0076CC] border border-[#341D1A] border-l-0" />
        <div className="absolute left-4 top-8">
          <div
            className="absolute left-0 w-1.5 bg-[#9CDEFA] border border-[#341D1A] origin-bottom transition-all duration-200"
            style={{
              height: `${rodHeight}px`,
              bottom: 0,
            }}
          />

          <div
            className="absolute h-6 w-6 rounded-full bg-[#EE4AA6] border-2 border-[#341D1A] transition-all duration-200"
            style={{
              left: "-8px",
              bottom: `${rodHeight - 8}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
