"use client";

import { useEffect, useState } from "react";
import { Chevron } from "./Icons";

const AVISOS = [
  "Envío digital inmediato a todo el país",
  "12 meses para canjear tu regalo",
  "Cambio o devolución si no hay disponibilidad",
  "Pago con Azul y CardNet",
];

export default function BarraAnuncios() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % AVISOS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="barra-top">
      <button onClick={() => setI((x) => (x - 1 + AVISOS.length) % AVISOS.length)} aria-label="Anterior">
        <Chevron dir="izq" />
      </button>
      <span className="txt">{AVISOS[i]}</span>
      <button onClick={() => setI((x) => (x + 1) % AVISOS.length)} aria-label="Siguiente">
        <Chevron dir="der" />
      </button>
    </div>
  );
}
