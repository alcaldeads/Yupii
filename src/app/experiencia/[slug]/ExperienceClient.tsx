"use client";

import { useState } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Estrella, Pin, Personas, Chevron } from "@/components/Icons";
import ModalProducto from "@/components/ModalProducto";
import ModalMensaje, { type Mensaje } from "@/components/ModalMensaje";

type Props = {
  producto: Producto;
  relacionadas: Producto[];
  catSlug: string;
  catNombre: string;
};

const REVIEWS: { nombre: string; texto: string; estrellas: number; hace: string }[] = [
  {
    nombre: "Laura G.",
    texto: "Fue una experiencia increíble, todo muy bien organizado. Lo recomiendo al 100%.",
    estrellas: 5,
    hace: "Hace 2 semanas",
  },
  {
    nombre: "Miguel R.",
    texto: "Se lo regalé a mi pareja y fue un éxito. El servicio de Yupii fue impecable de principio a fin.",
    estrellas: 5,
    hace: "Hace 1 mes",
  },
  {
    nombre: "Carolina P.",
    texto: "Superó todas las expectativas. La coordinación con el aliado fue perfecta. Definitivamente repito.",
    estrellas: 4,
    hace: "Hace 2 meses",
  },
];

export default function ExperienceClient({ producto: p, relacionadas, catSlug, catNombre }: Props) {
  const [modalProducto, setModalProducto] = useState<Producto | null>(null);
  const [mensaje, setMensaje] = useState<Mensaje>(null);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [galeriaIdx, setGaleriaIdx] = useState(0);

  const todasFotos = [p.imagen, ...p.imagenes];

  return (
    <>
      {/* Header */}
      <header className="exp-header">
        <div className="exp-header-in">
          <a href={`/explorar/${catSlug}`} className="exp-back">
            <Chevron dir="izq" size={14} />
            {catNombre}
          </a>
        </div>
      </header>

      <main className="exp-page">
        <div className="exp-wrap">

          {/* Gallery — full width */}
          <div className="exp-gallery">
            <button
              className="exp-gallery-main"
              onClick={() => { setGaleriaIdx(0); setGaleriaAbierta(true); }}
              aria-label="Ver foto principal"
            >
              <img src={p.imagen} alt={p.titulo} loading="eager" />
            </button>
            <div className="exp-gallery-side">
              {p.imagenes.slice(0, 2).map((img, i) => (
                <button
                  key={i}
                  className="exp-gallery-thumb"
                  onClick={() => { setGaleriaIdx(i + 1); setGaleriaAbierta(true); }}
                  aria-label={`Ver foto ${i + 2}`}
                >
                  <img src={img} alt={`${p.titulo} - foto ${i + 2}`} loading="lazy" />
                </button>
              ))}
            </div>
            <button
              className="exp-gallery-ver-todas"
              onClick={() => { setGaleriaIdx(0); setGaleriaAbierta(true); }}
            >
              Ver todas las fotos
            </button>
          </div>

          {/* 2-column layout */}
          <div className="exp-layout">

            {/* LEFT: content */}
            <div className="exp-content">

              {/* Title + meta */}
              <section className="exp-hero-info">
                {p.etiqueta && <span className="exp-etiqueta">{p.etiqueta}</span>}
                <h1 className="exp-titulo">{p.titulo}</h1>
                <div className="exp-meta">
                  <span className="exp-meta-item">
                    <Pin size={14} /> {p.lugar}
                  </span>
                  <span className="exp-meta-item">
                    <Personas size={14} /> Para {p.personas} persona{p.personas > 1 ? "s" : ""}
                  </span>
                  <span className="exp-meta-item exp-meta-rating">
                    <Estrella size={14} /> {p.rating.toFixed(1)}
                    <span className="exp-meta-count">(38 opiniones)</span>
                  </span>
                </div>
                <p className="exp-descripcion">{p.descripcion}</p>
              </section>

              {/* Historia */}
              <section className="exp-historia">
                <p>{p.historia}</p>
              </section>

              {/* Qué incluye */}
              <section className="exp-incluye">
                <h2>Qué incluye</h2>
                <ul>
                  {p.incluye.map((item) => (
                    <li key={item}>
                      <span className="exp-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Aliados */}
              <section className="exp-aliados">
                <h2>Dónde canjear</h2>
                <div className="exp-aliados-grid">
                  {p.aliados.map(([nombre, horario]) => (
                    <div key={nombre} className="exp-aliado-card">
                      <strong>{nombre}</strong>
                      <span>{horario}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section className="exp-reviews">
                <div className="exp-reviews-header">
                  <h2>Opiniones</h2>
                  <div className="exp-reviews-score">
                    <Estrella size={18} />
                    <strong>{p.rating.toFixed(1)}</strong>
                    <span>· 38 opiniones</span>
                  </div>
                </div>
                <div className="exp-reviews-grid">
                  {REVIEWS.map((r) => (
                    <div key={r.nombre} className="exp-review-card">
                      <div className="exp-review-stars">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <span key={k} style={{ color: k < r.estrellas ? "var(--amarillo)" : "#ddd", display: "flex" }}>
                            <Estrella size={13} />
                          </span>
                        ))}
                      </div>
                      <p>&ldquo;{r.texto}&rdquo;</p>
                      <div className="exp-review-autor">
                        <strong>{r.nombre}</strong>
                        <span>{r.hace}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT: sticky price card */}
            <aside className="exp-sidebar">
              <div className="exp-precio-card">

                {/* Price */}
                <div className="exp-pc-precio">
                  <span className="exp-pc-amount">{rd(p.precio)}</span>
                  {p.precioAntes > 0 && (
                    <span className="exp-pc-antes">{rd(p.precioAntes)}</span>
                  )}
                </div>

                {/* Rating mini */}
                <div className="exp-pc-rating">
                  <Estrella size={13} />
                  <strong>{p.rating.toFixed(1)}</strong>
                  <span>· 38 opiniones</span>
                </div>

                <hr className="exp-pc-divider" />

                {/* Badges */}
                <div className="exp-pc-badges">
                  <span className="exp-pc-badge">✓ Válido 12 meses</span>
                  <span className="exp-pc-badge">✓ Intercambiable</span>
                  <span className="exp-pc-badge">✓ Cancelación flexible</span>
                </div>

                {/* CTAs */}
                <div className="exp-pc-ctas">
                  <button
                    className="btn-lleno exp-pc-btn"
                    onClick={() => setModalProducto(p)}
                  >
                    Regalar esta experiencia
                  </button>
                  <button
                    className="btn-parami exp-pc-btn"
                    onClick={() => setModalProducto(p)}
                  >
                    La quiero para mí
                  </button>
                </div>

                {/* Trust */}
                <p className="exp-pc-trust">Pago seguro · Entrega inmediata por email</p>
              </div>
            </aside>

          </div>

          {/* Relacionadas — full width */}
          {relacionadas.length > 0 && (
            <section className="exp-relacionadas">
              <h2>Experiencias similares</h2>
              <div className="exp-relacionadas-grid">
                {relacionadas.map((r) => (
                  <a key={r.id} href={`/experiencia/${r.slug}`} className="exp-rel-card">
                    <div className="exp-rel-foto">
                      <img src={r.imagen} alt={r.titulo} loading="lazy" />
                    </div>
                    <div className="exp-rel-body">
                      <h3>{r.titulo}</h3>
                      <div className="exp-rel-meta">
                        <span><Pin size={11} /> {r.lugar}</span>
                        <span><Estrella size={11} /> {r.rating.toFixed(1)}</span>
                      </div>
                      <div className="exp-rel-precio">{rd(r.precio)}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      {/* Mobile sticky bar */}
      <div className="exp-sticky-bar">
        <div className="exp-sticky-precio">
          <strong>{rd(p.precio)}</strong>
          {p.precioAntes > 0 && (
            <span className="exp-sticky-antes">{rd(p.precioAntes)}</span>
          )}
        </div>
        <button className="btn-lleno exp-sticky-btn" onClick={() => setModalProducto(p)}>
          Regalar
        </button>
      </div>

      {/* Gallery modal */}
      {galeriaAbierta && (
        <div
          className="exp-gallery-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setGaleriaAbierta(false); }}
        >
          <button className="exp-gm-close" onClick={() => setGaleriaAbierta(false)} aria-label="Cerrar galería">
            ✕
          </button>
          <button
            className="exp-gm-nav exp-gm-prev"
            onClick={() => setGaleriaIdx((i) => (i - 1 + todasFotos.length) % todasFotos.length)}
            aria-label="Foto anterior"
          >
            <Chevron dir="izq" size={22} />
          </button>
          <img src={todasFotos[galeriaIdx]} alt={`${p.titulo} - foto ${galeriaIdx + 1}`} className="exp-gm-img" />
          <button
            className="exp-gm-nav exp-gm-next"
            onClick={() => setGaleriaIdx((i) => (i + 1) % todasFotos.length)}
            aria-label="Foto siguiente"
          >
            <Chevron dir="der" size={22} />
          </button>
          <div className="exp-gm-counter">{galeriaIdx + 1} / {todasFotos.length}</div>
        </div>
      )}

      <ModalProducto
        producto={modalProducto}
        onCerrar={() => setModalProducto(null)}
        onAgregarCarrito={(prod) => {
          setModalProducto(null);
          setMensaje({
            icono: "🛒",
            titulo: "Agregado al carrito",
            texto: `${prod.titulo} está en tu carrito. Puedes seguir viendo o finalizar la compra.`,
          });
        }}
      />
      <ModalMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />
    </>
  );
}
