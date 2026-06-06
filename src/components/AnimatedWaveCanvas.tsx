interface AnimatedWaveCanvasProps {
  height?: number;
  className?: string;
}

export default function AnimatedWaveCanvas({ height = 36, className = "" }: AnimatedWaveCanvasProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: `${height}px`,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #6b1020 20%, #8b1a2a 50%, #6b1020 80%, transparent)",
        }}
      />
    </div>
  );
}
