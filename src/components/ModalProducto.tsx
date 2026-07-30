"use client";

import { useEffect, useState } from "react";
import type { Producto } from "@/data/productos";
import { degradado, generarCodigo, rd } from "@/lib/format";
import Modal from "./Modal";

type Props = {
  producto: Producto | null;
  onCerrar: () => void;
  onAgregarCarrito: (p: Producto) => void;
};

export default function ModalProducto({ producto, onCerrar, onAgregarCarrito }: Props) {
  const [paso, setPaso] = useState(0);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (producto) {
      setPaso(0);
      setNombre("");
      setContacto("");
      setMensaje("");
    }
  }, [producto]);

  if (!producto) return null;
  const p = producto;

  return (
    <Modal abierto onCerrar={onCerrar}>
      <div className="modal-foto" style={{ background: degradado(p.colores) }}>
        <span className="glifo">{p.glifo}</span>
      </div>

      <div className="modal-body">
        {paso === 0 && (
          <>
            <span className="chip-cat">{p.categoria}</span>
            <h2>{p.titulo}</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: ".9rem",
                color: "var(--gris-txt)",
                marginTop: 6,
                flexWrap: "wrap",
              }}
            >
              <span>📍 {p.lugar}</span>
              <span>
                👤 Para {p.personas} persona{p.personas > 1 ? "s" : ""}
              </span>
              <span>★ {p.rating.toFixed(1)}</span>
            </div>

            <p style={{ marginTop: 14, color: "var(--gris-txt)", fontSize: ".94rem" }}>
              {p.descripcion}
            </p>

            <ul className="incluye">
              {p.incluye.map((i) => (
                <li key={i}>
                  <b>✓</b>
                  {i}
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginTop: 22,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>
                {rd(p.precio)}
                {p.precioAntes > 0 && <span className="antes">{rd(p.precioAntes)}</span>}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-gris" onClick={() => onAgregarCarrito(p)}>
                  Agregar al carrito
                </button>
                <button className="btn-lleno" onClick={() => setPaso(1)}>
                  Regalar ahora
                </button>
              </div>
            </div>
          </>
        )}

        {paso === 1 && (
          <>
            <h2>¿A quién se lo enviamos?</h2>

            <div className="campo">
              <label htmlFor="gN">Nombre de quien lo recibe</label>
              <input
                id="gN"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Carla"
                maxLength={26}
              />
            </div>

            <div className="campo">
              <label htmlFor="gC">Correo o WhatsApp</label>
              <input
                id="gC"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                placeholder="carla@correo.com"
              />
            </div>

            <div className="campo">
              <label htmlFor="gM">Tu mensaje</label>
              <textarea
                id="gM"
                rows={3}
                maxLength={140}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Feliz cumpleaños. Te lo debía desde hace rato."
              />
            </div>

            <div className="campo">
              <label htmlFor="gF">Cuándo se lo entregamos</label>
              <select id="gF">
                <option>Ahora mismo</option>
                <option>Mañana temprano</option>
                <option>Elegir una fecha</option>
              </select>
            </div>

            <div className="modal-pie">
              <button className="btn-gris" onClick={() => setPaso(0)}>
                Atrás
              </button>
              <button
                className="btn-lleno"
                onClick={() => {
                  setCodigo(generarCodigo());
                  setPaso(2);
                }}
              >
                Confirmar regalo
              </button>
            </div>
          </>
        )}

        {paso === 2 && (
          <div className="exito">
            <div className="ic">🎉</div>
            <h2 style={{ fontSize: "1.4rem" }}>Listo, ya va en camino</h2>
            <p style={{ color: "var(--gris-txt)", marginTop: 8, fontSize: ".94rem" }}>
              {nombre.trim() || "Tu persona"} va a recibir el regalo con tu mensaje y este código.
            </p>

            <div className="codigo-caja">
              <div className="k">CÓDIGO DEL REGALO</div>
              <div className="v">{codigo}</div>
              <div style={{ fontSize: ".83rem", color: "var(--gris-txt)", marginTop: 8 }}>
                Válido por 12 meses. Si la experiencia no está disponible, se cambia por otra del
                mismo valor o se devuelve el dinero.
              </div>
            </div>

            <div className="modal-pie" style={{ justifyContent: "center" }}>
              <button className="btn-lleno" onClick={onCerrar}>
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
