interface BalanceProps {
  balance: number;
}

export function Balance(props: BalanceProps) {
  const { balance } = props;

  return (
    <footer className="relative mt-auto flex h-50 w-full flex-col items-center justify-end md:h-60">
      {/* 🌆 МІСТО (нижче) */}
      <div className="hidden md:block absolute bottom-0 w-full h-60 bg-[url('/tokiocity.svg')] bg-size-[100%_100%] bg-repeat sm:bottom-20 lg:h-80 lg::bottom-27 pointer-events-none " />

      {/* ☁️ ХМАРИ (вище) */}
      <div className="absolute inset-0 bg-[url('/cloud-mob.png')] bg-size-[100%_100%] bg-center bg-no-repeat z-10 md:bg-[url('/cloud-dt.png')] pointer-events-none" />

      {/* 💰 КОНТЕНТ (найвище) */}
      <div className="relative z-20 flex flex-col items-center justify-end">
        <p className="text text-4xl text-[#FFC434]">Balance</p>

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
