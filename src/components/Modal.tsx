"use client";

import { useEffect, type ReactNode } from "react";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  children: ReactNode;
  ancho?: number;
};

export default function Modal({ abierto, onCerrar, children, ancho = 560 }: Props) {
  useEffect(() => {
    if (!abierto) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="velo"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div className="modal" style={{ maxWidth: ancho }}>
        <button className="x" onClick={onCerrar} aria-label="Cerrar">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
