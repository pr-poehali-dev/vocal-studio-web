import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

const TELEGRAM_USERNAME = "ARTMANANDCO";
const COURSE_PRICE = "1 400 ₽";
const COVER = "https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/48d613fd-8eb1-4cdb-add5-64e4fb9da82c.png";

const MODULES = [
  { icon: "🧠", text: "Нейробиология харизмы и социального восприятия" },
  { icon: "🎙️", text: "Голос как инструмент влияния" },
  { icon: "🤝", text: "Невербальная коммуникация" },
  { icon: "👁️", text: "Управление вниманием аудитории" },
  { icon: "👑", text: "Присутствие, статус и доверие" },
  { icon: "⚡", text: "Поведение в конфликтных и стрессовых ситуациях" },
  { icon: "📋", text: "Практические протоколы для повседневного общения и публичных выступлений" },
];

function openTelegram() {
  const text = encodeURIComponent("Здравствуйте! Хочу купить курс «Харизма 2.0». Подскажите, как оплатить?");
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function CharismaCoursePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0a0a0a" }}>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, transparent 100%)" }}>
        <Link to="/" className="flex items-center gap-2 text-rock-ash hover:text-rock-gold transition-colors font-oswald tracking-widest text-sm uppercase">
          <Icon name="ChevronLeft" size={18} />
          На главную
        </Link>
      </header>

      {/* Hero — полноэкранный с картинкой */}
      <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Картинка */}
        <div className="relative md:w-1/2 flex-shrink-0">
          <img
            src={COVER}
            alt="Харизма 2.0"
            className="w-full h-[60vh] md:h-screen object-cover object-top"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 60%, #0a0a0a 100%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)" }} />
        </div>

        {/* Текст */}
        <div className="relative md:w-1/2 flex flex-col justify-center px-8 md:px-14 py-16 md:py-32 z-10">
          <div className="absolute inset-0 pointer-events-none hidden md:block"
            style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(255,200,0,0.07) 0%, transparent 70%)" }} />

          <p className="section-eyebrow mb-5 relative z-10">Авторский курс · Анна Артман</p>

          <h1 className="leading-none mb-2 uppercase relative z-10"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 0 40px rgba(201,162,39,0.5)",
            }}>
            Харизма
          </h1>
          <h1 className="leading-none mb-8 uppercase relative z-10"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#c9a227",
              textShadow: "0 0 40px rgba(201,162,39,0.6)",
            }}>
            2.0
          </h1>

          <p className="font-cormorant text-rock-light text-xl leading-relaxed mb-6 relative z-10" style={{ opacity: 0.9 }}>
            По развитию личного влияния и коммуникативного присутствия.
          </p>
          <p className="font-cormorant text-rock-ash text-lg leading-relaxed mb-10 relative z-10">
            Курс посвящён механизмам, благодаря которым человек воспринимается как убедительный, уверенный и заслуживающий доверия.
          </p>

          <div className="flex flex-wrap gap-3 mb-10 relative z-10">
            {["Нейронауки", "Голос", "Невербалика", "Влияние"].map((tag) => (
              <span key={tag} className="font-oswald text-xs tracking-widest uppercase px-4 py-2"
                style={{ border: "1px solid rgba(201,162,39,0.4)", color: "rgba(255,210,80,0.9)", background: "rgba(201,162,39,0.08)" }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full self-start relative z-10"
            style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
            <span className="font-oswald text-rock-gold text-2xl tracking-wide">{COURSE_PRICE}</span>
            <span className="text-rock-ash font-cormorant text-lg">— полный доступ навсегда</span>
          </div>

          <div className="relative z-10">
            <button onClick={openTelegram} className="btn-gold flex items-center gap-3 justify-center text-lg px-10 py-4">
              <Icon name="Send" size={20} />
              Купить в Telegram
            </button>
            <p className="mt-4 text-rock-ash font-cormorant text-base" style={{ opacity: 0.6 }}>
              Напишите нам — получите инструкцию по оплате
            </p>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Программа */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4">Программа</p>
            <h2 className="section-title">В <em>программе</em></h2>
          </div>
          <div className="space-y-4">
            {MODULES.map((mod, i) => (
              <div key={i} className="card-rock p-5 flex items-center gap-5">
                <span className="text-2xl flex-shrink-0">{mod.icon}</span>
                <span className="font-cormorant text-rock-light text-xl leading-relaxed">{mod.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Основа курса */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-eyebrow mb-4">Методология</p>
          <h2 className="section-title mb-8">Научная <em>база</em></h2>
          <p className="font-cormorant text-rock-light text-2xl leading-relaxed mb-6" style={{ opacity: 0.9 }}>
            Курс основан на данных психологии общения, нейронаук, исследованиях невербального поведения и многолетней практике работы с голосом и коммуникацией.
          </p>
          <div className="card-rock p-8 mt-10">
            <p className="font-oswald text-rock-gold text-xl tracking-wide uppercase mb-3">Ключевой тезис</p>
            <p className="font-cormorant text-rock-light text-2xl leading-relaxed" style={{ fontStyle: "italic" }}>
              Харизма рассматривается не как врождённое качество, а как совокупность навыков, поддающихся развитию и тренировке.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,162,39,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-xl mx-auto relative z-10">
          <p className="section-eyebrow mb-4">Старт</p>
          <h2 className="section-title mb-4">Харизма — это <em>навык</em></h2>
          <p className="font-cormorant text-rock-ash text-xl leading-relaxed mb-10">
            Его можно изучить. Его можно натренировать.<br />
            Начни прямо сейчас.
          </p>
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full"
            style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
            <span className="font-oswald text-rock-gold text-2xl tracking-wide">{COURSE_PRICE}</span>
            <span className="text-rock-ash font-cormorant text-lg">— доступ навсегда</span>
          </div>
          <div>
            <button onClick={openTelegram} className="btn-gold flex items-center gap-3 justify-center text-lg px-10 py-4 mx-auto">
              <Icon name="Send" size={20} />
              Купить в Telegram
            </button>
            <p className="mt-4 text-rock-ash font-cormorant text-base" style={{ opacity: 0.6 }}>
              @ARTMANANDCO — ответим быстро
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}