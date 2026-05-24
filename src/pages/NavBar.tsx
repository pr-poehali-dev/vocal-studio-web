import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden"
        style={{
          background: scrolled
            ? `rgba(5,0,15,0.93)`
            : `linear-gradient(180deg, rgba(5,0,15,0.82) 0%, rgba(5,0,15,0.65) 100%), url('https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/files/663a6c29-9aba-4259-a4d1-73d44777b797.jpg') center top/cover no-repeat`,
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

        <AnimatedWaveCanvas height={36} className="absolute bottom-0 left-0 right-0" />
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