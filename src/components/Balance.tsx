import {
  BALANCE_DECOR_IMAGE_SRC,
  BALANCE_MOBILE_DECOR,
} from "../data/mockData";
import { SpinButton } from "./SpinButton";

interface BalanceProps {
  balance: number;
  spin: () => void;
  spinning: boolean;
  bet: number;
}

export function Balance({ balance, spin, spinning, bet }: BalanceProps) {
  return (
    <footer className="relative mt-auto flex h-67.5 w-full flex-col items-center justify-end overflow-x-clip">
      {/* місто */}
      <div className="pointer-events-none absolute bottom-0 z-0 h-32 w-full bg-[url('/tokiocity.svg')] bg-[length:140%_100%] bg-bottom md:h-60 md:bg-size-[100%_100%] sm:bottom-25 md:bg-repeat lg:h-80 lg:bottom-22" />

      {/* хмари */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/cloud-mob.png')] bg-[length:100%_100%] bg-no-repeat sm:bg-[url('/cloud-dt.png')]" />

      {/* кнопка */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <SpinButton
          spin={spin}
          spinning={spinning}
          bet={bet}
          balance={balance}
        />
      </div>

      <div className="relative z-30 flex flex-col items-center justify-end">
        <p className="text text-4xl text-[#FFC434] -mb-4 z-20">Balance</p>

        <div className="md:hidden">
          {BALANCE_MOBILE_DECOR.map((className) => (
            <img
              key={className}
              src={BALANCE_DECOR_IMAGE_SRC}
              alt="decor image"
              className={className}
            />
          ))}
        </div>

        <div className="flex h-19 w-62.5 items-center justify-center gap-2 bg-[url('/balance-bg.png')] bg-size-[100%_100%] bg-center bg-no-repeat">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-[5px] border-[#341D1A] bg-[#FF315F] text-sm font-black text-black shadow-[0_4px_0_#201210]">
            T
          </div>

          <span className="text-[20px] leading-none font-black text-white [text-shadow:0_4px_0_#1F1F1F]">
            {balance.toLocaleString()}
          </span>
        </div>
      </div>
    </footer>
  );
}
