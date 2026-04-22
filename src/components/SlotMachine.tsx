interface SlotMachineProps {
  reels: string[];
}

export function SlotMachine({ reels }: SlotMachineProps) {
  return (
    <div className="flex items-center px-5">
      {/* машина як background */}
      <div
        className="
          relative
          w-[300px] h-[260px]   /* підстав свій реальний розмір */
          bg-[url('/slot-machine.png')]
          bg-no-repeat bg-contain bg-center
        "
      >
        {/* символи */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex gap-1">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className="w-14 h-24 flex items-center justify-center text-4xl"
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* ричаг */}
      <div className="cursor-pointer h-20 relative -ml-5">
        <div className="absolute top-0 h-20 w-3 bg-[#0076CC] border border-[#341D1A]" />
        <div className="absolute top-5 left-3 h-9 w-4 bg-[#0076CC] border border-[#341D1A] border-l-0" />
        <div className="absolute -top-4 left-4 h-12 w-1.5 bg-[#9CDEFA] border border-[#341D1A]" />
        <div className="absolute -top-7 left-2 h-6 w-6 bg-[#EE4AA6] rounded-full border-2 border-[#341D1A]" />
      </div>
    </div>
  );
}
