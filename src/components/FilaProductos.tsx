"use client";

import { useRef } from "react";
import type { Producto } from "@/data/productos";
import TarjetaProducto from "./TarjetaProducto";
import { Chevron } from "./Icons";

type Props = {
  id: string;
  titulo: string;
  productos: Producto[];
  onAbrir: (p: Producto) => void;
  onVerMas: () => void;
};

export default function FilaProductos({ id, titulo, productos, onAbrir, onVerMas }: Props) {
  const riel = useRef<HTMLDivElement>(null);

  const desplazar = (n: number) =>
    riel.current?.scrollBy({ left: n * 556, behavior: "smooth" });

  if (!productos.length) return null;

  return (
    <section className="fila" id={id}>
      <div className="fila-cab">
        <h2>{titulo}</h2>
        <button className="vermas" onClick={onVerMas}>
          Ver más
        </button>
      </div>

      <div className="riel" ref={riel}>
        {productos.map((p) => (
          <TarjetaProducto key={p.id} p={p} onAbrir={onAbrir} />
        ))}
      </div>

      <button className="riel-flecha izq" onClick={() => desplazar(-1)} aria-label="Anterior">
        <Chevron dir="izq" size={17} />
      </button>
      <button className="riel-flecha der" onClick={() => desplazar(1)} aria-label="Siguiente">
        <Chevron dir="der" size={17} />
      </button>
    </section>
  );
}
