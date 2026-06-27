import { useEffect, useRef } from "react";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

function WaveVisualizer() {
  const bars = [4, 8, 12, 18, 24, 30, 24, 18, 14, 10, 7, 5, 8, 14, 22, 28, 32, 26, 18, 12, 8, 5, 9, 16, 24];
  return (
    <div className="flex items-end gap-[2px] h-10">
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.06}s`,
            opacity: 0.7 + (i % 3) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function SoundWaveSVG() {
  return (
    <svg viewBox="0 0 400 80" className="w-full opacity-20" preserveAspectRatio="none">
      <path
        d="M0,40 Q20,10 40,40 Q60,70 80,40 Q100,10 120,40 Q140,70 160,40 Q180,10 200,40 Q220,70 240,40 Q260,10 280,40 Q300,70 320,40 Q340,10 360,40 Q380,70 400,40"
        fill="none"
        stroke="#8b1a2a"
        strokeWidth="1.5"
      />
      <path
        d="M0,40 Q20,20 40,40 Q60,60 80,40 Q100,20 120,40 Q140,60 160,40 Q180,20 200,40 Q220,60 240,40 Q260,20 280,40 Q300,60 320,40 Q340,20 360,40 Q380,60 400,40"
        fill="none"
        stroke="#c9a227"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

export { SoundWaveSVG };

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 180;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random(),
      dAlpha: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.7 ? "#a8851e" : Math.random() > 0.5 ? "#8b1a2a" : "#c0c0c8",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.dAlpha;
        if (s.alpha >= 1) { s.alpha = 1; s.dAlpha *= -1; }
        if (s.alpha <= 0) { s.alpha = 0; s.dAlpha *= -1; }
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * 0.85;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

function Equalizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const BAR_COUNT = 80;
    const phases = Array.from({ length: BAR_COUNT }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: BAR_COUNT }, () => 0.015 + Math.random() * 0.025);
    const amps = Array.from({ length: BAR_COUNT }, () => 0.2 + Math.random() * 0.8);
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const barW = w / BAR_COUNT;
      const maxH = h * 0.38;
      const centerY = h * 0.72;

      for (let i = 0; i < BAR_COUNT; i++) {
        phases[i] += speeds[i];
        const wave =
          Math.sin(phases[i]) * 0.5 +
          Math.sin(phases[i] * 1.7 + t * 0.8) * 0.3 +
          Math.sin(phases[i] * 0.5 + t * 1.2) * 0.2;
        const barH = Math.abs(wave) * maxH * amps[i] + 2;
        const x = i * barW + barW * 0.15;
        const bw = barW * 0.7;

        const ratio = i / BAR_COUNT;
        const r = Math.round(139 + (168 - 139) * ratio);
        const g = Math.round(26 + (133 - 26) * ratio);
        const b = Math.round(42 + (30 - 42) * ratio);
        const alpha = 0.18 + Math.abs(wave) * 0.35;

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(x, centerY - barH, bw, barH);
        ctx.fillRect(x, centerY, bw, barH * 0.4);
      }

      t += 0.018;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function HeroAboutSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Фон */}
        <div className="absolute inset-0 bg-[#080808]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 80% at 60% 40%, rgba(122,21,37,0.18) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 70%, rgba(201,168,76,0.07) 0%, transparent 50%)" }} />
        <Equalizer />

        {/* Декоративные линии */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)" }} />
        <div className="absolute top-0 right-0 w-px h-full" style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.2) 30%, rgba(122,21,37,0.3) 70%, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(122,21,37,0.5) 50%, transparent)" }} />

        {/* Угловые акценты */}
        <div className="absolute top-28 left-6 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-rock-gold/40" />
          <div className="absolute top-0 left-0 w-px h-full bg-rock-gold/40" />
        </div>
        <div className="absolute top-28 right-6 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px bg-rock-gold/40" />
          <div className="absolute top-0 right-0 w-px h-full bg-rock-gold/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-16">

          {/* Над-заголовок */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rock-gold/60" />
            <p className="section-eyebrow text-[1.2rem] tracking-[0.35em]">Голосовой тренер</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rock-gold/60" />
          </div>

          <div className="flex items-end gap-8 lg:gap-16">

            {/* Текст */}
            <div className="flex-1 min-w-0">

              <h1 className="animate-fade-in scroll-delay-1 mb-2" style={{
                fontSize: "clamp(4rem, 10vw, 8.5rem)",
                fontFamily: "Cormorant, serif",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 0.9,
                color: "#f0ece4",
                letterSpacing: "-0.02em",
              }}>
                Анна
              </h1>
              <h1 className="animate-fade-in scroll-delay-2 mb-8" style={{
                fontSize: "clamp(4rem, 10vw, 8.5rem)",
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #8a6820 0%, #c9a84c 35%, #f0d878 55%, #c9a84c 75%, #8a6820 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation: "shimmer-gold 5s linear infinite",
              }}>
                АРТМАН
              </h1>

              <div className="flex items-center gap-4 mb-8 animate-fade-in scroll-delay-2">
                <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
                <p className="font-cormorant text-lg italic" style={{ color: "rgba(201,168,76,0.7)" }}>
                  Голос — это не инструмент. Это ты сам.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10 animate-fade-in scroll-delay-3">
                {["Рок & экстрим вокал", "Горловое пение", "Фонопедия", "Муз. психотерапия", "Сонграйтинг"].map((tag) => (
                  <span key={tag} className="font-oswald text-[9px] tracking-[0.25em] uppercase px-3 py-1.5"
                    style={{ border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.6)", background: "rgba(201,168,76,0.04)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-cormorant text-xl leading-relaxed mb-10 max-w-lg animate-fade-in scroll-delay-3"
                style={{ color: "rgba(208,208,220,0.8)" }}>
                Автор методики <em style={{ color: "#c9a84c" }}>"Чем он это сделал"</em>.
                Основатель студии <em style={{ color: "#d0d0dc" }}>«Театр Рока Артман & Ко»</em>.
                Превращаю голос в инструмент — мощный, живой, неповторимый.
              </p>

              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in scroll-delay-4">
                <a href="#courses" className="btn-gold">Мастер-классы</a>
                <a href="#consultation" className="btn-rock">Записаться</a>
              </div>

              {/* Статы */}
              <div className="flex gap-10 animate-fade-in scroll-delay-5">
                {[{ num: "20+", label: "лет" }, { num: "500+", label: "учеников" }, { num: "6", label: "направлений" }].map((s) => (
                  <div key={s.label}>
                    <div className="font-cormorant font-semibold text-3xl text-gradient-gold">{s.num}</div>
                    <div className="font-oswald text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: "rgba(208,208,220,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Фото */}
            <div className="hidden lg:block flex-shrink-0 w-[400px] relative animate-fade-in scroll-delay-2" style={{ marginBottom: "-4rem" }}>
              <div className="absolute -inset-4 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.12) 0%, transparent 70%)" }} />
              <img
                src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/24816572-50fa-4d7b-a522-fb859536e950.jpg"
                alt="Анна Артман"
                className="w-full object-contain relative z-10"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)",
                  filter: "contrast(1.05) brightness(0.95) drop-shadow(0 0 60px rgba(122,21,37,0.4))",
                }}
              />
              {/* Золотая рамка-акцент */}
              <div className="absolute bottom-16 -left-4 w-8 h-8 pointer-events-none z-20">
                <div className="absolute bottom-0 left-0 w-full h-px bg-rock-gold/50" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-rock-gold/50" />
              </div>
              <div className="absolute top-12 -right-4 w-8 h-8 pointer-events-none z-20">
                <div className="absolute top-0 right-0 w-full h-px bg-rock-gold/50" />
                <div className="absolute top-0 right-0 w-px h-full bg-rock-gold/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Скролл-хинт */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in scroll-delay-5">
          <div className="w-px h-10 bg-gradient-to-b from-rock-gold/50 to-transparent" />
          <span className="font-oswald text-[8px] tracking-[0.4em] uppercase" style={{ color: "rgba(201,168,76,0.4)" }}>scroll</span>
        </div>
      </section>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div className="divider-gold" />

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden py-28" style={{ backgroundColor: "#080808" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[600px] h-[600px]" style={{ background: "radial-gradient(circle at 100% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)" }} />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px]" style={{ background: "radial-gradient(circle at 0% 100%, rgba(122,21,37,0.07) 0%, transparent 60%)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-rock-gold/60" />
                <p className="section-eyebrow">Личное дело</p>
              </div>
              <h2 className="section-title mb-10 line-gold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Дорогой <em>друг!</em>
              </h2>
              <div className="space-y-5 font-cormorant text-lg leading-relaxed" style={{ color: "rgba(208,208,220,0.82)" }}>
                <p>🦔 Я Анна Артман — тренер ГОЛОСА И МОЗГА, специалист по всем видам экстремальных техник вокала, горловому и обертональному пению, джазовым стандартам и современному эстрадному вокалу в целом.</p>
                <p>🦔 У меня три профильных высших образования: филологическое, режиссёрское и музыкальное. А также квалификации фонопеда и музыкального психотерапевта.</p>
                <p>🎼 Мной изучены методики CVT, EVT, SLS и BVT, на основе которых я разработала собственную методику <span style={{ color: "#c9a84c" }} className="italic">«Чем он это сделал»</span>.</p>
                <p>🦔 Я не добрый и мягкий педагог! Ругаюсь, бывает крепко! Могу гонять до мокрых трусов. Но стараюсь каждому дать столько, сколько он может взять.</p>
                <p style={{ color: "#c9a84c" }} className="italic font-semibold">
                  НЕ учу петь — учу пользоваться своим аппаратом: механикой и электроникой (головной мозг).
                </p>
                <p>Ваша Артман! ❤️</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-10" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                {[{ num: "20+", label: "лет практики" }, { num: "500+", label: "учеников" }, { num: "6", label: "направлений" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-cormorant text-4xl font-semibold text-gradient-gold mb-1">{stat.num}</div>
                    <div className="font-oswald text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(201,168,76,0.45)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center relative" style={{ margin: "-4rem -2rem" }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)"
              }} />
              <img
                src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/37875366-5357-467d-8608-88ccaf3906ed.JPG"
                alt="Rock & Extreme Vocal Coach"
                className="w-full object-contain relative z-10"
                style={{
                  maxWidth: "120%",
                  filter: "contrast(1.05) sepia(0.1) drop-shadow(0 0 40px rgba(201,168,76,0.15)) drop-shadow(0 0 80px rgba(122,21,37,0.15))",
                  maskImage: "radial-gradient(ellipse 80% 82% at 50% 50%, black 45%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 82% at 50% 50%, black 45%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}