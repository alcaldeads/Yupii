"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { CatSection } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Chevron, Estrella, Pin, Personas } from "./Icons";

/* ------------------------------------------------------------------ */
/*  YouTube Background — uses IFrame Player API for full control       */
/* ------------------------------------------------------------------ */
function YouTubeBackground({
  videoId,
  start = 0,
}: {
  videoId: string;
  start?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const initPlayer = useCallback(() => {
    if (!containerRef.current) return;

    // Create a div for the player inside the container
    const playerDiv = document.createElement("div");
    playerDiv.id = `yt-bg-${videoId}-${Date.now()}`;
    containerRef.current.appendChild(playerDiv);

    const YT = (window as unknown as Record<string, unknown>).YT as {
      Player: new (
        el: string,
        opts: Record<string, unknown>
      ) => Record<string, unknown>;
    };

    new YT.Player(playerDiv.id, {
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
        onReady: (e: { target: { playVideo: () => void } }) => {
          e.target.playVideo();
          // Fade in after a short delay to avoid black flash
          setTimeout(() => setReady(true), 600);
        },
      },
    });
  }, [videoId, start]);

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    const w = window as unknown as Record<string, unknown>;
    if (w.YT && (w.YT as Record<string, unknown>).Player) {
      initPlayer();
      return;
    }

    // Check if script is already being loaded
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    // Wait for API to be ready
    const prev = w.onYouTubeIframeAPIReady as (() => void) | undefined;
    w.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      initPlayer();
    };
  }, [initPlayer]);

  return (
    <div
      ref={containerRef}
      className={`cat-section-youtube${ready ? " loaded" : ""}`}
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
      {/* YouTube background (if available) -- hidden on mobile via CSS */}
      {section.youtubeId && (
        <YouTubeBackground
          videoId={section.youtubeId}
          start={section.youtubeStart}
        />
      )}

      {/* MP4 video fallback (if no YouTube) */}
      {!section.youtubeId && section.videoUrl && (
        <video
          className="cat-section-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={section.videoUrl} type="video/mp4" />
        </video>
      )}

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
