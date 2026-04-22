interface Props {
  spin: () => void;
  spinning: boolean;
  bet: number;
  balance: number;
}

export function SpinButton(props: Props) {
  const { spin, spinning, bet, balance } = props;
  const disabled = spinning || bet > balance;

  return (
    <button
      type="button"
      onClick={spin}
      disabled={disabled}
      className="cursor-pointer group relative mt-30 w-62.5 select-none"
    >
      <img src="/part-1.png" alt="part1" className="mx-auto w-[240px]" />

      <img
        src="/part-3.png"
        alt="part3"
        className={`absolute left-1/2 top-10 w-50 -translate-x-1/2 transition-[clip-path] duration-150 ease-out [clip-path:inset(0px_0px_0px_0px)] group-active:[clip-path:inset(12px_0px_0px_0px)] ${spinning ? "[clip-path:inset(12px_0px_0px_0px)]" : ""}`}
      />

      {/* верх кнопки */}
      <img
        src="/part-2.png"
        alt="part2"
        className={`absolute -top-5 left-1/2 w-48.25 -translate-x-1/2 transition-transform duration-150 ease-out group-active:translate-y-2.5 ${spinning ? "translate-y-2.5" : ""}`}
      />
      <img
        src="/spin.png"
        alt="spin"
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-30 transition-transform duration-150 ease-out group-active:translate-y-2.5 ${spinning ? "translate-y-2.5" : ""}`}
      />

      {/* низ / тінь */}
      <img
        src="/part-4.png"
        alt="part4"
        className="absolute -bottom-6 left-1/2 -z-10 w-61.25 -translate-x-1/2"
      />
    </button>
  );
}
