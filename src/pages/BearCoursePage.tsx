import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

const TELEGRAM_USERNAME = "ARTMANANDCO";
const COURSE_PRICE = "2 000 ₽";
const COVER = "https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/0d534d16-7a07-4977-a138-65a0a1934a91.png";

const PROGRAM = [
  {
    num: "01",
    icon: "🔍",
    title: "Диагностика — почему вы мимо",
    desc: "Разбираемся, что именно происходит в вашем случае. Тест слуха, самодиагностика интонирования, анализ типичных ошибок. Вы точно поймёте свою причину промаха.",
  },
  {
    num: "02",
    icon: "🧠",
    title: "Причины и коррекция",
    desc: "Слух, мозг, координация голоса — что именно мешает попадать в ноты. Разбираем каждую причину и даём конкретный инструмент коррекции под неё.",
  },
  {
    num: "03",
    icon: "🎯",
    title: "Блоки упражнений",
    desc: "Практические блоки для тренировки слуха, координации и голоса. Упражнения подобраны по принципу «от простого к точному» — каждый шаг ощутим.",
  },
  {
    num: "04",
    icon: "📅",
    title: "Готовый кейс на 21 день",
    desc: "Расписанный план домашней работы на 3 недели. Каждый день — конкретное задание. Без воды, без лишнего. 15–20 минут в день — и результат виден.",
  },
];

const RESULTS = [
  "Поймёте свою конкретную причину фальши",
  "Начнёте слышать себя со стороны иначе",
  "Получите рабочие упражнения, а не теорию",
  "Пройдёте 21-дневный план и услышите прогресс",
  "Перестанете бояться петь в присутствии других",
];

const FOR_WHOM = [
  { icon: "😬", text: "Вам говорят «медведь на ухо» — и вы в это верите" },
  { icon: "🎵", text: "Вы слышите, что поёте мимо, но не понимаете почему" },
  { icon: "🚿", text: "Поёте только в душе — боитесь петь при людях" },
  { icon: "🎸", text: "Хотите петь в группе, на вечеринке или просто для себя" },
  { icon: "📱", text: "Занятость не позволяет долгих курсов — нужен быстрый результат" },
];

function openTelegram() {
  const text = encodeURIComponent("Здравствуйте! Хочу купить курс «Медведь на ухо». Подскажите, как оплатить?");
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function BearCoursePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#1a0f2e" }}>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(10,5,20,0.97) 0%, transparent 100%)" }}>
        <Link to="/" className="flex items-center gap-2 text-rock-ash hover:text-rock-gold transition-colors font-oswald tracking-widest text-sm uppercase">
          <Icon name="ChevronLeft" size={18} />
          На главную
        </Link>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(220,30,100,0.15) 0%, transparent 70%)"
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <p className="section-eyebrow mb-5">Экспресс-практикум · Анна Артман</p>
              <h1 className="leading-tight mb-3 uppercase tracking-tight"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow: "0 0 30px rgba(220,30,100,0.7), 0 0 60px rgba(220,30,100,0.3)"
                }}>
                Медведь<br /><em style={{ color: "#c9a227" }}>на ухо</em>
              </h1>
              <p className="font-oswald text-xl tracking-widest uppercase mb-8"
                style={{ color: "rgba(255,100,150,0.8)" }}>
                Фальшь — не приговор!
              </p>
              <p className="font-cormorant text-xl text-rock-light leading-relaxed mb-8" style={{ opacity: 0.85 }}>
                Экспресс-практикум по теме <strong className="text-white">«Не попадание в ноты»</strong>.
                За 21 день вы поймёте причину фальши и получите конкретный план её устранения.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Диагностика", "Упражнения", "21 день", "Результат"].map((tag) => (
                  <span key={tag} className="font-oswald text-xs tracking-widest uppercase px-4 py-2"
                    style={{ border: "1px solid rgba(220,30,100,0.4)", color: "rgba(255,120,160,0.9)", background: "rgba(220,30,100,0.07)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full"
                style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
                <span className="font-oswald text-rock-gold text-2xl tracking-wide">{COURSE_PRICE}</span>
                <span className="text-rock-ash font-cormorant text-lg">— полный доступ навсегда</span>
              </div>

              <div>
                <button onClick={openTelegram} className="btn-gold flex items-center gap-3 text-lg px-10 py-4">
                  <Icon name="Send" size={20} />
                  Купить в Telegram
                </button>
                <p className="mt-3 text-rock-ash font-cormorant text-sm" style={{ opacity: 0.6 }}>
                  Напишите нам — получите инструкцию по оплате и доступ к материалам
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
                <div className="absolute -inset-6 rounded-sm blur-3xl opacity-25"
                  style={{ background: "linear-gradient(135deg, rgba(220,30,100,0.6), rgba(201,162,39,0.4))" }} />
                <img src={COVER} alt="Медведь на ухо" className="relative w-full object-cover"
                  style={{ filter: "drop-shadow(0 16px 48px rgba(220,30,100,0.3))" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Для кого */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Аудитория</p>
            <h2 className="section-title">Это <em>для тебя</em>, если...</h2>
          </div>
          <div className="space-y-4">
            {FOR_WHOM.map((item, i) => (
              <div key={i} className="card-rock p-5 flex items-center gap-5">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <span className="font-cormorant text-rock-light text-lg leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Программа */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-4">Программа</p>
            <h2 className="section-title">Что <em>в курсе</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROGRAM.map((mod, i) => (
              <div key={i} className="card-rock p-7 group hover:border-rock-gold/20 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-oswald text-4xl leading-none tracking-tighter"
                    style={{ color: "rgba(220,30,100,0.2)" }}>{mod.num}</span>
                  <span className="text-3xl">{mod.icon}</span>
                </div>
                <h3 className="font-oswald text-lg tracking-wide text-rock-light mb-3 group-hover:text-rock-gold transition-colors">
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
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">После курса</p>
            <h2 className="section-title">Что <em>изменится</em></h2>
          </div>
          <div className="space-y-4">
            {RESULTS.map((result, i) => (
              <div key={i} className="flex items-start gap-4 p-5 card-rock">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.4)" }}>
                  <Icon name="Check" size={16} className="text-rock-gold" />
                </div>
                <span className="font-cormorant text-rock-light text-lg leading-relaxed">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(220,30,100,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-xl mx-auto relative z-10">
          <p className="section-eyebrow mb-4">Готов начать?</p>
          <h2 className="section-title mb-4">Пой <em>чисто</em>. Рокируй жизнь!</h2>
          <p className="font-cormorant text-xl text-rock-ash mb-10 leading-relaxed" style={{ opacity: 0.8 }}>
            21 день — и ты другой. Медведь отступает.
          </p>
          <button onClick={openTelegram} className="btn-gold flex items-center gap-3 justify-center text-xl px-12 py-5 mx-auto">
            <Icon name="Send" size={22} />
            Написать в Telegram
          </button>
          <p className="mt-6 text-rock-ash font-cormorant text-lg" style={{ opacity: 0.6 }}>
            Ответим быстро и пришлём доступ к материалам
          </p>
        </div>
      </section>

    </div>
  );
}
