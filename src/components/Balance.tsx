interface BalanceProps {
  balance: number;
}

export function Balance(props: BalanceProps) {
  const { balance } = props;

  return (
    <footer className="relative mt-auto flex h-50 w-full flex-col items-center justify-end md:h-60">
      <div className="hidden md:block absolute bottom-0 w-full h-60 bg-[url('/tokiocity.svg')] bg-size-[100%_100%] bg-repeat sm:bottom-20 lg:h-80 lg::bottom-27 pointer-events-none " />

      <div className="absolute inset-0 bg-[url('/cloud-mob.png')] bg-size-[100%_100%] bg-center bg-no-repeat z-10 md:bg-[url('/cloud-dt.png')] pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-end">
        <p className="text text-4xl text-[#FFC434] -mb-4 z-20">Balance</p>

        <div className="md:hidden">
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-11 w-11 bottom-4 -left-2"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-6 w-6 bottom-15 -left-11 rotate-60"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-16 w-16 bottom-22 -left-18 rotate-90"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute -z-20 h-6 w-6 bottom-20 left-14 rotate-90"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-5 w-5 bottom-25 right-15 rotate-120"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-9 w-9 bottom-5 right-0 rotate-280"
          />
          <img
            src="/reels/sdsssd.png"
            alt="decor image"
            className="absolute h-9 w-9 bottom-25 -right-13 rotate-160"
          />
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
