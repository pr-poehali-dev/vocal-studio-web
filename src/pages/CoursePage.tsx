import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

const TELEGRAM_USERNAME = "ARTMANANDCO";
const COURSE_PRICE = "3 500 ₽";

const COURSE_CONTENTS = [
  { icon: "📄", label: "PDF-методичка курса", desc: "Полный материал с теорией и упражнениями" },
  { icon: "🎵", label: "Аудио-дорожки", desc: "Практические записи для самостоятельной работы" },
];

const COURSE_BENEFITS = [
  "Понять природу фонического резонанса голоса",
  "Научиться управлять резонаторами тела",
  "Получить упражнения для самостоятельной практики",
  "Убрать зажимы и открыть естественный звук",
];

function openTelegram() {
  const text = encodeURIComponent("Здравствуйте! Хочу купить курс «Фонический резонанс». Подскажите, как оплатить?");
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function CoursePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#1a0f2e" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(10,5,20,0.97) 0%, transparent 100%)" }}>
        <Link to="/" className="flex items-center gap-2 text-rock-ash hover:text-rock-gold transition-colors font-oswald tracking-widest text-sm uppercase">
          <Icon name="ChevronLeft" size={18} />
          На главную
        </Link>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(149,79,255,0.18) 0%, transparent 70%)"
        }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="section-eyebrow mb-6">Онлайн-курс Анны Артман</p>
          <h1 className="leading-tight mb-6 uppercase tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 0 30px rgba(149,79,255,0.8), 0 0 60px rgba(149,79,255,0.4)"
            }}>
            Фонический<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>резонанс</em>
          </h1>
          <p className="font-cormorant text-xl text-rock-light mb-10 leading-relaxed" style={{ opacity: 0.85 }}>
            Авторский курс по управлению резонаторами голоса — для певцов, ораторов и всех, кто хочет открыть силу своего звука
          </p>

          <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full"
            style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
            <span className="font-oswald text-rock-gold text-2xl tracking-wide">{COURSE_PRICE}</span>
            <span className="text-rock-ash font-cormorant text-lg">— полный доступ навсегда</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openTelegram}
              className="btn-gold flex items-center gap-3 justify-center text-lg px-10 py-4"
            >
              <Icon name="Send" size={20} />
              Купить в Telegram
            </button>
          </div>
          <p className="mt-4 text-rock-ash font-cormorant text-base" style={{ opacity: 0.6 }}>
            Напишите нам — и вы получите инструкцию по оплате и доступ к файлам
          </p>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Что входит */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Состав курса</p>
            <h2 className="section-title">Что <em>входит</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {COURSE_CONTENTS.map((item, i) => (
              <div key={i} className="card-rock p-7 flex items-start gap-5">
                <span className="text-4xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-oswald text-rock-light text-lg tracking-wide mb-2">{item.label}</div>
                  <div className="font-cormorant text-rock-ash text-base leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что получишь */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Результат</p>
            <h2 className="section-title">Что ты <em>получишь</em></h2>
          </div>
          <div className="space-y-4">
            {COURSE_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-5 card-rock">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.4)" }}>
                  <Icon name="Check" size={16} className="text-rock-gold" />
                </div>
                <span className="font-cormorant text-rock-light text-lg leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="section-eyebrow mb-6">Готов начать?</p>
          <h2 className="section-title mb-8">Купи <em>сейчас</em></h2>
          <button
            onClick={openTelegram}
            className="btn-gold flex items-center gap-3 justify-center text-xl px-12 py-5 mx-auto"
          >
            <Icon name="Send" size={22} />
            Написать в Telegram
          </button>
          <p className="mt-6 text-rock-ash font-cormorant text-lg" style={{ opacity: 0.7 }}>
            Ответим быстро и пришлём доступ к материалам
          </p>
        </div>
      </section>
    </div>
  );
}
