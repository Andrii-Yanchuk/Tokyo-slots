interface SlotMachineProps {
  reels: string[];
}

export function SlotMachine({ reels }: SlotMachineProps) {
  return (
    <div className="flex items-center px-5">
      <div className="relative">
        <img src="/slot-machine.png" alt="slot machine" />
        <div className="absolute top-15 right-10 flex justify-center items-center gap-4 -ml-2">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className="w-14 h-24 rounded-xl flex items-center justify-center text-4xl"
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <div className="cursor-pointer h-20 relative -ml-7">
        <div className="absolute top-0 h-20 w-3 bg-[#0076CC] rounded-r-xs border border-[#341D1A]"></div>
        <div className="absolute top-5 left-3 h-9 w-4 bg-[#0076CC] rounded-r-xs border border-[#341D1A] border-l-0"></div>
        <div className="absolute -top-4 left-4 h-12 w-1.5 bg-[#9CDEFA] rounded-xs border border-[#341D1A] "></div>
        <div className="absolute -top-7 left-2 h-6 w-6 bg-[#EE4AA6] rounded-full border-2 border-[#341D1A] "></div>
      </div>
    </div>
  );
}
