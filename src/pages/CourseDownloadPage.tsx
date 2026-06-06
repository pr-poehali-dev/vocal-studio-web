import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const COURSE_FILES_URL = "https://functions.poehali.dev/b68db5f3-92c6-4bc5-b442-2895e0e32a0b";

interface CourseFile {
  name: string;
  url: string;
  type: "pdf" | "audio" | "other";
  size: number;
}

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  if (bytes > 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${bytes} Б`;
}

export default function CourseDownloadPage() {
  const [files, setFiles] = useState<CourseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(COURSE_FILES_URL)
      .then((r) => r.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Не удалось загрузить список файлов. Попробуйте позже.");
        setLoading(false);
      });
  }, []);

  const pdfs = files.filter((f) => f.type === "pdf");
  const audios = files.filter((f) => f.type === "audio");

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, transparent 100%)" }}>
        <Link to="/" className="flex items-center gap-2 text-rock-ash hover:text-rock-gold transition-colors font-oswald tracking-widest text-sm uppercase">
          <Icon name="ChevronLeft" size={18} />
          На главную
        </Link>
      </header>

      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-eyebrow mb-4">Ваши материалы</p>
          <h1 className="leading-tight mb-4 uppercase"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textShadow: "0 0 20px rgba(149,79,255,0.6)"
            }}>
            Фонический <em style={{ color: "#c9a227" }}>резонанс</em>
          </h1>
          <p className="font-cormorant text-rock-ash text-lg">Нажмите на файл для скачивания</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 border-2 border-rock-gold/30 border-t-rock-gold rounded-full animate-spin mb-4" />
              <p className="text-rock-ash font-cormorant text-lg">Загружаем файлы...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <Icon name="AlertCircle" size={40} className="text-rock-red mx-auto mb-4" />
              <p className="text-rock-ash font-cormorant text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && files.length === 0 && (
            <div className="text-center py-20">
              <Icon name="FolderOpen" size={48} className="text-rock-ash mx-auto mb-4" style={{ opacity: 0.4 }} />
              <p className="text-rock-ash font-cormorant text-xl">Файлы ещё загружаются. Скоро появятся здесь.</p>
            </div>
          )}

          {pdfs.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">📄</span>
                <h2 className="font-oswald text-rock-light text-xl tracking-wider uppercase">Материалы PDF</h2>
              </div>
              <div className="space-y-3">
                {pdfs.map((file, i) => (
                  <a
                    key={i}
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-rock p-5 flex items-center gap-4 hover:border-rock-gold/40 transition-all duration-300 hover:-translate-y-0.5 group no-underline block"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center"
                      style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)" }}>
                      <Icon name="FileText" size={18} className="text-rock-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-oswald text-rock-light tracking-wide truncate group-hover:text-rock-gold transition-colors">{file.name}</div>
                      <div className="text-rock-ash font-cormorant text-sm">{formatSize(file.size)}</div>
                    </div>
                    <Icon name="Download" size={18} className="text-rock-ash group-hover:text-rock-gold transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {audios.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🎵</span>
                <h2 className="font-oswald text-rock-light text-xl tracking-wider uppercase">Аудио-дорожки</h2>
              </div>
              <div className="space-y-3">
                {audios.map((file, i) => (
                  <a
                    key={i}
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-rock p-5 flex items-center gap-4 hover:border-rock-gold/40 transition-all duration-300 hover:-translate-y-0.5 group no-underline block"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center"
                      style={{ background: "rgba(149,79,255,0.1)", border: "1px solid rgba(149,79,255,0.3)" }}>
                      <Icon name="Music" size={18} className="text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-oswald text-rock-light tracking-wide truncate group-hover:text-rock-gold transition-colors">{file.name}</div>
                      <div className="text-rock-ash font-cormorant text-sm">{formatSize(file.size)}</div>
                    </div>
                    <Icon name="Download" size={18} className="text-rock-ash group-hover:text-rock-gold transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}