import type { CSSProperties } from "react";
import { REEL_SYMBOLS, DECOR } from "../data/mockData";

export function ReelDecor() {
  return (
    <section className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      {REEL_SYMBOLS.map((symbol, index) => {
        const layout = DECOR[index];
        const style: CSSProperties & {
          "--float-offset": string;
          "--float-rotate": string;
        } = {
          left: layout.left,
          top: layout.top,
          transform: `rotate(${layout.rotate})`,
          animation: `decor-float ${layout.duration} ease-in-out infinite`,
          animationDelay: layout.delay,
          "--float-offset": layout.offset,
          "--float-rotate": layout.rotate,
        };

        return (
          <img
            key={symbol.id}
            src={symbol.imageSrc}
            alt={symbol.id}
            draggable={false}
            className={`absolute object-contain opacity-95 drop-shadow-[0_3px_0_rgba(52,29,26,0.18)] ${layout.size}`}
            style={style}
          />
        );
      })}
    </section>
  );
}
