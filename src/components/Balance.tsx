interface BalanceProps {
  balance: number;
}

export function Balance(props: BalanceProps) {
  const { balance } = props;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-67.5 bg-[url('/cloud-mob.png')] bg-no-repeat bg-center bg-size-[100%_100%]">
      <p className="z-10 absolute left-1/2 -translate-x-1/2 bottom-14 text text-[#FFC434] text-4xl">
        Balance
      </p>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-19 w-62.5 bg-[url('/balance-bg.png')] bg-no-repeat bg-center bg-size-[100%_100%] flex items-center justify-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF315F] text-black font-black text-sm border-[5px] border-[#341D1A] shadow-[0_4px_0_#201210]">
          T
        </div>
        <span className="text-[20px] leading-none font-black text-white [text-shadow:0_4px_0_#1F1F1F]">
          {balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
