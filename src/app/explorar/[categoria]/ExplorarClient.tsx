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

  return (
    <div className="xpl">

      {/* Hero — cinematic */}
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
          <p className="xpl-hero-sub">{productos.length} GiftBox{productos.length !== 1 ? "es" : ""} disponibles</p>
          <a href="#giftboxes" className="xpl-hero-btn">Explorar GiftBoxes ↓</a>
        </div>
      </section>

      {/* Filter bar */}
      <div className="xpl-bar" id="giftboxes">
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

      {/* Grid */}
      <main className="xpl-main">
        <p className="xpl-count">
          {filtered.length} GiftBox{filtered.length !== 1 ? "es" : ""} de {cat.nombre}
          {zona ? ` · ${zona}` : ""}
          {tipo ? ` · ${tipo}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="xpl-empty">
            <p>Sin resultados con esos filtros</p>
            <button onClick={clearFilters}>Ver todos</button>
          </div>
        ) : (
          <div className="xpl-grid">
            {filtered.map((p) => (
              <a key={p.id} href={`/experiencia/${p.slug}`} className="xpl-card">
                <div className="xpl-card-img">
                  <img src={p.imagen} alt={p.titulo} loading="lazy" />
                  {p.etiqueta && (
                    <span className={`xpl-badge${p.etiqueta === "Exclusivo" ? " exc" : ""}`}>
                      {p.etiqueta}
                    </span>
                  )}
                </div>
                <div className="xpl-card-body">
                  <h3 className="xpl-card-title">{p.titulo}</h3>
                  <div className="xpl-card-meta">
                    <span className="xpl-rating"><Estrella size={11} /> {p.rating.toFixed(1)}</span>
                    <span className="xpl-loc"><Pin size={10} /> {p.lugar}</span>
                  </div>
                  <div className="xpl-card-footer">
                    <div className="xpl-card-precio">
                      <strong>{rd(p.precio)}</strong>
                      {p.precioAntes > 0 && <span className="xpl-old">{rd(p.precioAntes)}</span>}
                    </div>
                    <span className="xpl-personas-tag">
                      <Personas size={11} /> {p.personas} persona{p.personas > 1 ? "s" : ""}
                    </span>
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
