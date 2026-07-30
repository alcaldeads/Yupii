"use client";

import { useEffect, useState } from "react";
import { PRODUCTOS, type Producto } from "@/data/productos";
import { rd } from "@/lib/format";
import Modal from "./Modal";

export default function ModalCanje({
  abierto,
  onCerrar,
}: {
  abierto: boolean;
  onCerrar: () => void;
}) {
  const [paso, setPaso] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);
  const [exp, setExp] = useState<Producto | null>(null);
  const [aliado, setAliado] = useState<string | null>(null);

  useEffect(() => {
    if (abierto) {
      setPaso(0);
      setCodigo("");
      setError(false);
      setAliado(null);
    }
  }, [abierto]);

  const validar = () => {
    if (codigo.trim().length < 6) {
      setError(true);
      return;
    }
    setError(false);
    setExp(PRODUCTOS[Math.floor(Math.random() * 8)]);
    setPaso(1);
  };

  return (
    <Modal abierto={abierto} onCerrar={onCerrar} ancho={460}>
      <div className="modal-body">
        {paso === 0 && (
          <>
            <h2>Abre tu regalo</h2>
            <p style={{ color: "var(--gris-txt)", fontSize: ".93rem", marginTop: 6 }}>
              Escribe el código que te llegó por correo o WhatsApp.
            </p>

            <div className="campo">
              <label htmlFor="cCod">Código</label>
              <input
                id="cCod"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && validar()}
                placeholder="YUP-0000-00"
                style={{
                  letterSpacing: ".06em",
                  fontWeight: 600,
                  borderColor: error ? "#d64545" : undefined,
                }}
              />
            </div>

            <p style={{ fontSize: ".83rem", color: "var(--gris-txt)", marginTop: 8 }}>
              Prueba con{" "}
              <button
                onClick={() => setCodigo("YUP-7F2Q-84")}
                style={{ color: "var(--acento)", fontWeight: 700, textDecoration: "underline" }}
              >
                YUP-7F2Q-84
              </button>
            </p>

            <div className="modal-pie">
              <button className="btn-lleno" onClick={validar}>
                Abrir
              </button>
            </div>
          </>
        )}

        {paso === 1 && exp && (
          <>
            <div className="exito" style={{ paddingBottom: 0 }}>
              <div className="ic">🎁</div>
              <h2 style={{ fontSize: "1.35rem" }}>Tienes un regalo de Yupii</h2>
              <p style={{ color: "var(--gris-txt)", fontSize: ".92rem", marginTop: 8 }}>
                Te lo envió Alejandro: &ldquo;Te lo debía desde hace rato.&rdquo;
              </p>
            </div>

            <div
              style={{
                border: "1px solid var(--gris-borde)",
                borderRadius: 10,
                padding: 16,
                marginTop: 16,
              }}
            >
              <div style={{ fontWeight: 700 }}>
                {exp.titulo} · {exp.lugar}
              </div>
              <div style={{ fontSize: ".87rem", color: "var(--gris-txt)", marginTop: 3 }}>
                Válido hasta julio 2027 · Valor {rd(exp.precio)}
              </div>
            </div>

            <h4 style={{ margin: "20px 0 6px", fontSize: ".95rem" }}>Elige dónde canjearlo</h4>

            <div>
              {exp.aliados.map(([nombre, horario]) => (
                <button
                  key={nombre}
                  className={`fila-aliado${aliado === nombre ? " sel" : ""}`}
                  onClick={() => setAliado(nombre)}
                >
                  <span>
                    <b style={{ fontSize: ".94rem" }}>{nombre}</b>
                    <br />
                    <span style={{ fontSize: ".84rem", color: "var(--gris-txt)" }}>{horario}</span>
                  </span>
                  <span style={{ color: "var(--acento)", fontWeight: 700, fontSize: ".85rem" }}>
                    Elegir
                  </span>
                </button>
              ))}
            </div>

            <div className="modal-pie">
              <button className="btn-lleno" disabled={!aliado} onClick={() => setPaso(2)}>
                Reservar
              </button>
            </div>
          </>
        )}

        {paso === 2 && (
          <div className="exito">
            <div className="ic">📅</div>
            <h2 style={{ fontSize: "1.35rem" }}>Reserva enviada</h2>
            <p style={{ color: "var(--gris-txt)", marginTop: 8, fontSize: ".93rem" }}>
              {aliado} recibió tu solicitud y te confirma la fecha por WhatsApp. Tu regalo queda
              bloqueado hasta la confirmación.
            </p>
            <div className="modal-pie" style={{ justifyContent: "center" }}>
              <button className="btn-lleno" onClick={onCerrar}>
                Listo
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
