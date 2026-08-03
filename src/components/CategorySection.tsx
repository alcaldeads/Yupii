"use client";

import { useRef } from "react";
import type { CatSection } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { degradado, rd } from "@/lib/format";
import { Chevron, Corazon, Estrella, Pin, Personas } from "./Icons";

type Props = {
  section: CatSection;
  productos: Producto[];
  onAbrir: (p: Producto) => void;
};

export default function CategorySection({ section, productos, onAbrir }: Props) {
  const riel = useRef<HTMLDivElement>(null);

  const desplazar = (n: number) =>
    riel.current?.scrollBy({ left: n * 300, behavior: "smooth" });

  if (!productos.length) return null;

  return (
    <section className="cat-section" id={section.id}>
      {/* Video background — hidden on mobile via CSS */}
      <video
        className="cat-section-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster=""
      >
        <source src={section.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient fallback (always visible, video overlays on desktop) */}
      <div className="cat-section-gradient" style={{ background: section.gradiente }} />

      {/* Dark overlay for readability */}
      <div className="cat-section-overlay" />

      {/* Content on top */}
      <div className="cat-section-content">
        <div className="wrap">
          <h2 className="cat-section-title">{section.titulo}</h2>

          <div className="cat-section-riel-wrap">
            <button
              className="cat-riel-flecha izq"
              onClick={() => desplazar(-1)}
              aria-label="Anterior"
            >
              <Chevron dir="izq" size={17} />
            </button>

            <div className="cat-section-riel" ref={riel}>
              {productos.map((p) => (
                <button
                  key={p.id}
                  className="glass-card"
                  onClick={() => onAbrir(p)}
                >
                  <div className="glass-card-foto">
                    <div
                      className="glass-card-fondo"
                      style={{ background: degradado(p.colores) }}
                    />
                    <span className="glass-card-glifo">{p.glifo}</span>
                    {p.etiqueta && (
                      <span
                        className={`glass-card-etiqueta${
                          p.etiqueta === "Temporada Ene-Mar"
                            ? " temporada"
                            : p.etiqueta === "Exclusivo"
                            ? " exclusivo"
                            : ""
                        }`}
                      >
                        {p.etiqueta}
                      </span>
                    )}
                  </div>

                  <div className="glass-card-body">
                    <div className="glass-card-top">
                      <h3>{p.titulo}</h3>
                      <span className="glass-card-rating">
                        <Estrella size={12} />
                        {p.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="glass-card-meta">
                      <span>
                        <Pin size={11} />
                        {p.lugar}
                      </span>
                      <span>
                        <Personas size={11} />
                        {p.personas} pers.
                      </span>
                    </div>

                    <div className="glass-card-precio">
                      {rd(p.precio)}
                      {p.precioAntes > 0 && (
                        <span className="glass-card-antes">{rd(p.precioAntes)}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              className="cat-riel-flecha der"
              onClick={() => desplazar(1)}
              aria-label="Siguiente"
            >
              <Chevron dir="der" size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
