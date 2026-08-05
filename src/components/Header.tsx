"use client";

import { useState } from "react";
import { Carrito, Check, Lupa, Regalo, Usuario } from "./Icons";

type Props = {
  carrito: number;
  onAbrirRegalo: () => void;
  onBuscar: (q: string) => void;
  onCarrito: () => void;
};

export default function Header({ carrito, onAbrirRegalo, onBuscar, onCarrito }: Props) {
  const [q, setQ] = useState("");

  return (
    <header className="header">
      <div className="wrap">
        <div className="header-1">
          <a href="#" className="logo">
            yupii<span className="dot">.</span>
          </a>

          <div className="buscador">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && q.trim()) onBuscar(q);
              }}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
            <span className="lupa">
              <Lupa />
            </span>
          </div>

          <div className="der">
            <a href="#corpo" className="link-corpo">
              Regalos corporativos
            </a>
            <button className="btn-borde" onClick={onAbrirRegalo}>
              <Regalo />
              Abrir nuevo regalo
            </button>
          </div>
        </div>

        <nav className="header-2">
          <a href="#lo-mas">Boxes</a>
          <a href="#lo-mas">Experiencias</a>
          <a href="#eventos">Eventos</a>
          <a href="#lo-mas">Top 5</a>
          <a href="#categorias">Ideas de regalos</a>
          <a href="#ofertas" className="ofertas">
            <Check />
            Ofertas
          </a>
          <div className="iconos">
            <button className="ic-btn" aria-label="Mi cuenta">
              <Usuario />
              <span className="punto" />
            </button>
            <button className="ic-btn" aria-label="Carrito" onClick={onCarrito}>
              <Carrito />
              <span className="carrito-n">{carrito}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
