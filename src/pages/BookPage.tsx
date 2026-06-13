import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BOOK } from "./data";

const TELEGRAM_USERNAME = "ARTMANANDCO";

function openTelegram(format: string) {
  const text = encodeURIComponent(`Здравствуйте! Хочу купить книгу «${BOOK.title}» (${format}). Подскажите, как оплатить?`);
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function BookPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0a0a0a" }}>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, transparent 100%)" }}>
        <Link to="/" className="flex items-center gap-2 text-rock-ash hover:text-rock-gold transition-colors font-oswald tracking-widest text-sm uppercase">
          <Icon name="ChevronLeft" size={18} />
          На главную
        </Link>
      </header>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(201,162,39,0.07)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(196,30,58,0.05)" }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Обложка */}
            <div className="flex justify-center">
              <div className="relative max-w-sm w-full">
                <div className="absolute -inset-6 rounded-sm blur-3xl opacity-30"
                  style={{ background: "linear-gradient(135deg, #c9a227, #c41e3a)" }} />
                <img
                  src={BOOK.cover}
                  alt={BOOK.title}
                  className="relative w-full object-cover shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 60px rgba(201,162,39,0.35))" }}
                />
              </div>
            </div>

            {/* Текст */}
            <div>
              <p className="section-eyebrow mb-4">Книга · Анна Артман</p>
              <h1 className="section-title mb-4"><em>{BOOK.title}</em></h1>
              <p className="font-cormorant text-rock-gold text-xl mb-6 leading-snug">{BOOK.subtitle}</p>
              <p className="font-cormorant text-rock-light text-lg leading-relaxed mb-8" style={{ opacity: 0.85 }}>
                {BOOK.description}
              </p>

              <ul className="space-y-3 mb-10">
                {BOOK.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-rock-gold flex-shrink-0" />
                    <span className="font-cormorant text-rock-light text-lg">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Форматы */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <p className="section-eyebrow mb-3">Форматы</p>
              <h2 className="section-title">Выбери <em>свой</em></h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {BOOK.formats.map((fmt, i) => (
                <div key={i} className="card-rock p-7 flex flex-col gap-5 hover:border-rock-gold/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{fmt.icon}</span>
                    <span className="font-oswald text-[10px] tracking-[0.25em] uppercase text-rock-ash border border-white/10 px-3 py-1">
                      {fmt.type}
                    </span>
                  </div>
                  <p className="font-cormorant text-rock-ash text-base leading-snug flex-1">{fmt.desc}</p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="font-cormorant text-2xl text-gradient-gold mb-4">{fmt.price}</div>
                    <button
                      onClick={() => openTelegram(fmt.type)}
                      className="btn-gold w-full flex items-center justify-center gap-2 text-sm py-3"
                    >
                      <Icon name="Send" size={15} />
                      Купить в Telegram
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}