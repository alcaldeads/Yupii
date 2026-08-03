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

type Flujo = "info" | "regalo-form" | "regalo-ok" | "parami-form" | "parami-ok";

export default function ModalProducto({ producto, onCerrar, onAgregarCarrito }: Props) {
  const [flujo, setFlujo] = useState<Flujo>("info");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [miNombre, setMiNombre] = useState("");
  const [miEmail, setMiEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (producto) {
      setFlujo("info");
      setNombre("");
      setContacto("");
      setMensaje("");
      setMiNombre("");
      setMiEmail("");
    }
  }, [producto]);

  if (!producto) return null;
  const p = producto;

  return (
    <Modal abierto onCerrar={onCerrar}>
      {/* ACT 1 — Feel it: storytelling hero */}
      {flujo === "info" && (
        <div
          className="modal-historia"
          style={{ background: degradado(p.colores) }}
        >
          <div className="modal-historia-overlay" />
          <div className="modal-historia-content">
            <span className="modal-historia-glifo">{p.glifo}</span>
            <p className="modal-historia-texto">{p.historia}</p>
          </div>
        </div>
      )}

      {/* Fallback header for other flows */}
      {flujo !== "info" && (
        <div className="modal-foto" style={{ background: degradado(p.colores) }}>
          <span className="glifo">{p.glifo}</span>
        </div>
      )}

      <div className="modal-body">
        {/* ACT 2 — Discover it */}
        {flujo === "info" && (
          <>
            <span className="chip-cat">{p.categoria}</span>
            <h2>{p.titulo}</h2>

            <div className="modal-info-row">
              <span>📍 {p.lugar}</span>
              <span>
                👤 Para {p.personas} persona{p.personas > 1 ? "s" : ""}
              </span>
              <span>★ {p.rating.toFixed(1)}</span>
            </div>

            <p className="modal-desc">{p.descripcion}</p>

            <ul className="incluye">
              {p.incluye.map((item) => (
                <li key={item}>
                  <b>✓</b>
                  {item}
                </li>
              ))}
            </ul>

            {/* ACT 3 — Act on it: pricing + two CTAs */}
            <div className="modal-precio-row">
              <div className="modal-precio-amount">
                {rd(p.precio)}
                {p.precioAntes > 0 && (
                  <span className="antes">{rd(p.precioAntes)}</span>
                )}
              </div>
            </div>

            <div className="modal-ctas">
              <button
                className="btn-lleno modal-cta-regalo"
                onClick={() => setFlujo("regalo-form")}
              >
                🎁 Regalar esta experiencia
              </button>
              <button
                className="btn-parami"
                onClick={() => setFlujo("parami-form")}
              >
                💜 La quiero para mí
              </button>
            </div>
          </>
        )}

        {/* Gift flow — step 1: recipient form */}
        {flujo === "regalo-form" && (
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
              <button className="btn-gris" onClick={() => setFlujo("info")}>
                Atrás
              </button>
              <button
                className="btn-lleno"
                onClick={() => {
                  setCodigo(generarCodigo());
                  setFlujo("regalo-ok");
                }}
              >
                Confirmar regalo
              </button>
            </div>
          </>
        )}

        {/* Gift flow — step 2: success */}
        {flujo === "regalo-ok" && (
          <div className="exito">
            <div className="ic">🎉</div>
            <h2 style={{ fontSize: "1.4rem" }}>Listo, ya va en camino</h2>
            <p style={{ color: "var(--gris-txt)", marginTop: 8, fontSize: ".94rem" }}>
              {nombre.trim() || "Tu persona"} va a recibir el regalo con tu mensaje y
              este código.
            </p>

            <div className="codigo-caja">
              <div className="k">CÓDIGO DEL REGALO</div>
              <div className="v">{codigo}</div>
              <div
                style={{
                  fontSize: ".83rem",
                  color: "var(--gris-txt)",
                  marginTop: 8,
                }}
              >
                Válido por 12 meses. Si la experiencia no está disponible, se cambia
                por otra del mismo valor o se devuelve el dinero.
              </div>
            </div>

            <div className="modal-pie" style={{ justifyContent: "center" }}>
              <button className="btn-lleno" onClick={onCerrar}>
                Entendido
              </button>
            </div>
          </div>
        )}

        {/* Buy for self — simplified form */}
        {flujo === "parami-form" && (
          <>
            <h2>Comprar para mí</h2>
            <p className="modal-desc">
              Completa tus datos y recibirás el código de la experiencia en tu correo.
            </p>

            <div className="campo">
              <label htmlFor="mN">Tu nombre</label>
              <input
                id="mN"
                value={miNombre}
                onChange={(e) => setMiNombre(e.target.value)}
                placeholder="Tu nombre completo"
                maxLength={40}
              />
            </div>

            <div className="campo">
              <label htmlFor="mE">Tu correo electrónico</label>
              <input
                id="mE"
                type="email"
                value={miEmail}
                onChange={(e) => setMiEmail(e.target.value)}
                placeholder="tu@correo.com"
              />
            </div>

            <div className="modal-precio-row" style={{ marginTop: 16 }}>
              <div className="modal-precio-amount">
                Total: {rd(p.precio)}
              </div>
            </div>

            <div className="modal-pie">
              <button className="btn-gris" onClick={() => setFlujo("info")}>
                Atrás
              </button>
              <button
                className="btn-lleno"
                onClick={() => {
                  setCodigo(generarCodigo());
                  setFlujo("parami-ok");
                }}
              >
                Confirmar compra
              </button>
            </div>
          </>
        )}

        {/* Buy for self — success */}
        {flujo === "parami-ok" && (
          <div className="exito">
            <div className="ic">🎉</div>
            <h2 style={{ fontSize: "1.4rem" }}>Tu experiencia está lista</h2>
            <p style={{ color: "var(--gris-txt)", marginTop: 8, fontSize: ".94rem" }}>
              {miNombre.trim() || "Hola"}, te enviamos el código a tu correo. Usa este
              código para reservar con el aliado.
            </p>

            <div className="codigo-caja">
              <div className="k">TU CÓDIGO</div>
              <div className="v">{codigo}</div>
              <div
                style={{
                  fontSize: ".83rem",
                  color: "var(--gris-txt)",
                  marginTop: 8,
                }}
              >
                Válido por 12 meses. Si la experiencia no está disponible, se cambia
                por otra del mismo valor o se devuelve el dinero.
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
