import { useState } from "react";
import Icon from "@/components/ui/icon";

const HEARING_TYPES = [
  {
    type: "Интервальный",
    neuro: "Височная доля",
    neuroFull: "Распознавание расстояний между звуками",
    fail: "Путает малые и большие секунды, не отличает кварту от квинты",
    sound: "Поёт «всё подряд», случайно меняет высоту на непредсказуемую величину",
    icon: "📐",
  },
  {
    type: "Ладогармонический",
    neuro: "Префронтальная кора + островок Рейля",
    neuroFull: "Чувство тяготения и устоев лада",
    fail: "Не чувствует тяготения (VII→I, IV→III). Поёт ноты аккорда, но не понимает, какая из них «главная»",
    sound: "Фраза не завершается, «висит» в воздухе, не попадает в тонику",
    icon: "🎼",
  },
  {
    type: "Темброво-спектральный",
    neuro: "Зоны 41/42 по Бродману",
    neuroFull: "Слуховая кора — анализ тембра и спектра",
    fail: "Путает высоту с тембром: низкий тембр принимает за более низкую ноту",
    sound: "Начинает фальшивить в низком регистре, хотя диапазон позволяет",
    icon: "🎨",
  },
  {
    type: "Внутренний",
    neuro: "Зона Брока + зеркальные нейроны",
    neuroFull: "Речевая моторная кора — слышать ноту до атаки",
    fail: "Не может «услышать ноту до атаки». Поёт на реактивном управлении",
    sound: "Всегда отстаёт от музыки на 200–300 мс, звучит «догоняюще»",
    icon: "🧠",
  },
  {
    type: "Абсолютный",
    neuro: "Врождённая гипертрофия слуховой коры",
    neuroFull: "Редкость — точное опознавание ноты без эталона",
    fail: "Не нужен для попадания в ноты. Не переносит транспонирование",
    sound: "Слышит, что нота «не та», но перестроиться не может — возникает стресс",
    icon: "⭐",
  },
];

const TEST_QUESTIONS = [
  {
    question: "Вы поёте мелодию, и вдруг понимаете, что «съехали». Как это происходит?",
    answers: [
      { text: "Просто пою куда-то не туда, непонятно куда", type: "Интервальный" },
      { text: "Фраза как будто «висит» — не завершается, не попадает на нужную ноту", type: "Ладогармонический" },
      { text: "В низком регистре начинаю фальшивить, хотя голос туда достаёт", type: "Темброво-спектральный" },
      { text: "Немного отстаю от музыки, как будто «догоняю»", type: "Внутренний" },
    ],
  },
  {
    question: "Когда вы слышите мелодию и пытаетесь её повторить — что сложнее всего?",
    answers: [
      { text: "Угадать, насколько следующая нота выше или ниже предыдущей", type: "Интервальный" },
      { text: "Почувствовать, какая нота — «главная», на которой надо завершить фразу", type: "Ладогармонический" },
      { text: "Контролировать голос в низком диапазоне — там он «врёт»", type: "Темброво-спектральный" },
      { text: "Попасть в ноту сразу, без промедления", type: "Внутренний" },
    ],
  },
  {
    question: "Как вы описали бы свою главную проблему с пением?",
    answers: [
      { text: "Попадаю в ноты случайно — не чувствую расстояния между ними", type: "Интервальный" },
      { text: "Знаю ноты, но песня всё равно звучит «незаконченно»", type: "Ладогармонический" },
      { text: "В нижних нотах теряюсь, хотя в среднем регистре всё нормально", type: "Темброво-спектральный" },
      { text: "Всё время чуть запаздываю, как будто мозг не успевает", type: "Внутренний" },
    ],
  },
];

const TYPE_RESULT: Record<string, { short: string; advice: string }> = {
  Интервальный: {
    short: "Интервальный слух требует развития",
    advice: "Тренируй распознавание интервалов: играй два звука и называй расстояние. Помогут упражнения типа «спой следующую ноту выше/ниже на заданный интервал».",
  },
  Ладогармонический: {
    short: "Ладовый слух нуждается в проработке",
    advice: "Работай с тяготениями: учись слышать, куда «хочет» разрешиться мелодия. Пой гаммы с остановками, чувствуй устои и неустои.",
  },
  "Темброво-спектральный": {
    short: "Темброво-спектральный слух ограничивает диапазон",
    advice: "Разделяй тембр и высоту: работай с закрытыми глазами на фортепиано, убирая тембровые подсказки. Пение на монотоне разных гласных поможет.",
  },
  Внутренний: {
    short: "Внутренний слух — зона роста",
    advice: "Развивай «слышание до атаки»: перед каждой нотой мысленно пой её секунду-две. Упражнения с паузами между нотами — твой главный инструмент.",
  },
  Абсолютный: {
    short: "Особенности абсолютного слуха",
    advice: "Это врождённое свойство. Учись «отключать» привязку к конкретным нотам при транспонировании — воспринимай мелодию как рисунок, а не набор фиксированных высот.",
  },
};

