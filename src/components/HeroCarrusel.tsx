"use client";

import { useCallback, useEffect, useState } from "react";
import { Chevron } from "./Icons";

const SLIDES = [
  {
    fondo: "linear-gradient(105deg,#1B1B2E 0%,#3A2A6B 48%,#5B3DF5 100%)",
    marca: "ciclos yupii",
    titulo: "Mesa del chef en la Zona Colonial",
    texto: "Ocho tiempos, maridaje y cocina abierta. Solo 12 asientos por noche.",
    pill: "Cupos limitados",
  },
  {
    fondo: "linear-gradient(105deg,#03363D 0%,#0B6E6B 45%,#17A398 100%)",
    marca: "aventura",
    titulo: "Salta en paracaídas sobre Punta Cana",
    texto: "Tándem desde 10,000 pies, con video incluido. Todos los días.",
    pill: "Reserva online",
  },
  {
    fondo: "linear-gradient(105deg,#4A1F0B 0%,#8A3D12 45%,#E07A26 100%)",
    marca: "empresas",
    titulo: "Regala a tu equipo sin regalar tazas",
    texto: "Un monto, cientos de experiencias. Cada quien elige la suya.",
    pill: "Pedir propuesta",
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
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
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
              <div>
                <div className="marca">{s.marca}</div>
                <h2>{s.titulo}</h2>
                <p>{s.texto}</p>
                <span className="pill">{s.pill}</span>
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
