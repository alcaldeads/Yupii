"use client";

import { useState, useMemo } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas } from "@/components/Icons";

type CatInfo = {
  cat: string;
  nombre: string;
  slug: string;
  descripcion: string;
};

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
    <div className="exp-page-wrap">
      {/* Ambient background */}
      <div className="exp-ambient" style={gradiente ? { background: gradiente } : undefined} />
      <div className="exp-ambient-orb exp-orb-1" />
      <div className="exp-ambient-orb exp-orb-2" />

      {/* Hero */}
      <section className="exp-hero-full">
        {videoUrl && (
          <div className="exp-hero-video-wrap">
            <video autoPlay muted loop playsInline preload="auto" className="exp-hero-video">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        )}
        <div className="exp-hero-overlay" />
        <div className="exp-hero-content">
          <a href="/" className="exp-hero-back">← Yupii</a>
          <h1>{cat.nombre}</h1>
          <p>{cat.descripcion}</p>
          <div className="exp-hero-stat">
            {productos.length} experiencia{productos.length !== 1 ? "s" : ""} disponibles
          </div>
        </div>
        <div className="exp-hero-fade" />
      </section>

      {/* Sticky filter bar */}
      <div className="exp-filter-bar">
        <div className="exp-filter-inner">
          {/* Zone pills */}
          {zonas.length > 0 && (
            <div className="exp-filter-group">
              <button
                className={`exp-pill${!zona ? " active" : ""}`}
                onClick={() => setZona(null)}
              >
                Todas las zonas
              </button>
              {zonas.map((z) => (
                <button
                  key={z}
                  className={`exp-pill${zona === z ? " active" : ""}`}
                  onClick={() => setZona(zona === z ? null : z)}
                >
                  {z}
                </button>
              ))}
            </div>
          )}

          {/* Type pills */}
          {tipos.length > 0 && (
            <div className="exp-filter-group">
              {tipos.map((t) => (
                <button
                  key={t}
                  className={`exp-pill exp-pill-type${tipo === t ? " active" : ""}`}
                  onClick={() => setTipo(tipo === t ? null : t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Sort + clear */}
          <div className="exp-filter-right">
            <select
              className="exp-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="recomendados">Recomendados</option>
              <option value="precio-asc">Precio ↑</option>
              <option value="precio-desc">Precio ↓</option>
              <option value="rating">Rating</option>
            </select>
            {hasFilters && (
              <button className="exp-clear" onClick={clearFilters}>Limpiar</button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="exp-results">
        <div className="exp-results-info">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          {zona ? ` en ${zona}` : ""}
          {tipo ? ` · ${tipo}` : ""}
        </div>

        {filtered.length === 0 ? (
          <div className="exp-empty">
            <p>No encontramos experiencias con esos filtros</p>
            <button onClick={clearFilters}>Ver todas</button>
          </div>
        ) : (
          <div className="exp-grid">
            {filtered.map((p, i) => (
              <a
                key={p.id}
                href={`/experiencia/${p.slug}`}
                className="exp-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="exp-card-img">
                  <div
                    className="exp-card-bg"
                    style={{ backgroundImage: `url(${p.imagen})` }}
                  />
                  <div className="exp-card-img-shade" />
                  {p.etiqueta && (
                    <span className={`exp-card-badge${p.etiqueta === "Exclusivo" ? " exclusive" : ""}${p.etiqueta.startsWith("Temporada") ? " season" : ""}`}>
                      {p.etiqueta}
                    </span>
                  )}
                  <span className="exp-card-rating">
                    <Estrella size={11} /> {p.rating.toFixed(1)}
                  </span>
                </div>
                <div className="exp-card-body">
                  <h3>{p.titulo}</h3>
                  <p className="exp-card-desc">{p.descripcion}</p>
                  <div className="exp-card-meta">
                    <span><Pin size={11} /> {p.lugar}</span>
                    <span><Personas size={11} /> {p.personas} pers.</span>
                  </div>
                  {p.tipo && <span className="exp-card-type">{p.tipo}</span>}
                  <div className="exp-card-price">
                    <strong>{rd(p.precio)}</strong>
                    {p.precioAntes > 0 && <span className="exp-card-old">{rd(p.precioAntes)}</span>}
                    <span className="exp-card-for">para {p.personas}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="exp-foot">
        <a href="/">← Volver a Yupii</a>
        <span>© 2026 Yupii®</span>
      </footer>
    </div>
  );
}
