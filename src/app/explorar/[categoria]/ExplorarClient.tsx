"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas } from "@/components/Icons";

const ExploreBackground = dynamic(
  () => import("@/components/three/ExploreBackground"),
  { ssr: false }
);

type CatInfo = { cat: string; nombre: string; slug: string; descripcion: string };
type Sort = "recomendados" | "precio-asc" | "precio-desc" | "rating";
type Props = {
  cat: CatInfo;
  productos: Producto[];
  zonas: string[];
  tipos: string[];
  videoUrl?: string;
  gradiente?: string;
};

export default function ExplorarClient({ cat, productos, zonas, tipos, videoUrl, gradiente }: Props) {
  const [zona, setZona] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("recomendados");

  // Featured = top 4 by rating (unfiltered, always shown in showcase)
  const featured = useMemo(() =>
    [...productos].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [productos]
  );

  // Filtered for grid
  const filtered = useMemo(() => {
    let result = [...productos];
    if (zona) result = result.filter((p) => p.zona === zona);
    if (tipo) result = result.filter((p) => p.tipo === tipo);
    switch (sort) {
      case "precio-asc": result.sort((a, b) => a.precio - b.precio); break;
      case "precio-desc": result.sort((a, b) => b.precio - a.precio); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [productos, zona, tipo, sort]);

  const clearFilters = () => { setZona(null); setTipo(null); setSort("recomendados"); };
  const hasFilters = zona || tipo || sort !== "recomendados";

  return (
    <div className="showcase">
      <ExploreBackground />
      {/* ─── HERO ─── */}
      <section className="sc-hero">
        {videoUrl && (
          <video className="sc-hero-video" autoPlay muted loop playsInline preload="auto">
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {!videoUrl && gradiente && <div className="sc-hero-grad" style={{ background: gradiente }} />}
        <div className="sc-hero-overlay" />
        <div className="sc-hero-content">
          <a href="/" className="sc-back">← Yupii</a>
          <h1>{cat.nombre}</h1>
          <p>{cat.descripcion}</p>
          <div className="sc-hero-scroll-hint">
            <span>Desliza para descubrir</span>
            <div className="sc-scroll-line" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED SHOWCASE: each experience = full section ─── */}
      {featured.map((p, i) => (
        <section key={p.id} className={`sc-exp${i % 2 === 1 ? " sc-exp-flip" : ""}`}>
          <div className="sc-exp-image">
            <img src={p.imagen} alt={p.titulo} loading={i < 2 ? "eager" : "lazy"} />
          </div>
          <div className="sc-exp-content">
            <span className="sc-exp-tag">
              {p.lugar} · {p.personas} persona{p.personas > 1 ? "s" : ""}
            </span>
            <h2 className="sc-exp-title">{p.titulo}</h2>
            <p className="sc-exp-body">{p.historia || p.descripcion}</p>
            <div className="sc-exp-details">
              <span className="sc-exp-rating"><Estrella size={14} /> {p.rating.toFixed(1)}</span>
              <span className="sc-exp-price">{rd(p.precio)}</span>
              {p.precioAntes > 0 && <span className="sc-exp-old">{rd(p.precioAntes)}</span>}
            </div>
            <a href={`/experiencia/${p.slug}`} className="sc-exp-cta">
              Ver experiencia →
            </a>
          </div>
        </section>
      ))}

      {/* ─── ALL EXPERIENCES GRID ─── */}
      <section className="sc-grid-section" id="todas">
        <div className="sc-grid-wrap">
          <div className="sc-grid-header">
            <h2>Todas las experiencias</h2>
            <p>{productos.length} experiencias en {cat.nombre}</p>
          </div>

          {/* Filters */}
          {(zonas.length > 0 || tipos.length > 0) && (
            <div className="sc-filters">
              <div className="sc-filter-row">
                {zonas.length > 0 && zonas.map((z) => (
                  <button
                    key={z}
                    className={`sc-pill${zona === z ? " on" : ""}`}
                    onClick={() => setZona(zona === z ? null : z)}
                  >
                    {z}
                  </button>
                ))}
                {tipos.length > 0 && tipos.map((t) => (
                  <button
                    key={t}
                    className={`sc-pill sc-pill-t${tipo === t ? " on" : ""}`}
                    onClick={() => setTipo(tipo === t ? null : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="sc-filter-right">
                <select className="sc-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="recomendados">Recomendados</option>
                  <option value="precio-asc">Precio ↑</option>
                  <option value="precio-desc">Precio ↓</option>
                  <option value="rating">Rating</option>
                </select>
                {hasFilters && <button className="sc-clear" onClick={clearFilters}>Limpiar</button>}
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="sc-grid">
            {filtered.map((p) => (
              <a key={p.id} href={`/experiencia/${p.slug}`} className="sc-card">
                <div className="sc-card-img">
                  <img src={p.imagen} alt={p.titulo} loading="lazy" />
                  <span className="sc-card-rating"><Estrella size={10} /> {p.rating.toFixed(1)}</span>
                </div>
                <div className="sc-card-body">
                  <h3>{p.titulo}</h3>
                  <span className="sc-card-loc"><Pin size={10} /> {p.lugar}</span>
                  <div className="sc-card-bottom">
                    <strong>{rd(p.precio)}</strong>
                    {p.precioAntes > 0 && <span className="sc-card-old">{rd(p.precioAntes)}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="sc-empty">
              <p>Sin resultados con esos filtros</p>
              <button onClick={clearFilters}>Ver todas</button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="sc-foot">
        <a href="/">← Volver a Yupii</a>
        <span>© 2026 Yupii®</span>
      </footer>
    </div>
  );
}
