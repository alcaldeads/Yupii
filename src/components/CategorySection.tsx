"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { CatSection } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Chevron, Estrella, Pin, Personas } from "./Icons";

/* ------------------------------------------------------------------ */
/*  YouTube Background — invisible until playing, then fades in        */
/* ------------------------------------------------------------------ */
function YouTubeBg({ videoId, start = 0 }: { videoId: string; start?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const init = useCallback(() => {
    if (!ref.current) return;
    const el = document.createElement("div");
    el.id = `ytbg-${videoId}-${Math.random().toString(36).slice(2, 7)}`;
    ref.current.appendChild(el);

    const YT = (window as unknown as { YT: { Player: new (id: string, opts: unknown) => unknown } }).YT;
    new YT.Player(el.id, {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        disablekb: 1,
        fs: 0,
        start,
        loop: 1,
        playlist: videoId,
      },
      events: {
        onStateChange: (e: { data: number }) => {
          // 1 = playing
          if (e.data === 1) setPlaying(true);
        },
      },
    });
  }, [videoId, start]);

  useEffect(() => {
    const w = window as unknown as { YT?: { Player?: unknown }; onYouTubeIframeAPIReady?: () => void };
    if (w.YT?.Player) {
      init();
      return;
    }
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      init();
    };
  }, [init]);

  return (
    <div
      ref={ref}
      className={`cat-section-yt-wrap${playing ? " visible" : ""}`}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
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
      {/* YouTube background — invisible until playing */}
      {section.youtubeId && (
        <YouTubeBg videoId={section.youtubeId} start={section.youtubeStart} />
      )}

      {/* MP4 video (if no YouTube) */}
      {!section.youtubeId && section.videoUrl && (
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
      )}

      {/* Gradient fallback — always visible behind video */}
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
