"use client";

import { useState, useMemo } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas } from "@/components/Icons";

type CatInfo = { cat: string; nombre: string; slug: string; descripcion: string };
type Sort = "recomendados" | "precio-asc" | "precio-desc" | "rating";
type Mode = "giftboxes" | "experiencias";

type Props = {
  cat: CatInfo;
  productos: Producto[];
  zonas: string[];
  tipos: string[];
  videoUrl?: string;
  gradiente?: string;
};

export default function ExplorarClient({ cat, productos, zonas, tipos, videoUrl, gradiente }: Props) {
  const [mode, setMode] = useState<Mode>("giftboxes");
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

  const precioDesde = Math.min(...productos.map((p) => p.precio));
  const avgRating = productos.reduce((s, p) => s + p.rating, 0) / productos.length;

  return (
    <div className="xpl">

      {/* Hero — Cinematic for Gastronomía, standard for the rest */}
      {cat.slug === "gastronomia" ? (
        <section className="gastro-cinema">
          {videoUrl ? (
            <video className="gastro-cinema-bg" autoPlay muted loop playsInline preload="auto">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="gastro-cinema-bg" style={{ background: gradiente ?? "linear-gradient(135deg,#6E2C00,#D68910)" }} />
          )}
          <div className="gastro-cinema-shade" />
          <div className="gastro-cinema-inner">
            <div className="gastro-cinema-left">
              <a href="/" className="xpl-back">← Yupii</a>
              <p className="gastro-cinema-tag">Gastronomía · República Dominicana</p>
              <h1 className="gastro-cinema-title">
                Donde el sabor<br />se convierte en<br />recuerdo
              </h1>
              <p className="gastro-cinema-desc">
                {productos.length} experiencias gastronómicas. Desde cenar en un cenote iluminado hasta el único Relais &amp; Châteaux del país.
              </p>
              <a href="#tipo-selector" className="gastro-cinema-cta">
                Explorar experiencias ↓
              </a>
            </div>
            <div className="gastro-cinema-cards">
              {[...productos]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 4)
                .map((p) => (
                  <a key={p.id} href={`/experiencia/${p.slug}`} className="gastro-card">
                    <div className="gastro-card-img">
                      <img src={p.imagen} alt={p.titulo} loading="eager" />
                    </div>
                    <div className="gastro-card-info">
                      <div className="gastro-card-name">{p.titulo}</div>
                      <div className="gastro-card-loc">{p.lugar}</div>
                      <div className="gastro-card-bottom">
                        <span className="gastro-card-stars">★ {p.rating.toFixed(1)}</span>
                        <span className="gastro-card-price">{rd(p.precio)}</span>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
          <div className="gastro-cinema-scroll">
            <span>Desplázate para explorar</span>
            <div className="gastro-cinema-arrow">↓</div>
          </div>
        </section>
      ) : (
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
            <p className="xpl-hero-sub">{productos.length} opciones disponibles</p>
            <a href="#tipo-selector" className="xpl-hero-btn">Explorar ↓</a>
          </div>
        </section>
      )}

      {/* Type selector */}
      <div className="xpl-type-selector" id="tipo-selector">
        <div className="xpl-type-inner">
          <button
            className={`xpl-type-btn${mode === "giftboxes" ? " active" : ""}`}
            onClick={() => setMode("giftboxes")}
          >
            <span className="xpl-type-icon">🎁</span>
            <div className="xpl-type-text">
              <strong>GiftBoxes</strong>
              <span>El destinatario elige su experiencia</span>
            </div>
          </button>
          <button
            className={`xpl-type-btn${mode === "experiencias" ? " active" : ""}`}
            onClick={() => setMode("experiencias")}
          >
            <span className="xpl-type-icon">⚡</span>
            <div className="xpl-type-text">
              <strong>Experiencias</strong>
              <span>Compra directa de una experiencia</span>
            </div>
          </button>
        </div>
      </div>

      {/* GIFTBOXES MODE */}
      {mode === "giftboxes" && (
        <main className="xpl-main">
          <p className="xpl-count">1 GiftBox de {cat.nombre}</p>
          <div className="xpl-giftbox-hero">
            <div className="xpl-giftbox-img">
              <img src={productos[0]?.imagen} alt={`GiftBox ${cat.nombre}`} />
              <div className="xpl-giftbox-overlay" />
              <div className="xpl-giftbox-label">
                <span>🎁</span> GiftBox
              </div>
            </div>
            <div className="xpl-giftbox-body">
              <div className="xpl-giftbox-tag">Más popular</div>
              <h2>GiftBox {cat.nombre}</h2>
              <p className="xpl-giftbox-desc">
                Regala libertad. El destinatario recibe un código y elige su experiencia favorita
                entre las {productos.length} opciones de {cat.nombre} disponibles en Yupii.
              </p>

              <div className="xpl-giftbox-stats">
                <div className="xpl-giftbox-stat">
                  <strong>{productos.length}</strong>
                  <span>experiencias incluidas</span>
                </div>
                <div className="xpl-giftbox-stat">
                  <strong>★ {avgRating.toFixed(1)}</strong>
                  <span>rating promedio</span>
                </div>
                <div className="xpl-giftbox-stat">
                  <strong>12 meses</strong>
                  <span>validez del código</span>
                </div>
              </div>

              <div className="xpl-giftbox-includes">
                <p className="xpl-giftbox-includes-title">Incluye experiencias como:</p>
                <div className="xpl-giftbox-previews">
                  {productos.slice(0, 4).map((p) => (
                    <div key={p.id} className="xpl-giftbox-preview">
                      <img src={p.imagen} alt={p.titulo} />
                      <span>{p.titulo}</span>
                    </div>
                  ))}
                  {productos.length > 4 && (
                    <div className="xpl-giftbox-preview xpl-giftbox-more">
                      +{productos.length - 4} más
                    </div>
                  )}
                </div>
              </div>

              <div className="xpl-giftbox-cta">
                <div className="xpl-giftbox-precio">
                  <span className="xpl-giftbox-desde">Desde</span>
                  <strong>{rd(precioDesde)}</strong>
                </div>
                <button className="btn-lleno xpl-giftbox-btn">Regalar este GiftBox</button>
              </div>

              <p className="xpl-giftbox-trust">✓ Entrega inmediata · ✓ Código canjeable · ✓ Cancelación flexible</p>
            </div>
          </div>
        </main>
      )}

      {/* EXPERIENCIAS MODE */}
      {mode === "experiencias" && (
        <>
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

          <main className="xpl-main">
            <p className="xpl-count">
              {filtered.length} experiencia{filtered.length !== 1 ? "s" : ""} de {cat.nombre}
              {zona ? ` · ${zona}` : ""}{tipo ? ` · ${tipo}` : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="xpl-empty">
                <p>Sin resultados con esos filtros</p>
                <button onClick={clearFilters}>Ver todas</button>
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
        </>
      )}

      <footer className="xpl-foot">
        <a href="/">← Volver a Yupii</a>
        <span>© 2026 Yupii®</span>
      </footer>
    </div>
  );
}
