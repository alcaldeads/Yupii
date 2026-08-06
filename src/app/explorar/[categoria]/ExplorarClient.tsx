"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas } from "@/components/Icons";

type CatInfo = { cat: string; nombre: string; slug: string; descripcion: string };
type Sort = "recomendados" | "precio-asc" | "precio-desc" | "rating";
type Mode = "giftboxes" | "experiencias";
type Phase = "preview" | "expanding" | "fullscreen";

type ExpanderState = {
  top: number; left: number; width: number; height: number;
  fullW: number; fullH: number;
  expanded: boolean;
  cardIdx: number; // which gastroCard is being shown
};

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

  // ── Gastronomía cinematic hero ────────────────────────────────────────────
  // queue = display order in the card strip (indices into gastroCards)
  // queue[0] is always the "active" (bigger) card and the next to expand
  // When a card expands, it moves to the END of the queue → strip shifts left
  const [phase, setPhase] = useState<Phase>("preview");
  const [expander, setExpander] = useState<ExpanderState | null>(null);
  const [queue, setQueue] = useState<number[]>([0, 1, 2, 3, 4]);

  // featuredIdx: what the HEADER shows (background image + left text + dots)
  // Only changes when a card STARTS expanding (double-rAF) — never during preview
  // This ensures header and card expansion are always in perfect sync
  const [featuredIdx, setFeaturedIdx] = useState(0);

  // Ref mirrors queue state so setTimeout callbacks never see stale values
  const queueRef = useRef<number[]>([0, 1, 2, 3, 4]);

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const gastroCards = useMemo(() =>
    cat.slug === "gastronomia"
      ? [...productos].sort((a, b) => b.rating - a.rating).slice(0, 5)
      : [],
    [productos, cat.slug]
  );

  // Initialize queue to correct length once gastroCards is known
  useEffect(() => {
    if (cat.slug !== "gastronomia" || gastroCards.length === 0) return;
    const initial = gastroCards.map((_, i) => i);
    queueRef.current = initial;
    setQueue(initial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat.slug, gastroCards.length]);

  const activeCard = gastroCards[featuredIdx] ?? null;

  // ── Phase machine ─────────────────────────────────────────────────────────
  // preview  → 1600ms: queue[0] is active (bigger). After timer:
  //   1. Capture card[0] rect at active size
  //   2. Rotate queue: [A,B,C,D,E] → [B,C,D,E,A]  (A moves to end)
  //   3. Launch expander from A's captured rect → expanding phase
  //
  // expanding → 750ms: expander animates to fullscreen.
  //   Meanwhile strip already shows [B*,C,D,E,A_shrinking] — always visible.
  //
  // fullscreen → 3000ms: expander covers hero. Strip visible underneath.
  //   After timer → dismiss expander → preview with new queue[0]=B
  useEffect(() => {
    if (cat.slug !== "gastronomia" || gastroCards.length === 0) return;
    const dur: Record<Phase, number> = { preview: 1600, expanding: 750, fullscreen: 3000 };

    const t = setTimeout(() => {
      if (phase === "preview") {
        const frontIdx = queueRef.current[0];
        if (frontIdx === undefined) return;

        const card = cardRefs.current[0]; // first card in strip = active
        const section = sectionRef.current;
        if (card && section) {
          const cr = card.getBoundingClientRect();
          const sr = section.getBoundingClientRect();

          // Rotate queue BEFORE setting expander so strip immediately reorganizes
          const newQueue = [...queueRef.current.slice(1), frontIdx];
          queueRef.current = newQueue;
          setQueue([...newQueue]);

          setExpander({
            top: cr.top - sr.top,
            left: cr.left - sr.left,
            width: cr.width,
            height: cr.height,
            fullW: sr.width,
            fullH: sr.height,
            expanded: false,
            cardIdx: frontIdx,
          });
        }
        setPhase("expanding");

      } else if (phase === "expanding") {
        setPhase("fullscreen");

      } else {
        // fullscreen done — dismiss expander, back to preview
        // Queue already rotated when we launched this expander
        setExpander(null);
        setPhase("preview");
      }
    }, dur[phase]);

    return () => clearTimeout(t);
  // gastroCards.length as dep so effect restarts if products load late
  }, [phase, cat.slug, gastroCards.length]);

  // Trigger expander expansion on next paint (FLIP technique)
  // setFeaturedIdx here so header (bg + text) changes IN SYNC with the expansion animation
  useEffect(() => {
    if (!expander || expander.expanded) return;
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        setExpander(e => e ? { ...e, expanded: true } : null);
        setFeaturedIdx(expander.cardIdx); // ← same frame as expansion starts
      });
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [expander]);

  // ── Filters / grid ────────────────────────────────────────────────────────
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

  // Jump to a specific card (user click / dot) — immediately update header too
  const jumpToCard = (cardIdx: number) => {
    const newQueue = [cardIdx, ...queueRef.current.filter(i => i !== cardIdx)];
    queueRef.current = newQueue;
    setQueue([...newQueue]);
    setExpander(null);
    setFeaturedIdx(cardIdx);
    setPhase("preview");
  };

  return (
    <div className="xpl">

      {cat.slug === "gastronomia" ? (
        <section className="gastro-cinema" ref={sectionRef}>
          {/* Base background */}
          {videoUrl ? (
            <video className="gastro-cinema-bg" autoPlay muted loop playsInline preload="auto">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="gastro-cinema-bg" style={{ background: gradiente ?? "linear-gradient(135deg,#6E2C00,#D68910)" }} />
          )}

          {/* Per-card background crossfade */}
          {gastroCards.map((p, i) => (
            <img key={p.id} src={p.imagen} alt="" aria-hidden="true"
              className={`gastro-bg-swap${featuredIdx === i ? " active" : ""}`} />
          ))}

          <div className="gastro-cinema-shade" />

          {/* ── EXPANDER ──────────────────────────────────────────────────────
              Starts at the active card's exact rect, then transitions to fill
              the full hero. Cards strip stays visible underneath (z-index 2).
          ──────────────────────────────────────────────────────────────────── */}
          {expander && (
            <div
              className={`gastro-expander${expander.expanded ? " expanded" : ""}`}
              style={expander.expanded
                ? { top: 0, left: 0, width: expander.fullW, height: expander.fullH, borderRadius: 0 }
                : { top: expander.top, left: expander.left, width: expander.width, height: expander.height, borderRadius: 22 }
              }
            >
              <img src={activeCard?.imagen} alt="" aria-hidden="true" />
              <div className="gastro-expander-shade" />
            </div>
          )}

          {/* Left text — always above everything, shows current featured card */}
          <div className="gastro-cinema-left">
            <a href="/" className="xpl-back">← Yupii</a>
            <div className="gastro-text-wrap">
              {activeCard && (
                <div key={featuredIdx} className="gastro-detail-inner">
                  <p className="gastro-detail-loc">— {activeCard.lugar}</p>
                  <h2 className="gastro-detail-name">{activeCard.titulo}</h2>
                  <p className="gastro-detail-desc">{activeCard.descripcion}</p>
                  <div className="gastro-detail-row">
                    <span className="gastro-detail-stars">★ {activeCard.rating.toFixed(1)}</span>
                    <span className="gastro-detail-price">{rd(activeCard.precio)}</span>
                  </div>
                  <a href={`/experiencia/${activeCard.slug}`} className="gastro-cinema-cta gastro-cta-detail">
                    Reservar experiencia →
                  </a>
                </div>
              )}
              <div className="gastro-dots">
                {gastroCards.map((_, i) => (
                  <button key={i}
                    className={`gastro-dot${featuredIdx === i ? " on" : ""}`}
                    onClick={() => jumpToCard(i)}
                    aria-label={`Ver experiencia ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── CARDS STRIP ────────────────────────────────────────────────
              Always fully visible. queue[0] is active (bigger).
              When a card expands, it moves to the END of the queue
              and the strip shifts left — giving the right→left flow.
          ──────────────────────────────────────────────────────────────── */}
          <div className="gastro-cinema-cards">
            {queue.map((cardIdx, stripPos) => {
              const p = gastroCards[cardIdx];
              if (!p) return null;
              const isActive = stripPos === 0;
              return (
                <a
                  key={p.id}
                  href={`/experiencia/${p.slug}`}
                  ref={el => { cardRefs.current[stripPos] = el; }}
                  className={`gastro-card${isActive ? " active" : ""}`}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      jumpToCard(cardIdx);
                    }
                  }}
                >
                  <img src={p.imagen} alt={p.titulo} loading="eager" />
                  <div className="gastro-card-overlay" />
                  <div className="gastro-card-info">
                    <div className="gastro-card-loc">{p.lugar}</div>
                    <div className="gastro-card-name">{p.titulo}</div>
                    <div className="gastro-card-meta">
                      <span className="gastro-card-stars">★ {p.rating.toFixed(1)}</span>
                      <span className="gastro-card-price">{rd(p.precio)}</span>
                    </div>
                  </div>
                </a>
              );
            })}
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
          <button className={`xpl-type-btn${mode === "giftboxes" ? " active" : ""}`} onClick={() => setMode("giftboxes")}>
            <span className="xpl-type-icon">🎁</span>
            <div className="xpl-type-text"><strong>GiftBoxes</strong><span>El destinatario elige su experiencia</span></div>
          </button>
          <button className={`xpl-type-btn${mode === "experiencias" ? " active" : ""}`} onClick={() => setMode("experiencias")}>
            <span className="xpl-type-icon">⚡</span>
            <div className="xpl-type-text"><strong>Experiencias</strong><span>Compra directa de una experiencia</span></div>
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
              <div className="xpl-giftbox-label"><span>🎁</span> GiftBox</div>
            </div>
            <div className="xpl-giftbox-body">
              <div className="xpl-giftbox-tag">Más popular</div>
              <h2>GiftBox {cat.nombre}</h2>
              <p className="xpl-giftbox-desc">
                Regala libertad. El destinatario recibe un código y elige su experiencia favorita
                entre las {productos.length} opciones de {cat.nombre} disponibles en Yupii.
              </p>
              <div className="xpl-giftbox-stats">
                <div className="xpl-giftbox-stat"><strong>{productos.length}</strong><span>experiencias incluidas</span></div>
                <div className="xpl-giftbox-stat"><strong>★ {avgRating.toFixed(1)}</strong><span>rating promedio</span></div>
                <div className="xpl-giftbox-stat"><strong>12 meses</strong><span>validez del código</span></div>
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
                    <div className="xpl-giftbox-preview xpl-giftbox-more">+{productos.length - 4} más</div>
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
          <div className="xpl-bar">
            <div className="xpl-bar-in">
              <div className="xpl-pills">
                {zonas.length > 0 && zonas.map((z) => (
                  <button key={z} className={`xpl-pill${zona === z ? " on" : ""}`} onClick={() => setZona(zona === z ? null : z)}>{z}</button>
                ))}
                {tipos.length > 0 && (
                  <><span className="xpl-sep" />
                  {tipos.map((t) => (
                    <button key={t} className={`xpl-pill xpl-pill-t${tipo === t ? " on" : ""}`} onClick={() => setTipo(tipo === t ? null : t)}>{t}</button>
                  ))}</>
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
              <div className="xpl-empty"><p>Sin resultados con esos filtros</p><button onClick={clearFilters}>Ver todas</button></div>
            ) : (
              <div className="xpl-grid">
                {filtered.map((p) => (
                  <a key={p.id} href={`/experiencia/${p.slug}`} className="xpl-card">
                    <div className="xpl-card-img">
                      <img src={p.imagen} alt={p.titulo} loading="lazy" />
                      {p.etiqueta && <span className={`xpl-badge${p.etiqueta === "Exclusivo" ? " exc" : ""}`}>{p.etiqueta}</span>}
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
                        <span className="xpl-personas-tag"><Personas size={11} /> {p.personas} persona{p.personas > 1 ? "s" : ""}</span>
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
