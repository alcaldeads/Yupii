"use client";

import { useRef } from "react";
import type { CatSection } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Chevron, Estrella, Pin, Personas } from "./Icons";

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
      {/* Video de fondo — YouTube o MP4 */}
      {section.youtubeId ? (
        <iframe
          className="cat-section-video-bg"
          src={`https://www.youtube.com/embed/${section.youtubeId}?autoplay=1&mute=1&start=${section.youtubeStart || 0}&loop=1&playlist=${section.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          tabIndex={-1}
          title=""
          aria-hidden="true"
        />
      ) : section.videoUrl ? (
        <video
          className="cat-section-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={section.videoUrl} type="video/mp4" />
        </video>
      ) : null}

      {/* Gradient fallback (behind video) */}
      <div className="cat-section-gradient" style={{ background: section.gradiente }} />

      {/* Overlay oscuro */}
      <div className="cat-section-overlay" />

      {/* Contenido encima */}
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
                <a
                  key={p.id}
                  className="glass-card"
                  href={`/experiencia/${p.slug}`}
                >
                  <div className="glass-card-foto">
                    <div
                      className="glass-card-fondo"
                      style={{
                        backgroundImage: `url(${p.imagen})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="glass-card-foto-overlay" />
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
                </a>
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
