import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

function SoundWave() {
  const bars = 28;
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[2px] overflow-hidden" style={{ height: "3px", opacity: 0.6 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: "2px",
            height: "100%",
            background: i % 3 === 0 ? "#ff0055" : i % 3 === 1 ? "#b400ff" : "#ff6ab0",
            animation: `wave-bar ${0.6 + (i % 7) * 0.12}s ease-in-out infinite alternate`,
            animationDelay: `${(i * 0.05) % 0.8}s`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const waves = [
        { color: "rgba(255,0,85,0.55)", speed: 0.022, amp: H * 0.38, freq: 2.2, offset: 0 },
        { color: "rgba(180,0,255,0.45)", speed: 0.016, amp: H * 0.28, freq: 3.1, offset: 1.2 },
        { color: "rgba(255,106,176,0.3)", speed: 0.03, amp: H * 0.2, freq: 4.5, offset: 2.5 },
      ];

      waves.forEach(({ color, speed, amp, freq, offset }) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x++) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * freq + t * speed * 60 + offset) * amp
            + Math.sin((x / W) * Math.PI * (freq * 1.7) + t * speed * 40 + offset + 1) * amp * 0.4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      });

      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 right-0 w-full"
      style={{ height: "36px", pointerEvents: "none" }}
    />
  );
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  return (
    <>
      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.15); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden"
        style={{
          background: scrolled
            ? "rgba(5,0,15,0.93)"
            : "linear-gradient(180deg, rgba(5,0,15,0.95) 0%, rgba(5,0,15,0.7) 100%)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(180,0,255,0.3)" : "1px solid transparent",
          boxShadow: scrolled ? "0 0 40px rgba(180,0,255,0.18), 0 0 10px rgba(255,0,80,0.12)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative" style={{ paddingBottom: "2.2rem" }}>
          <a href="#" className="flex items-center select-none">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/766c35a9-598b-447d-8ef7-d7847646fb48.png"
              alt="Artman"
              className="h-28 w-auto object-contain"
              style={{
                filter: "brightness(1.3) drop-shadow(0 0 12px rgba(255,0,80,0.6)) drop-shadow(0 0 24px rgba(180,0,255,0.4))",
                mixBlendMode: "screen",
              }}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-wide transition-all duration-300"
                style={{
                  color: "rgba(220,200,255,0.85)",
                  textShadow: "0 0 8px rgba(180,0,255,0.4)",
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = "#ff0055";
                  (e.target as HTMLElement).style.textShadow = "0 0 12px rgba(255,0,85,0.8), 0 0 24px rgba(255,0,85,0.4)";
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = "rgba(220,200,255,0.85)";
                  (e.target as HTMLElement).style.textShadow = "0 0 8px rgba(180,0,255,0.4)";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden transition-all duration-300"
            style={{ color: "rgba(220,200,255,0.9)", filter: "drop-shadow(0 0 6px rgba(180,0,255,0.6))" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        <AnimatedWaveCanvas />
      </nav>

      {menuOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-40 md:hidden px-6 flex flex-col gap-5"
          style={{
            background: "rgba(5,0,15,0.97)",
            borderTop: "1px solid rgba(180,0,255,0.3)",
            boxShadow: "0 8px 32px rgba(180,0,255,0.2)",
            paddingTop: "9rem",
            paddingBottom: "1.5rem",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide transition-all duration-300"
              style={{
                color: "rgba(220,200,255,0.85)",
                textShadow: "0 0 8px rgba(180,0,255,0.4)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
