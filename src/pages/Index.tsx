import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/files/dac673f5-694e-4cec-8c2d-c5da53e7f95e.jpg";

const NAV_ITEMS = [
  { label: "О педагоге", href: "#about" },
  { label: "Направления", href: "#directions" },
  { label: "Курсы", href: "#courses" },
  { label: "Видеотека", href: "#videos" },
  { label: "Музыкотерапия", href: "#therapy" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const DIRECTIONS = [
  { icon: "🎸", title: "Рок и экстрим вокал", desc: "Гроул, скриминг, чистый рок. Техники без вреда для голоса." },
  { icon: "🎵", title: "Горловое пение", desc: "Тувинские и монгольские традиции. Уникальные обертоновые техники." },
  { icon: "🎤", title: "Эстрадный вокал", desc: "Современная эстрада, поп, джаз. Работа с образом и подачей." },
  { icon: "🔬", title: "Фонопедия", desc: "Восстановление и развитие голоса. Медицинский подход к вокалу." },
  { icon: "🧠", title: "Музыкальная психотерапия", desc: "Исцеление через звук. Авторские методики снятия блоков." },
  { icon: "✍️", title: "Сонграйтинг", desc: "Написание песен. От мелодии к тексту, от идеи к треку." },
];

const COURSES = [
  {
    level: "Начинающий",
    title: "Голос без страха",
    desc: "Для тех, кто боится петь. Снимаем зажимы, находим свой звук.",
    duration: "8 недель",
    price: "от 8 000 ₽/мес",
    tag: "Популярный",
  },
  {
    level: "Продвинутый",
    title: "Театр Рока",
    desc: "Полное погружение в рок и экстрим вокал. Все техники + сценический образ.",
    duration: "6 месяцев",
    price: "от 15 000 ₽/мес",
    tag: "Флагман",
  },
  {
    level: "Авторская методика",
    title: "«Чем он это сделал»",
    desc: "Разбираем вокальные приёмы рок-легенд с научной точки зрения. Учимся у лучших безопасно.",
    duration: "12 недель",
    price: "от 10 000 ₽/мес",
    tag: "Уникально",
  },
  {
    level: "Терапия",
    title: "Музыкотерапия онлайн",
    desc: "Работа с психологическими блоками через звук. Индивидуально.",
    duration: "По запросу",
    price: "от 5 000 ₽/сессия",
    tag: "Онлайн",
  },
];

const VIDEOS = [
  { category: "Техники", title: "Гроул без вреда: базовый курс", duration: "14:32", views: "12K", locked: false },
  { category: "Техники", title: "Горловое пение с нуля", duration: "22:18", views: "8.5K", locked: false },
  { category: "Практика", title: "Разогрев голоса: 10 упражнений", duration: "08:45", views: "24K", locked: false },
  { category: "Методика", title: "«Чем он это сделал»: Роберт Плант", duration: "31:07", views: "6.2K", locked: true },
  { category: "Методика", title: "Честер Беннингтон: секреты микста", duration: "28:44", views: "9.1K", locked: true },
  { category: "Психология", title: "Страх сцены: работа со звуком", duration: "18:20", views: "15K", locked: true },
];

const REVIEWS = [
  {
    name: "Мария К.",
    role: "Рок-вокалистка",
    text: "Анна — единственный педагог, которая объяснила мне, как делать экстрим без боли. За 4 месяца я не только сохранила голос, но и вышла на новый уровень.",
    stars: 5,
  },
  {
    name: "Дмитрий В.",
    role: "Начинающий музыкант",
    text: "Пришёл с нуля и боялся даже петь в душе. Методика «Чем он это сделал» — это откровение. Теперь пою в группе.",
    stars: 5,
  },
  {
    name: "Алиса Т.",
    role: "Психолог",
    text: "Прошла курс музыкотерапии. Удивительно, как звук работает с телом. Анна создала безопасное пространство для исследования голоса.",
    stars: 5,
  },
  {
    name: "Кирилл М.",
    role: "Вокалист группы «Север»",
    text: "Три года искал педагога по горловому пению. Нашёл в Театре Рока. Результат превзошёл ожидания.",
    stars: 5,
  },
];

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

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", direction: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#1a0f2e" }}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center select-none">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/9d285d0c-e6e0-470b-a30f-8c3e9ca357df.jpg"
              alt="Artman"
              className="h-28 w-auto object-contain"
              style={{ filter: "brightness(1.2)", mixBlendMode: "screen" }}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <a href="#consultation" className="hidden md:block btn-rock text-xs">
            Записаться
          </a>

          <button
            className="md:hidden text-rock-light"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-5" style={{ backgroundColor: "rgba(26,15,46,0.97)" }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#consultation" className="btn-gold text-center mt-2">
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Анна Артман"
            className="w-full h-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #1a0f2e 40%, rgba(26,15,46,0.75) 70%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1a0f2e 0%, transparent 50%)" }} />
        </div>

        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-rock-red/30 to-transparent" />
        <div className="absolute left-0 top-1/3 w-32 h-px bg-gradient-to-r from-transparent to-rock-gold/50" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,79,191,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(100,50,180,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <div className="max-w-3xl">
            <p className="section-eyebrow mb-6 animate-fade-in">Личный сайт вокального коуча Анны Артман</p>

            <h1 className="font-cormorant font-semibold italic leading-[0.95] mb-6 animate-fade-in scroll-delay-1 glow-lilac-text text-gradient-red"
              style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)" }}>
              Анны Артман
            </h1>

            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in scroll-delay-2">
              {["Фонопед", "Муз. психотерапевт", "Тренер по расщеплению", "Горловое пение", "Сонграйтер"].map((tag) => (
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
      <section id="about" className="relative overflow-hidden" style={{ minHeight: "800px" }}>
        {/* Фото на весь фон */}
        <div className="absolute inset-0 flex justify-end items-stretch pointer-events-none">
          <div style={{
            maskImage: "linear-gradient(to left, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)",
            width: "45%",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
          }}>
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/ee3c604d-eaac-4e37-9e54-f7423658412c.JPG"
              alt="Анна Артман"
              className="w-full object-contain glow-lilac"
              style={{ maxHeight: "750px" }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">
          <div className="max-w-lg">
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
        </div>
      </section>

      <div className="divider-rock" />

      {/* DIRECTIONS */}
      <section id="directions" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4">Чему я учу</p>
            <h2 className="section-title">Направления <em>обучения</em></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIRECTIONS.map((dir, i) => (
              <div
                key={i}
                className="card-rock p-7 group hover:border-rock-red/30 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="text-4xl mb-4">{dir.icon}</div>
                <h3 className="font-oswald text-lg tracking-wide text-rock-light mb-3 group-hover:text-rock-gold transition-colors">
                  {dir.title}
                </h3>
                <p className="font-cormorant text-rock-light text-lg leading-relaxed" style={{ opacity: 0.8 }}>{dir.desc}</p>
                <div className="w-8 h-px bg-rock-red/50 mt-5 group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-rock" />

      {/* COURSES */}
      <section id="courses" className="py-28" style={{ backgroundColor: "#221440" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Программы</p>
            <h2 className="section-title">Курсы и <em>обучение</em></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="relative card-rock p-8 hover:border-rock-gold/20 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-oswald text-[10px] tracking-[0.25em] uppercase text-rock-ash">{course.level}</span>
                  <span className="font-oswald text-[10px] tracking-widest uppercase px-3 py-1 bg-rock-red/20 text-rock-red border border-rock-red/30">
                    {course.tag}
                  </span>
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-rock-light mb-3">
                  {course.title}
                </h3>
                <p className="font-cormorant text-rock-light text-lg leading-relaxed mb-6" style={{ opacity: 0.85 }}>{course.desc}</p>
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <div className="font-oswald text-xs tracking-widest uppercase text-rock-ash">{course.duration}</div>
                  <div className="font-cormorant text-xl text-gradient-gold">{course.price}</div>
                </div>
                <a href="#consultation" className="btn-rock w-full text-center mt-5 block">
                  Узнать подробнее
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-rock" />

      {/* VIDEO LIBRARY */}
      <section id="videos" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Обучающий контент</p>
            <h2 className="section-title">Библиотека <em>видеоуроков</em></h2>
            <p className="font-cormorant text-rock-light text-xl mt-4 max-w-xl" style={{ opacity: 0.8 }}>
              Бесплатные уроки — в открытом доступе. Закрытые — для учеников.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS.map((video, i) => (
              <div key={i} className="card-rock group cursor-pointer hover:border-rock-red/25 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-rock-smoke flex items-center justify-center">
                  {video.locked ? (
                    <div className="flex flex-col items-center gap-2 text-rock-ash">
                      <Icon name="Lock" size={32} className="text-rock-gold opacity-60" />
                      <span className="font-oswald text-xs tracking-widest uppercase opacity-60">Только для учеников</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full border-2 border-rock-red flex items-center justify-center group-hover:bg-rock-red/20 transition-all">
                        <Icon name="Play" size={20} className="text-rock-light ml-1" />
                      </div>
                      <span className="font-oswald text-xs tracking-widest uppercase text-rock-gold">Смотреть</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="font-oswald text-[9px] tracking-widest uppercase px-2 py-1 bg-black/60 text-rock-ash border border-white/10">
                      {video.category}
                    </span>
                  </div>
                  {!video.locked && (
                    <div className="absolute bottom-3 right-3">
                      <span className="font-oswald text-[9px] px-2 py-1 bg-black/60 text-rock-ash">
                        {video.duration}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-cormorant text-base text-rock-light group-hover:text-rock-gold transition-colors leading-snug mb-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 text-rock-ash">
                    <Icon name="Eye" size={12} />
                    <span className="font-oswald text-[10px] tracking-wide">{video.views} просмотров</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#consultation" className="btn-gold">
              Получить доступ к закрытым урокам
            </a>
          </div>
        </div>
      </section>

      <div className="divider-rock" />

      {/* THERAPY */}
      <section id="therapy" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#221440" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(123,79,191,0.1)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <p className="section-eyebrow mb-4">Приложение</p>
            <h2 className="section-title mb-6">
              Музыко-<em>терапия</em>
            </h2>
            <p className="font-cormorant text-rock-light text-xl leading-relaxed max-w-2xl mx-auto" style={{ opacity: 0.85 }}>
              Авторское приложение по музыкотерапии — ваш личный звуковой терапевт.
              Медитации, дыхательные практики, голосовые упражнения для снятия стресса
              и раскрытия голосового потенциала.
            </p>
          </div>

          <div className="relative w-full">
            <div className="rounded-xl overflow-hidden border border-white/10 glow-red" style={{ height: "700px" }}>
              <iframe
                src="https://music-therapy-vocal-rehabilitation--preview.poehali.dev/"
                className="w-full h-full"
                style={{ border: "none" }}
                title="Приложение по музыкотерапии"
                allow="autoplay"
              />
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border border-rock-gold/30" />
            <div className="absolute -bottom-3 -left-3 w-4 h-4 border border-rock-red/30" />
          </div>
        </div>
      </section>

      <div className="divider-rock" />

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4">Говорят ученики</p>
            <h2 className="section-title">Отзывы и <em>истории</em></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="card-rock p-8 group hover:border-rock-gold/15 transition-all duration-300">
                <div className="text-5xl text-rock-red/30 font-cormorant leading-none mb-4">"</div>
                <p className="font-cormorant text-rock-light text-lg leading-relaxed mb-6 italic">
                  {review.text}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <div>
                    <p className="font-oswald text-sm tracking-wide text-rock-light">{review.name}</p>
                    <p className="font-cormorant text-rock-ash text-sm italic">{review.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <span key={j} className="text-rock-gold text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-rock" />

      {/* CONSULTATION */}
      <section id="consultation" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#221440" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rock-gold/40 to-transparent" />
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Первый шаг</p>
            <h2 className="section-title">Запись на <em>консультацию</em></h2>
            <p className="font-cormorant text-rock-light text-xl mt-4" style={{ opacity: 0.8 }}>
              Бесплатная 30-минутная консультация — разберём ваш запрос и подберём программу.
            </p>
          </div>

          {formSent ? (
            <div className="text-center card-rock p-12">
              <div className="text-5xl mb-6">🎵</div>
              <h3 className="font-cormorant text-2xl text-rock-gold mb-3">Заявка отправлена!</h3>
              <p className="font-cormorant text-rock-ash text-lg">
                Анна свяжется с вами в течение 24 часов. До встречи!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash block mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-cormorant text-rock-light text-base focus:outline-none focus:border-rock-gold/50 transition-colors placeholder:text-rock-ash/40"
                    placeholder="Анна"
                  />
                </div>
                <div>
                  <label className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash block mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 font-cormorant text-rock-light text-base focus:outline-none focus:border-rock-gold/50 transition-colors placeholder:text-rock-ash/40"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash block mb-2">
                  Направление обучения
                </label>
                <select
                  value={formData.direction}
                  onChange={e => setFormData({ ...formData, direction: e.target.value })}
                  className="w-full border border-white/10 px-4 py-3 font-cormorant text-rock-light text-base focus:outline-none focus:border-rock-gold/50 transition-colors" style={{ backgroundColor: "rgba(123,79,191,0.15)" }}
                >
                  <option value="">Выбрать направление...</option>
                  <option>Рок и экстрим вокал</option>
                  <option>Горловое пение</option>
                  <option>Эстрадный вокал</option>
                  <option>Музыкотерапия</option>
                  <option>Фонопедия</option>
                  <option>Сонграйтинг</option>
                  <option>Методика «Чем он это сделал»</option>
                </select>
              </div>

              <div>
                <label className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash block mb-2">
                  Расскажите о себе
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 font-cormorant text-rock-light text-base focus:outline-none focus:border-rock-gold/50 transition-colors resize-none placeholder:text-rock-ash/40"
                  placeholder="Ваш опыт, цели, вопросы..."
                />
              </div>

              <button type="submit" className="btn-gold w-full text-base py-4">
                Отправить заявку
              </button>

              <p className="font-cormorant text-rock-ash text-sm text-center">
                Или напишите напрямую:{" "}
                <a href="#contacts" className="text-rock-gold hover:underline">в мессенджерах</a>
              </p>
            </form>
          )}
        </div>
      </section>

      <div className="divider-rock" />

      {/* CONTACTS */}
      <section id="contacts" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <p className="section-eyebrow mb-4">Контакты</p>
              <h2 className="font-cormorant text-4xl font-light italic text-rock-light mb-6">
                Будем на связи
              </h2>
              <div className="space-y-4">
                {[
                  { icon: "Instagram", label: "@artman_theatre", href: "#" },
                  { icon: "MessageCircle", label: "Написать в Telegram", href: "#" },
                  { icon: "Youtube", label: "YouTube-канал", href: "#" },
                  { icon: "Mail", label: "anna@artman-studio.ru", href: "mailto:anna@artman-studio.ru" },
                ].map((contact, i) => (
                  <a
                    key={i}
                    href={contact.href}
                    className="flex items-center gap-4 group text-rock-ash hover:text-rock-gold transition-colors"
                  >
                    <Icon name={contact.icon as "Mail"} size={16} className="text-rock-red group-hover:text-rock-gold transition-colors" />
                    <span className="font-cormorant text-lg">{contact.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 card-rock p-8">
              <p className="font-oswald text-xs tracking-[0.3em] uppercase text-rock-gold mb-5">О педагоге</p>
              <p className="font-cormorant text-rock-light text-lg leading-relaxed mb-6">
                «Театр Рока Артман & Ко» — онлайн и офлайн занятия. Москва,
                принимаю учеников со всей России и из-за рубежа в онлайн-формате.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Режим работы", value: "Пн–Сб, 10:00–21:00" },
                  { label: "Формат", value: "Онлайн / Офлайн" },
                  { label: "Первый урок", value: "Бесплатная консультация" },
                  { label: "Оплата", value: "Карта, перевод, рассрочка" },
                ].map((info, i) => (
                  <div key={i}>
                    <p className="font-oswald text-[9px] tracking-[0.25em] uppercase text-rock-ash mb-1">{info.label}</p>
                    <p className="font-cormorant text-rock-light text-base">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10" style={{ backgroundColor: "#140a24" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/9d285d0c-e6e0-470b-a30f-8c3e9ca357df.jpg"
              alt="Artman"
              className="h-8 w-auto object-contain opacity-80"
            />
            <span className="font-cormorant text-rock-ash text-sm">© 2024 Анна Артман. Все права защищены.</span>
          </div>
          <div className="flex items-center gap-3 opacity-30">
            <SoundWaveSVG />
          </div>
          <a href="#consultation" className="btn-rock text-[10px] py-2 px-5">
            Записаться на урок
          </a>
        </div>
      </footer>

    </div>
  );
}