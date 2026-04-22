interface SlotMachineProps {
  reels: string[];
  spin: () => void;
  spinning: boolean;
}

export function SlotMachine(props: SlotMachineProps) {
  const { reels, spin, spinning } = props;

  const rodHeight = spinning ? 0 : 48;
  return (
    <div className="flex items-center">
      <div className=" relative w-75 h-65 bg-[url('/slot-machine.png')] bg-no-repeat bg-contain bg-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-1">
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

      <div
        className={`
          cursor-pointer relative h-20 w-10 -ml-5
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
