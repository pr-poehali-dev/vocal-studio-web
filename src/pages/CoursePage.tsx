import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

const TELEGRAM_USERNAME = "ARTMANANDCO";
const COURSE_PRICE = "2 900 ₽";

const COURSE_MODULES = [
  {
    num: "01",
    title: "Безопасность голоса",
    desc: "Создаём условия, в которых голос может звучать свободно. Убираем зажимы, снимаем мышечные блоки. Голос начинает восстанавливаться, когда ему не мешают.",
    icon: "🛡️",
  },
  {
    num: "02",
    title: "Дыхание как опора",
    desc: "Опора на дыхание — ключ к устойчивому и свободному голосу. Учимся дышать не грудью, а телом. Это фундамент любого здорового звучания.",
    icon: "🌬️",
  },
  {
    num: "03",
    title: "Телесная опора",
    desc: "Стопы → таз → дыхание. Голос живёт в теле. Восстанавливаем связь между физическим состоянием и звуком — убираем причины, а не следствия.",
    icon: "🧍",
  },
  {
    num: "04",
    title: "Фонический резонанс",
    desc: "Учимся направлять звук в резонаторы — грудь, маску, купол. Реабилитация через правильное звукоизвлечение без нагрузки на связки.",
    icon: "🎵",
  },
  {
    num: "05",
    title: "Эмоциональная свобода",
    desc: "Голос реагирует на психологические зажимы. Отпускаем страхи, напряжение и блоки — голос возвращается живым и наполненным.",
    icon: "💜",
  },
  {
    num: "06",
    title: "Живой голос",
    desc: "От напряжённого и зажатого звука — к фоническому резонансу и живому звучанию. Практики для ежедневного поддержания голоса в форме.",
    icon: "✨",
  },
];

const FOR_WHOM = [
  { icon: "🎤", text: "Певцы после болезни, операции или перенагрузки" },
  { icon: "🗣️", text: "Ораторы и преподаватели с усталостью голоса" },
  { icon: "😶", text: "Те, кто потерял голос или он стал тусклым" },
  { icon: "😰", text: "Все, кто чувствует зажимы и дискомфорт при пении" },
  { icon: "🔇", text: "После ларингита, перенапряжения связок, узелков" },
];

const RESULTS = [
  "Голос восстанавливается без нагрузки на связки",
  "Исчезает хрипота, усталость и зажатость",
  "Появляется объём, глубина и тёплый тембр",
  "Дыхание становится ровным и опорным",
  "Тело и голос работают как единое целое",
  "Ежедневная практика занимает 15–20 минут",
];

const CONTENTS = [
  { icon: "🎬", label: "Видео-уроки", desc: "Пошаговые занятия с объяснением каждого упражнения" },
  { icon: "📄", label: "PDF-методичка", desc: "Полный конспект курса с теорией и схемами" },
  { icon: "🎵", label: "Аудио-практики", desc: "Записи для самостоятельной работы голосом" },
  { icon: "♾️", label: "Доступ навсегда", desc: "Возвращайтесь к материалам в любое время" },
];

function openTelegram() {
  const text = encodeURIComponent("Здравствуйте! Хочу купить курс «Фонический резонанс. Восстановление голоса». Подскажите, как оплатить?");
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, "_blank");
}

export default function CoursePage() {
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
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(149,79,255,0.2) 0%, transparent 70%)"
        }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="section-eyebrow mb-5">Онлайн-курс · Анна Артман</p>
          <h1 className="leading-tight mb-4 uppercase tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 0 30px rgba(149,79,255,0.8), 0 0 60px rgba(149,79,255,0.4)"
            }}>
            Фонический <em style={{ color: "#c9a227" }}>резонанс</em>
          </h1>
          <h2 className="font-oswald text-2xl md:text-3xl tracking-widest uppercase mb-8"
            style={{ color: "rgba(220,200,255,0.7)" }}>
            Восстановление и реабилитация голоса
          </h2>
          <p className="font-cormorant text-xl text-rock-light mb-10 leading-relaxed max-w-2xl mx-auto" style={{ opacity: 0.85 }}>
            Если голос устал, охрип, потерял силу или звучит зажато — этот курс вернёт его к жизни.
            Без форсирования, без боли, через тело и дыхание.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Тело", "Дыхание", "Резонанс", "Эмоции"].map((tag) => (
              <span key={tag} className="font-oswald text-xs tracking-widest uppercase px-4 py-2"
                style={{ border: "1px solid rgba(149,79,255,0.4)", color: "rgba(180,140,255,0.9)", background: "rgba(149,79,255,0.08)" }}>
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

      {/* Для кого */}
      <section className="py-20 px-6" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Аудитория</p>
            <h2 className="section-title">Для <em>кого</em> этот курс</h2>
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
            <h2 className="section-title">Что <em>изучаем</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {COURSE_MODULES.map((mod, i) => (
              <div key={i} className="card-rock p-7 group hover:border-rock-gold/20 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-oswald text-4xl text-rock-gold/20 leading-none tracking-tighter">{mod.num}</span>
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

      <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.4 }}>
        <AnimatedWaveCanvas height={40} />
      </div>

      {/* Состав */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Состав</p>
            <h2 className="section-title">Что <em>входит</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {CONTENTS.map((item, i) => (
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

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(149,79,255,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-xl mx-auto relative z-10">
          <p className="section-eyebrow mb-4">Готова помочь</p>
          <h2 className="section-title mb-4">Верни голос <em>к жизни</em></h2>
          <p className="font-cormorant text-xl text-rock-ash mb-10 leading-relaxed" style={{ opacity: 0.8 }}>
            Твой голос — живой инструмент. Он умеет восстанавливаться.<br />Нужно только помочь ему вспомнить, как звучать свободно.
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