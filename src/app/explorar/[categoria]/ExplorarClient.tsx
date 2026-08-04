"use client";

import { useState, useMemo } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas } from "@/components/Icons";

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

  // First card is hero size in bento
  const heroCard = filtered[0];
  const restCards = filtered.slice(1);

  return (
    <div className="xpl">
      {/* Hero */}
      <section className="xpl-hero">
        {videoUrl && (
          <video className="xpl-hero-vid" autoPlay muted loop playsInline preload="auto">
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {!videoUrl && gradiente && <div className="xpl-hero-grad" style={{ background: gradiente }} />}
        <div className="xpl-hero-shade" />
        <div className="xpl-hero-inner">
          <a href="/" className="xpl-back">← Yupii</a>
          <h1>{cat.nombre}</h1>
          <p>{cat.descripcion}</p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="xpl-bar">
        <div className="xpl-bar-in">
          <div className="xpl-pills">
            {zonas.length > 0 && zonas.map((z) => (
              <button key={z} className={`xpl-pill${zona === z ? " on" : ""}`} onClick={() => setZona(zona === z ? null : z)}>{z}</button>
            ))}
            {tipos.length > 0 && (
              <>
                <span className="xpl-sep" />
                {tipos.map((t) => (
                  <button key={t} className={`xpl-pill xpl-pill-t${tipo === t ? " on" : ""}`} onClick={() => setTipo(tipo === t ? null : t)}>{t}</button>
                ))}
              </>
            )}
          </div>
          <div className="xpl-bar-r">
            <select className="xpl-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="recomendados">Recomendados</option>
              <option value="precio-asc">Precio ↑</option>
              <option value="precio-desc">Precio ↓</option>
              <option value="rating">Rating</option>
            </select>
            {hasFilters && <button className="xpl-clear" onClick={clearFilters}>Limpiar</button>}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="xpl-main">
        <p className="xpl-count">{filtered.length} experiencia{filtered.length !== 1 ? "s" : ""}{zona ? ` en ${zona}` : ""}{tipo ? ` · ${tipo}` : ""}</p>

        {filtered.length === 0 ? (
          <div className="xpl-empty">
            <p>Sin resultados con esos filtros</p>
            <button onClick={clearFilters}>Ver todas</button>
          </div>
        ) : (
          <div className="xpl-bento">
            {/* Hero card — double size */}
            {heroCard && (
              <a href={`/experiencia/${heroCard.slug}`} className="xpl-card xpl-card-hero">
                <div className="xpl-card-img">
                  <img src={heroCard.imagen} alt={heroCard.titulo} loading="eager" />
                  <div className="xpl-card-over" />
                  <div className="xpl-card-info">
                    {heroCard.etiqueta && <span className={`xpl-badge${heroCard.etiqueta === "Exclusivo" ? " exc" : ""}`}>{heroCard.etiqueta}</span>}
                    <div className="xpl-card-bottom-info">
                      <h3>{heroCard.titulo}</h3>
                      <p>{heroCard.historia || heroCard.descripcion}</p>
                      <div className="xpl-card-row">
                        <span className="xpl-rating"><Estrella size={13} /> {heroCard.rating.toFixed(1)}</span>
                        <span className="xpl-loc"><Pin size={11} /> {heroCard.lugar}</span>
                        <strong className="xpl-price">{rd(heroCard.precio)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Rest of cards */}
            {restCards.map((p, i) => (
              <a key={p.id} href={`/experiencia/${p.slug}`} className={`xpl-card xpl-card-std${(i + 1) % 5 === 0 ? " xpl-card-wide" : ""}`}>
                <div className="xpl-card-img">
                  <img src={p.imagen} alt={p.titulo} loading="lazy" />
                  <div className="xpl-card-over" />
                  <div className="xpl-card-info">
                    {p.etiqueta && <span className={`xpl-badge${p.etiqueta === "Exclusivo" ? " exc" : ""}`}>{p.etiqueta}</span>}
                    <div className="xpl-card-bottom-info">
                      <h3>{p.titulo}</h3>
                      <div className="xpl-card-row">
                        <span className="xpl-rating"><Estrella size={11} /> {p.rating.toFixed(1)}</span>
                        <span className="xpl-loc"><Pin size={10} /> {p.lugar}</span>
                        <strong className="xpl-price">{rd(p.precio)}</strong>
                        {p.precioAntes > 0 && <span className="xpl-old">{rd(p.precioAntes)}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="xpl-foot">
        <a href="/">← Volver a Yupii</a>
        <span>© 2026 Yupii®</span>
      </footer>
    </div>
  );
}
