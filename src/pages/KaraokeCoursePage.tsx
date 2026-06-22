import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

const TELEGRAM_USERNAME = "ARTMANANDCO";
const COURSE_PRICE = "700 ₽";

const FOR_WHOM = [
  "Для тех, кто не готов заниматься с педагогом, но хочет понимать, что происходит с его голосом.",
  "Для тех, кто хочет петь в караоке уверенно, но не планирует брать регулярные уроки вокала.",
  "Если вам не нужен большой вокальный курс, а нужен понятный фундамент — этот мини-курс для вас.",
  "Не хотите становиться вокалистом. Хотите перестать мучиться в караоке.",
  "Не каждый человек хочет заниматься вокалом. Но почти каждый хочет не страдать у микрофона.",
];

const MODULES = [
  {
    num: "01",
    icon: "💨",
    title: "Опора и дыхание",
    desc: "Вы перестанете захлёбываться на середине фразы и поймёте, как распределять воздух в куплете и припеве. Дышите не ключицами — а диафрагмой.",
  },
  {
    num: "02",
    icon: "🔊",
    title: "Резонаторы, интонация, форманта",
    desc: "Разберётесь, почему голос звучит то плоско, то звонко. Научитесь понимать, как сделать звук ярче и направленнее.",
  },
  {
    num: "03",
    icon: "🎭",
    title: "Сценический аппарат",
    desc: "Микрофон, корпус, артикуляция — как они влияют на звук. И почему пауза перед началом — это не артистизм, а снятие лишнего напряжения с гортани.",
  },
];

const PROBLEMS = [
  { icon: "📉", title: "Срывается голос на высоких нотах", desc: "потому что вы включаете фальцетный механизм без подготовки и зажимаете гортань" },
  { icon: "😮‍💨", title: "Не хватает дыхания на фразу", desc: "потому что вы дышите ключично, а не диафрагмой" },
  { icon: "🎵", title: "Фальшивите на переходах", desc: "потому что ваш интонационный слух не тренирован на движение, а только на статику" },
  { icon: "🧍", title: "Стоите столбом", desc: "потому что голосовой аппарат и тело — единая система, и статика создаёт зажим корпуса" },
];

const RESULTS = [
  "Попадать в ноты чаще",
  "Не задыхаться на фразах",
  "Не срывать голос к концу вечера",
  "Понимать, что происходит с голосом в микрофон",
];

function openTelegram() {
  const text = encodeURIComponent("Здравствуйте! Хочу купить мини-курс «База вокала для караоке». Подскажите, как оплатить?");
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function KaraokeCoursePage() {
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

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,200,0,0.12) 0%, transparent 70%)"
        }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="section-eyebrow mb-5">Мини-курс · Анна Артман</p>

          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/d7ff4c41-f89b-4ad0-af27-bb95a2fd677f.png"
              alt="База вокала для караоке"
              className="w-full max-w-xl rounded-xl"
              style={{ filter: "drop-shadow(0 8px 40px rgba(201,162,39,0.35))" }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Опора", "Дыхание", "Резонанс", "Сцена"].map((tag) => (
              <span key={tag} className="font-oswald text-xs tracking-widest uppercase px-4 py-2"
                style={{ border: "1px solid rgba(201,162,39,0.4)", color: "rgba(255,210,80,0.9)", background: "rgba(201,162,39,0.08)" }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full"
            style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
            <span className="font-oswald text-rock-gold text-2xl tracking-wide">{COURSE_PRICE}</span>
            <span className="text-rock-ash font-cormorant text-lg">— полный доступ навсегда</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openTelegram} className="btn-gold flex items-center gap-3 justify-center text-lg px-10 py-4">
              <Icon name="Send" size={20} />
              Купить в Telegram
            </button>
          </div>
          <p className="mt-4 text-rock-ash font-cormorant text-base" style={{ opacity: 0.6 }}>
            Напишите нам — получите инструкцию по оплате и доступ к материалам
          </p>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Почему в караоке не всё идёт гладко */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Проблема</p>
            <h2 className="section-title">Почему в караоке <em>не всё идёт гладко?</em></h2>
          </div>
          <div className="space-y-4">
            {PROBLEMS.map((item, i) => (
              <div key={i} className="card-rock p-6 flex gap-5 items-start">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-oswald text-rock-light tracking-wide text-base uppercase mb-1">{item.title}</h3>
                  <p className="font-cormorant text-rock-ash text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Для кого */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Аудитория</p>
            <h2 className="section-title">Для <em>кого</em> этот курс</h2>
          </div>
          <div className="space-y-4">
            {FOR_WHOM.map((item, i) => (
              <div key={i} className="card-rock p-5 flex items-center gap-4">
                <span className="text-rock-gold font-oswald text-sm flex-shrink-0">0{i + 1}</span>
                <span className="font-cormorant text-rock-light text-xl leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Программа */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4">Программа</p>
            <h2 className="section-title">3 базовых <em>навыка</em></h2>
            <p className="font-cormorant text-rock-ash text-xl mt-4 max-w-xl mx-auto">
              Которые педагоги вокала ставят в первую очередь
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {MODULES.map((mod, i) => (
              <div key={i} className="card-rock p-7 group hover:border-rock-gold/20 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-oswald text-4xl text-rock-gold/20 leading-none tracking-tighter">{mod.num}</span>
                  <span className="text-3xl">{mod.icon}</span>
                </div>
                <h3 className="font-oswald text-base tracking-wide text-rock-light mb-3 group-hover:text-rock-gold transition-colors uppercase">
                  {mod.title}
                </h3>
                <p className="font-cormorant text-rock-ash text-base leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Результаты */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Результат</p>
            <h2 className="section-title">После курса вы <em>сможете</em></h2>
          </div>
          <div className="space-y-3">
            {RESULTS.map((r, i) => (
              <div key={i} className="card-rock p-5 flex items-center gap-4">
                <Icon name="Check" size={18} className="text-rock-gold flex-shrink-0" />
                <span className="font-cormorant text-rock-light text-xl leading-snug">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,162,39,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-xl mx-auto relative z-10">
          <p className="section-eyebrow mb-4">Старт</p>
          <h2 className="section-title mb-4">Начни петь <em>уверенно</em></h2>
          <p className="font-cormorant text-rock-ash text-xl leading-relaxed mb-10">
            Не каждый человек хочет заниматься вокалом.<br />
            Но почти каждый хочет не страдать у микрофона.
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