export default function HearingTestSection() {
  const [activeType, setActiveType] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  function handleAnswer(type: string) {
    const newAnswers = [...answers, type];
    if (step + 1 < TEST_QUESTIONS.length) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const freq: Record<string, number> = {};
      newAnswers.forEach((t) => { freq[t] = (freq[t] || 0) + 1; });
      const winner = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  }

  function resetTest() {
    setTestStarted(false);
    setStep(0);
    setAnswers([]);
    setResult(null);
  }

  return (
    <section id="hearing" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(201,162,39,0.15) 0%, transparent 70%)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Наука о звуке</p>
          <h2 className="section-title">Диагностика <em>музыкального слуха</em></h2>
          <p className="font-cormorant text-rock-light text-xl mt-6 max-w-2xl mx-auto" style={{ opacity: 0.75 }}>
            Слух — не один. Нейронаука выделяет 5 независимых систем. Пойми, какая из них у тебя западает.
          </p>
        </div>

        {/* Table */}
        <div className="mb-16 overflow-x-auto">
          <table className="w-full min-w-[700px]" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                {["Тип слуха", "Нейрокоррелят", "Как проявляется провал", "Как это звучит в пении"].map((h) => (
                  <th key={h} className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-ash text-left px-5 py-4 border-b border-white/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HEARING_TYPES.map((row, i) => (
                <tr
                  key={i}
                  className={`cursor-pointer transition-all duration-200 ${activeType === i ? "bg-rock-gold/5 border-l-2 border-rock-gold" : "hover:bg-white/3"}`}
                  onClick={() => setActiveType(activeType === i ? null : i)}
                >
                  <td className="px-5 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{row.icon}</span>
                      <span className="font-oswald text-[11px] tracking-widest uppercase text-rock-gold">{row.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-white/5">
                    <div className="font-cormorant text-rock-light text-sm leading-snug" style={{ opacity: 0.9 }}>
                      {row.neuro}
                    </div>
                    <div className="font-oswald text-[9px] tracking-wide text-rock-ash mt-1">
                      {row.neuroFull}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-white/5 max-w-[260px]">
                    <p className="font-cormorant text-rock-light text-sm leading-relaxed" style={{ opacity: 0.8 }}>
                      {row.fail}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-white/5 max-w-[220px]">
                    <p className="font-cormorant text-rock-ash text-sm leading-relaxed italic">
                      {row.sound}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash mt-4 text-center opacity-50">
            Нажми на строку, чтобы выделить тип
          </p>
        </div>

        {/* Test */}
        <div className="max-w-2xl mx-auto">
          <div className="card-rock p-8 md:p-10">
            {!testStarted && !result && (
              <div className="text-center">
                <div className="text-5xl mb-6">🎧</div>
                <h3 className="font-cormorant text-2xl text-rock-light mb-3">Быстрый тест: определи свой тип</h3>
                <p className="font-cormorant text-rock-ash text-lg mb-8 leading-relaxed">
                  3 вопроса — и ты узнаешь, какая система слуха у тебя работает хуже всего, и что с этим делать
                </p>
                <button onClick={() => setTestStarted(true)} className="btn-gold px-8 py-3">
                  Пройти тест
                </button>
              </div>
            )}

            {testStarted && !result && (
              <div>
                <div className="flex items-center gap-2 mb-8">
                  {TEST_QUESTIONS.map((_, i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= step ? "bg-rock-gold" : "bg-white/10"}`} />
                  ))}
                </div>
                <p className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash mb-3">
                  Вопрос {step + 1} из {TEST_QUESTIONS.length}
                </p>
                <h3 className="font-cormorant text-xl text-rock-light mb-8 leading-snug">
                  {TEST_QUESTIONS[step].question}
                </h3>
                <div className="space-y-3">
                  {TEST_QUESTIONS[step].answers.map((ans, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(ans.type)}
                      className="w-full text-left px-5 py-4 border border-white/10 text-rock-light font-cormorant text-base leading-snug hover:border-rock-gold/40 hover:bg-rock-gold/5 transition-all duration-200"
                    >
                      {ans.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {result && TYPE_RESULT[result] && (
              <div className="text-center">
                <div className="text-5xl mb-5">
                  {HEARING_TYPES.find((t) => t.type === result)?.icon}
                </div>
                <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-rock-gold mb-3">
                  Твой слабый тип слуха
                </p>
                <h3 className="font-cormorant text-2xl text-rock-light mb-6 leading-snug">
                  {TYPE_RESULT[result].short}
                </h3>
                <div className="bg-white/5 border border-white/10 p-6 text-left mb-8">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={16} className="text-rock-gold mt-1 flex-shrink-0" />
                    <p className="font-cormorant text-rock-light text-base leading-relaxed" style={{ opacity: 0.85 }}>
                      {TYPE_RESULT[result].advice}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={resetTest} className="btn-ghost px-6 py-3 text-sm flex items-center justify-center gap-2">
                    <Icon name="RotateCcw" size={14} />
                    Пройти ещё раз
                  </button>
                  <a href="https://t.me/ARTMANANDCO" target="_blank" rel="noreferrer"
                    className="btn-gold px-6 py-3 text-sm flex items-center justify-center gap-2">
                    <Icon name="Send" size={14} />
                    Разобрать со мной лично
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
