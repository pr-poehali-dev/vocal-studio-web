import { useEffect, useRef } from "react";

interface AnimatedWaveCanvasProps {
  height?: number;
  className?: string;
}

export default function AnimatedWaveCanvas({ height = 36, className = "" }: AnimatedWaveCanvasProps) {
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
        { color: "rgba(255,0,85,0.55)", speed: 0.007, amp: H * 0.38, freq: 2.2, offset: 0 },
        { color: "rgba(180,0,255,0.45)", speed: 0.005, amp: H * 0.28, freq: 3.1, offset: 1.2 },
        { color: "rgba(255,106,176,0.3)", speed: 0.009, amp: H * 0.2, freq: 4.5, offset: 2.5 },
      ];

      waves.forEach(({ color, speed, amp, freq, offset }) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x++) {
          const y =
            H / 2 +
            Math.sin((x / W) * Math.PI * freq + t * speed * 60 + offset) * amp +
            Math.sin((x / W) * Math.PI * (freq * 1.7) + t * speed * 40 + offset + 1) * amp * 0.4;
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
      className={`w-full ${className}`}
      style={{ height: `${height}px`, pointerEvents: "none", display: "block" }}
    />
  );
}
