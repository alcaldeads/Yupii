"use client";

import { OCASIONES, PRODUCTOS } from "@/data/productos";
import { rd } from "@/lib/format";

export default function Ocasiones() {
  return (
    <section className="ocasiones-section">
      <div className="wrap">
        <div className="ocasiones-header">
          <h2>Regala por ocasión</h2>
          <p>No importa el motivo — lo que importa es lo que van a sentir.</p>
        </div>

        <div className="ocasiones-grid">
          {OCASIONES.map((o) => {
            const sugerido = PRODUCTOS.find((p) => p.id === o.sugeridos[0]);
            return (
              <div key={o.id} className="ocasion-card">
                <div className="ocasion-card-img">
                  <div
                    className="ocasion-card-fondo"
                    style={{ backgroundImage: `url(${o.imagen})` }}
                  />
                  <div className="ocasion-card-overlay" style={{ background: `linear-gradient(160deg, ${o.color}33 0%, ${o.color}CC 100%)` }} />
                  <div className="ocasion-card-texto">
                    <h3>{o.titulo}</h3>
                    <p>{o.subtitulo}</p>
                  </div>
                </div>
                {sugerido && (
                  <a href={`/experiencia/${sugerido.slug}`} className="ocasion-sugerido">
                    <img src={sugerido.imagen} alt={sugerido.titulo} />
                    <div className="ocasion-sugerido-info">
                      <span className="ocasion-sugerido-label">Sugerido</span>
                      <span className="ocasion-sugerido-nombre">{sugerido.titulo}</span>
                      <span className="ocasion-sugerido-precio">{rd(sugerido.precio)}</span>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
