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
};

const REVIEWS: { nombre: string; texto: string; estrellas: number; hace: string }[] = [
  {
    nombre: "Laura G.",
    texto: "Fue una experiencia increible, todo muy bien organizado. Lo recomiendo al 100%.",
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

function EstrellasVacias({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

export default function ExperienceClient({ producto: p, relacionadas }: Props) {
  const [modalProducto, setModalProducto] = useState<Producto | null>(null);
  const [mensaje, setMensaje] = useState<Mensaje>(null);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [galeriaIdx, setGaleriaIdx] = useState(0);

  const todasFotos = [p.imagen, ...p.imagenes];

  return (
    <>
      <header className="exp-header">
        <div className="wrap">
          <a href="/" className="exp-back">
            <Chevron dir="izq" size={16} /> Volver al catálogo
          </a>
        </div>
      </header>

      <main className="exp-page">
        <div className="wrap">
          {/* SECTION 1: Photo Gallery */}
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

          {/* SECTION 2: Title + Key Info */}
          <section className="exp-hero-info">
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

          {/* SECTION 3: Storytelling */}
          <section className="exp-historia">
            <p>{p.historia}</p>
          </section>

          {/* SECTION 4: What's Included */}
          <section className="exp-incluye">
            <h2>Qué incluye</h2>
            <ul>
              {p.incluye.map((item) => (
                <li key={item}>
                  <span className="exp-check">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 5: Available Partners */}
          <section className="exp-aliados">
            <h2>Aliados disponibles</h2>
            <div className="exp-aliados-grid">
              {p.aliados.map(([nombre, horario]) => (
                <div key={nombre} className="exp-aliado-card">
                  <strong>{nombre}</strong>
                  <span>{horario}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: Reviews */}
          <section className="exp-reviews">
            <h2>Opiniones verificadas</h2>
            <div className="exp-reviews-grid">
              {REVIEWS.map((r) => (
                <div key={r.nombre} className="exp-review-card">
                  <div className="exp-review-stars">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <span key={k} className={k < r.estrellas ? "star-filled" : "star-empty"}>
                        {k < r.estrellas ? <Estrella size={14} /> : <EstrellasVacias size={14} />}
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

          {/* SECTION 7: Price + CTAs */}
          <section className="exp-precio-section">
            <div className="exp-precio-box">
              <div className="exp-precio-amount">
                {rd(p.precio)}
                {p.precioAntes > 0 && (
                  <span className="exp-precio-antes">{rd(p.precioAntes)}</span>
                )}
              </div>
              <div className="exp-precio-badges">
                <span className="exp-badge">Valido por 12 meses</span>
                <span className="exp-badge">Intercambiable</span>
              </div>
              <div className="exp-ctas">
                <button
                  className="btn-lleno exp-cta-btn"
                  onClick={() => setModalProducto(p)}
                >
                  Regalar esta experiencia
                </button>
                <button
                  className="btn-parami exp-cta-btn"
                  onClick={() => setModalProducto(p)}
                >
                  La quiero para mi
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 8: Related Experiences */}
          {relacionadas.length > 0 && (
            <section className="exp-relacionadas">
              <h2>Experiencias similares</h2>
              <div className="exp-relacionadas-grid">
                {relacionadas.map((r) => (
                  <a
                    key={r.id}
                    href={`/experiencia/${r.slug}`}
                    className="exp-rel-card"
                  >
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

        {/* Sticky mobile price bar */}
        <div className="exp-sticky-bar">
          <div className="exp-sticky-precio">
            <strong>{rd(p.precio)}</strong>
            {p.precioAntes > 0 && (
              <span className="exp-sticky-antes">{rd(p.precioAntes)}</span>
            )}
          </div>
          <button
            className="btn-lleno exp-sticky-btn"
            onClick={() => setModalProducto(p)}
          >
            Regalar
          </button>
        </div>
      </main>

      {/* Gallery Modal */}
      {galeriaAbierta && (
        <div
          className="exp-gallery-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setGaleriaAbierta(false);
          }}
        >
          <button
            className="exp-gm-close"
            onClick={() => setGaleriaAbierta(false)}
            aria-label="Cerrar galeria"
          >
            &#10005;
          </button>
          <button
            className="exp-gm-nav exp-gm-prev"
            onClick={() => setGaleriaIdx((i) => (i - 1 + todasFotos.length) % todasFotos.length)}
            aria-label="Foto anterior"
          >
            <Chevron dir="izq" size={24} />
          </button>
          <img
            src={todasFotos[galeriaIdx]}
            alt={`${p.titulo} - foto ${galeriaIdx + 1}`}
            className="exp-gm-img"
          />
          <button
            className="exp-gm-nav exp-gm-next"
            onClick={() => setGaleriaIdx((i) => (i + 1) % todasFotos.length)}
            aria-label="Foto siguiente"
          >
            <Chevron dir="der" size={24} />
          </button>
          <div className="exp-gm-counter">
            {galeriaIdx + 1} / {todasFotos.length}
          </div>
        </div>
      )}

      {/* Purchase Modal */}
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
