import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import HeroAboutSections from "./HeroAboutSections";
import ContentSections from "./ContentSections";
import AnimatedWaveCanvas from "@/components/AnimatedWaveCanvas";

function WaveDivider() {
  return (
    <div style={{ marginTop: "-1px", marginBottom: "-1px", lineHeight: 0, opacity: 0.6 }}>
      <AnimatedWaveCanvas height={48} />
    </div>
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
      <NavBar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroAboutSections />
      <WaveDivider />
      <ContentSections
        formData={formData}
        setFormData={setFormData}
        formSent={formSent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}