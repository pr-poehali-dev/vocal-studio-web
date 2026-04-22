import { useEffect, useRef } from "react";

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
        stroke="#c41e3a"
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
      color: Math.random() > 0.7 ? "#c9a227" : Math.random() > 0.5 ? "#c41e3a" : "#ffffff",
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

export default function HeroAboutSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a0f2e 0%, #2d1a4e 50%, #1a0f2e 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,79,191,0.2) 0%, transparent 60%)" }} />
          <StarField />
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-rock-red/30 to-transparent" />
        <div className="absolute left-0 top-1/3 w-32 h-px bg-gradient-to-r from-transparent to-rock-gold/50" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,79,191,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(100,50,180,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-6 animate-fade-in">Личный сайт вокального коуча Анны Артман</p>

            <h1 className="font-cormorant font-semibold leading-[0.95] mb-6 animate-fade-in scroll-delay-1 glow-lilac-text text-gradient-red"
              style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)" }}>
              Анна Артман
            </h1>

            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in scroll-delay-2">
              {["Фонопед", "Муз. психотерапевт", "Тренер по расщеплению", "Тренер по обертональному звучанию", "Сонграйтер", "Вокальный стилист"].map((tag) => (
                <span key={tag} className="font-oswald text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-white/15 text-rock-ash">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-cormorant text-2xl text-rock-light leading-relaxed mb-10 max-w-xl animate-fade-in scroll-delay-3" style={{ opacity: 0.85 }}>
              Автор методики{" "}
              <em className="text-rock-gold">"Чем он это сделал"</em>.{" "}
              Основатель студии <em className="text-rock-light">«Театр Рока Артман & Ко»</em>.
              Превращаю голос в инструмент — мощный, живой, неповторимый.
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in scroll-delay-4">
              <a href="#courses" className="btn-gold">Смотреть курсы</a>
              <a href="#consultation" className="btn-rock">Записаться на консультацию</a>
            </div>

            <div className="animate-fade-in scroll-delay-5">
              <WaveVisualizer />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <SoundWaveSVG />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-4">О педагоге</p>
              <h2 className="section-title mb-8 line-gold glow-lilac-text">
                Голос — это<br /><em>не дар, а навык</em>
              </h2>
              <div className="space-y-5 text-rock-light font-cormorant text-xl leading-relaxed" style={{ opacity: 0.88 }}>
                <p>
                  «Театр Рока Артман & Ко» — место, где академическая строгость встречается с
                  рок-духом. Работаю на стыке педагогики, фонопедии и музыкальной психотерапии.
                </p>
                <p>
                  Моя авторская методика <span className="text-rock-gold italic">«Чем он это сделал»</span> —
                  разбор вокальных техник рок-легенд с научной точки зрения. Изучаем, как работает
                  голосовой аппарат Роберта Планта, Честера Беннингтона, Бьорк — и повторяем это безопасно.
                </p>
                <p>
                  За 20+ лет практики помогла сотням вокалистов найти свой звук — от новичков,
                  которые боялись петь, до профессионалов на большой сцене.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { num: "20+", label: "лет практики" },
                  { num: "500+", label: "учеников" },
                  { num: "6", label: "направлений" },
                ].map((stat) => (
                  <div key={stat.label} className="border-t border-rock-red/30 pt-4">
                    <div className="font-cormorant text-3xl font-semibold text-gradient-gold">{stat.num}</div>
                    <div className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center" style={{ margin: "-4rem -2rem" }}>
              <img
                src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/24816572-50fa-4d7b-a522-fb859536e950.jpg"
                alt="Rock & Extreme Vocal Coach"
                className="w-full object-contain glow-lilac"
                style={{
                  maxWidth: "120%",
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