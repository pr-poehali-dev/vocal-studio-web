import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SoundWaveSVG } from "./HeroAboutSections";
import { DIRECTIONS, COURSES, VIDEOS, REVIEWS, GALLERY } from "./data";

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
          <h2 className="section-title">Фото<em>галерея</em></h2>
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
            <p className="section-eyebrow mb-4">Полезно и интересно</p>
            <h2 className="section-title"><em>Видеотека</em></h2>
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

      {/* GALLERY */}
      <GallerySection />

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