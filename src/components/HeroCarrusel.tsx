"use client";

import { useCallback, useEffect, useState } from "react";
import { Chevron } from "./Icons";

const SLIDES = [
  {
    fondo: "linear-gradient(135deg, #0a0a2e 0%, #1B1B4E 30%, #3A2A8B 65%, #5B3DF5 100%)",
    marca: "experiencias yupii",
    titulo: "Regala algo que se siente, no algo que se guarda",
    texto: "Más de 50 experiencias únicas en República Dominicana. Desde paracaídas hasta cenas de chef.",
    pill: "Explorar catálogo",
    href: "#aventura",
  },
  {
    fondo: "linear-gradient(135deg, #01242e 0%, #03464D 30%, #0B7E7B 65%, #17C3B8 100%)",
    marca: "aventura",
    titulo: "Salta en paracaídas sobre Punta Cana",
    texto: "10,000 pies. Caída libre. Video incluido. La experiencia más regalada del país.",
    pill: "Ver experiencia",
    href: "#aventura",
  },
  {
    fondo: "linear-gradient(135deg, #1a0a2e 0%, #3C1652 30%, #6b3a80 65%, #B07BAC 100%)",
    marca: "bienestar",
    titulo: "Un ritual de spa que no se olvida",
    texto: "Masaje a cuatro manos, jacuzzi, espumante. El regalo perfecto para quien lo merece todo.",
    pill: "Descubrir",
    href: "#bienestar",
  },
  {
    fondo: "linear-gradient(135deg, #2a1a0a 0%, #4A2F0B 30%, #8A5D22 65%, #E0A026 100%)",
    marca: "empresas",
    titulo: "Regala experiencias a tu equipo, no tazas",
    texto: "Tú fijas el presupuesto. Cada quien elige su experiencia. Dashboard de seguimiento incluido.",
    pill: "Pedir propuesta",
    href: "#corpo",
  },
];

export default function HeroCarrusel() {
  const [i, setI] = useState(0);
  const [pausa, setPausa] = useState(0);

  const ir = useCallback((n: number) => {
    setI((x) => (x + n + SLIDES.length) % SLIDES.length);
    setPausa((p) => p + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, [pausa]);

  return (
    <section className="hero wrap">
      <button className="hero-flecha izq" onClick={() => ir(-1)} aria-label="Anterior">
        <Chevron dir="izq" size={18} />
      </button>

      <div className="hero-pista">
        <div className="hero-riel" style={{ transform: `translateX(-${i * 100}%)` }}>
          {SLIDES.map((s) => (
            <div className="slide" key={s.titulo} style={{ background: s.fondo }}>
              <div className="slide-inner">
                <div className="marca">{s.marca}</div>
                <h2>{s.titulo}</h2>
                <p>{s.texto}</p>
                <a className="pill" href={s.href}>
                  {s.pill}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="hero-flecha der" onClick={() => ir(1)} aria-label="Siguiente">
        <Chevron dir="der" size={18} />
      </button>

      <div className="hero-puntos">
        {SLIDES.map((s, k) => (
          <span
            key={s.titulo}
            className={k === i ? "on" : ""}
            onClick={() => {
              setI(k);
              setPausa((p) => p + 1);
            }}
          />
        ))}
      </div>
    </section>
  );
}
