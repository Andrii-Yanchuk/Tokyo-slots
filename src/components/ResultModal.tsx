interface Props {
  loseAmount: number | null;
  winAmount: number | null;
}

export function ResultModal({ loseAmount, winAmount }: Props) {
  const isWin = winAmount !== null;
  const amount = winAmount ?? loseAmount;

  if (amount === null) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden px-4 ${
        isWin ? "bg-[rgba(92,190,255,0.8)]" : "bg-[rgba(186,86,43,0.8)]"
      }`}
    >
      {isWin && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="sunburst opacity-40" />
        </div>
      )}

      <div className="w-300 h-150 flex items-center justify-center">
        <div
          className={`relative h-35 w-75 bg-no-repeat bg-center bg-size-[100%_100%] ${
            isWin ? "bg-[url('/popup.svg')]" : "bg-[url('/popup-lose.svg')]"
          }`}
        >
          {isWin && (
            <img
              src="/smile.png"
              alt="smile"
              className="absolute right-8 top-2 size-15"
            />
          )}

          <p
            className={`text text-3xl absolute ${
              isWin
                ? "left-8 top-4 -rotate-12 text-[#a5dff7]"
                : "left-4 top-0 rotate-10 text-white"
            }`}
          >
            {isWin ? (
              "YOU WIN!!!"
            ) : (
              <>
                YOU<span className="text-red-500">LOSE</span>
              </>
            )}
          </p>

          <div className="absolute top-18 left-1/2 flex w-37.5 -translate-x-1/2 items-center justify-between">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-[5px] border-[#341D1A] bg-[#FF315F] text-sm font-black text-black shadow-[0_4px_0_#5B5354]">
              T
            </div>

            <span
              className={`text-[20px] leading-none font-black ${
                isWin ? "text-black" : "text-red-500"
              }`}
            >
              {isWin ? "+" : "-"}
              {amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
