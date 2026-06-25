import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./data";

interface NavBarProps {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export default function NavBar({ scrolled, menuOpen, setMenuOpen }: NavBarProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(i => i.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled
            ? "rgba(8,8,8,0.96)"
            : "rgba(8,8,8,0.75)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(6px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.6)"
            : "none",
        }}
      >
        {/* Верхняя золотая линия */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)" }} />
        )}

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Лого */}
          <a href="#" className="flex items-center select-none group">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/b94da0ff-312b-4232-bc44-3b8de7c3505c.png"
              alt="Artman"
              className="h-28 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              style={{
                filter: "invert(1) brightness(2) contrast(1.4) sepia(0.4) saturate(2) hue-rotate(5deg) drop-shadow(0 0 16px rgba(201,168,76,0.7))",
                mixBlendMode: "screen",
              }}
            />
          </a>

          {/* Навигация */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative font-oswald text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
                  style={{
                    color: isActive ? "#c9a84c" : "rgba(208,208,220,0.5)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = isActive ? "#c9a84c" : "rgba(208,208,220,0.5)"; }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
                  )}
                </a>
              );
            })}
            <a href="#consultation" className="btn-gold ml-4 text-[9px] py-2.5 px-5">
              Записаться
            </a>
          </div>

          {/* Бургер */}
          <button
            className="lg:hidden transition-all duration-300 p-1"
            style={{ color: "rgba(201,168,76,0.8)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden flex flex-col"
          style={{ background: "rgba(8,8,8,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(122,21,37,0.15) 0%, transparent 60%)" }} />

          <div className="flex items-center justify-between px-6 py-4 relative z-10"
            style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/b94da0ff-312b-4232-bc44-3b8de7c3505c.png"
              alt="Artman" className="h-14 w-auto object-contain" style={{ filter: "invert(1) brightness(1.2) drop-shadow(0 0 8px rgba(201,168,76,0.4))", mixBlendMode: "screen" }}
            />
            <button onClick={() => setMenuOpen(false)} style={{ color: "rgba(201,168,76,0.7)" }}>
              <Icon name="X" size={22} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 gap-1 relative z-10">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="font-cormorant text-2xl italic py-3 transition-all duration-300 hover:pl-4"
                style={{
                  color: "rgba(208,208,220,0.7)",
                  borderBottom: "1px solid rgba(201,168,76,0.06)",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(208,208,220,0.7)"; }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="px-8 pb-10 relative z-10">
            <a href="#consultation" className="btn-gold w-full text-center block py-4" onClick={() => setMenuOpen(false)}>
              Записаться на консультацию
            </a>
          </div>
        </div>
      )}
    </>
  );
}