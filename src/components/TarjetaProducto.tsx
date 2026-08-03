"use client";

import { useState } from "react";
import type { Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import { Corazon, Estrella, Personas, Pin, Reloj } from "./Icons";

export default function TarjetaProducto({
  p,
  onAbrir,
}: {
  p: Producto;
  onAbrir: (p: Producto) => void;
}) {
  const [fav, setFav] = useState(false);
  const verde = p.etiqueta === "Reserva online" || p.etiqueta === "Reserva ahora";

  return (
    <a href={`/experiencia/${p.slug}`} className="card" onClick={(e) => { e.preventDefault(); onAbrir(p); }}>
      <div className="card-foto">
        <div
          className="fondo"
          style={{
            backgroundImage: `url(${p.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="card-foto-overlay" />

        {p.etiqueta && (
          <span className={`etiqueta${verde ? " verde" : ""}`}>
            <Reloj />
            {p.etiqueta}
          </span>
        )}

        <span
          className={`corazon${fav ? " on" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Guardar"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setFav((v) => !v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              e.preventDefault();
              setFav((v) => !v);
            }
          }}
        >
          <Corazon />
        </span>
      </div>

      <div className="card-titulo">
        <h3>{p.titulo}</h3>
        <span className="rating">
          <Estrella />
          {p.rating.toFixed(1)}
        </span>
      </div>

      <p className="card-desc">{p.descripcion}</p>

      <div className="card-meta">
        <div>
          <Pin />
          {p.lugar}
        </div>
        <div>
          <Personas />
          Para {p.personas} persona{p.personas > 1 ? "s" : ""}
        </div>
      </div>

      <div className="card-precio">
        {rd(p.precio)}
        {p.precioAntes > 0 && <span className="antes">{rd(p.precioAntes)}</span>}
      </div>
    </a>
  );
}
