import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SoundWaveSVG } from "./HeroAboutSections";
import { DIRECTIONS, COURSES, VIDEOS, GALLERY, ARTICLES } from "./data";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

function WaveDivider() {
  return (
    <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.55 }}>
      <AnimatedWaveCanvas height={48} />
    </div>
  );
}

interface ContentSectionsProps {
  formData: { name: string; phone: string; direction: string; message: string };
  setFormData: (v: { name: string; phone: string; direction: string; message: string }) => void;
  formSent: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % GALLERY.length : null));

  return (
    <section id="gallery" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Сцена и студия</p>
          <h2 className="section-title"><em>В кадре</em></h2>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {GALLERY.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              onClick={() => setLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: "block" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Icon name="ZoomIn" size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(10,5,20,0.95)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <Icon name="ChevronLeft" size={48} />
          </button>

          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            style={{ filter: "drop-shadow(0 0 40px rgba(196,30,58,0.3))" }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <Icon name="ChevronRight" size={48} />
          </button>

          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={28} />
          </button>

          <div className="absolute bottom-6 text-rock-ash font-oswald text-xs tracking-widest">
            {lightbox + 1} / {GALLERY.length}
          </div>
        </div>
      )}
    </section>
  );
}

export default function ContentSections({ formData, setFormData, formSent, handleSubmit }: ContentSectionsProps) {
  return (
    <>
      <WaveDivider />

      {/* DIRECTIONS */}
      <section id="directions" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4">Чему я учу</p>
            <h2 className="section-title">Чему <em>научу</em></h2>
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

      <WaveDivider />

      {/* COURSES */}
      <section id="courses" className="py-28" style={{ backgroundColor: "#221440" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Программы</p>
            <h2 className="section-title">Прокачка <em>голоса</em> (мастер-классы и лекции)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="relative card-rock p-8 hover:border-rock-gold/20 transition-all duration-300 group flex gap-5">
                {course.cover && (
                  <div className="flex-shrink-0 w-24">
                    <img src={course.cover} alt={course.title} className="w-full object-cover shadow-lg" style={{ filter: "drop-shadow(0 4px 16px rgba(201,162,39,0.3))" }} />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
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
                  <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
                    <div className="font-oswald text-xs tracking-widest uppercase text-rock-ash">{course.duration}</div>
                    <div className="font-cormorant text-xl text-gradient-gold">{course.price}</div>
                  </div>
                  {course.link ? (
                    <Link to={course.link.startsWith("/") ? course.link : course.link} className={`${course.link.startsWith("/") ? "btn-gold" : "btn-rock"} w-full text-center mt-5 block no-underline`}>
                      Подробнее
                    </Link>
                  ) : (
                    <a href="#consultation" className="btn-rock w-full text-center mt-5 block">
                      Узнать подробнее
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* SMART ARTICLES */}
      <section id="smart" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-eyebrow mb-4">Читать полезно</p>
            <h2 className="section-title">Много умных слов <em>о главном</em></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article, i) => (
              <div
                key={i}
                className="card-rock p-7 group hover:border-rock-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-oswald text-[10px] tracking-[0.25em] uppercase px-3 py-1 bg-rock-red/20 text-rock-red border border-rock-red/30">
                    {article.tag}
                  </span>
                  <span className="font-oswald text-[10px] tracking-widest uppercase text-rock-ash">{article.readTime}</span>
                </div>
                <div className="text-3xl mb-4">{article.emoji}</div>
                <h3 className="font-cormorant text-xl font-semibold text-rock-light mb-3 group-hover:text-rock-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="font-cormorant text-rock-light text-lg leading-relaxed flex-1" style={{ opacity: 0.75 }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/5 text-rock-gold group-hover:gap-3 transition-all duration-300">
                  <span className="font-oswald text-[10px] tracking-widest uppercase">Читать</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* VIDEO LIBRARY */}
      <section id="videos" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-eyebrow mb-4">Полезно и интересно</p>
            <h2 className="section-title"><em>Видосы</em></h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Поёт тренер", "Поют ученики", "Полезные видосики"].map((tab) => (
                <span key={tab} className="font-oswald text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-white/15 text-rock-ash">
                  {tab}
                </span>
              ))}
            </div>
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
                  ) : video.youtubeId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full border-2 border-rock-red flex items-center justify-center group-hover:bg-rock-red/20 transition-all">
                        <Icon name="Play" size={20} className="text-rock-light ml-1" />
                      </div>
                      <span className="font-oswald text-xs tracking-widest uppercase text-rock-gold">Смотреть</span>
                    </div>
                  )}
                  {!video.youtubeId && (
                    <div className="absolute top-3 left-3">
                      <span className="font-oswald text-[9px] tracking-widest uppercase px-2 py-1 bg-black/60 text-rock-ash border border-white/10">
                        {video.category}
                      </span>
                    </div>
                  )}
                  {!video.locked && !video.youtubeId && video.duration && (
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
                  {video.category === "Поёт тренер" && (
                    <p className="font-oswald text-[11px] tracking-widest uppercase text-rock-gold mt-2">Артман звучит</p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <WaveDivider />

      {/* THERAPY */}
      <section id="therapy" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#221440" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: "rgba(123,79,191,0.1)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <p className="section-eyebrow mb-4">Приложение</p>
            <h2 className="section-title mb-6">
              Лечим <em>музыкой</em>
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

      <WaveDivider />

      {/* GALLERY */}
      <GallerySection />

      <WaveDivider />

      {/* CONSULTATION */}
      <section id="consultation" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#221440" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rock-gold/40 to-transparent" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(149,79,255,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <p className="section-eyebrow mb-4">Первый шаг</p>
          <h2 className="section-title mb-4">Запись на <em>консультацию</em></h2>
          <p className="font-cormorant text-rock-light text-xl leading-relaxed mb-10" style={{ opacity: 0.8 }}>
            Бесплатная 30-минутная консультация — разберём ваш запрос и подберём программу. Напишите нам в Telegram, и мы ответим быстро.
          </p>
          <button
            onClick={() => {
              const text = encodeURIComponent("Здравствуйте! Хочу записаться на консультацию.");
              window.open(`https://t.me/ARTMANANDCO?text=${text}`, "_blank");
            }}
            className="btn-gold inline-flex items-center gap-3 text-xl px-12 py-5"
          >
            <Icon name="Send" size={22} />
            Написать в Telegram
          </button>
          <div className="mt-6 flex items-center justify-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/429fc65a-c09b-4fce-bc57-ee015a0e2c10.png"
              alt="QR @ARTMANANDCO"
              className="w-24 h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <div className="text-left">
              <p className="font-oswald text-rock-gold tracking-widest text-sm uppercase">@ARTMANANDCO</p>
              <p className="font-cormorant text-rock-ash text-base mt-1">или отсканируй QR-код</p>
            </div>
          </div>
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
              <p className="font-oswald text-xs tracking-[0.3em] uppercase text-rock-gold mb-5">О тренере</p>
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
              src="https://cdn.poehali.dev/projects/2c2649a4-f97e-4608-8ac1-4bd4de8bd9d6/bucket/766c35a9-598b-447d-8ef7-d7847646fb48.png"
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
    </>
  );
}