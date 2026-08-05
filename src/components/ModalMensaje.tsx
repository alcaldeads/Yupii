"use client";

import Modal from "./Modal";

export type Mensaje = { icono: string; titulo: string; texto: string } | null;

export default function ModalMensaje({
  mensaje,
  onCerrar,
}: {
  mensaje: Mensaje;
  onCerrar: () => void;
}) {
  if (!mensaje) return null;

  return (
    <Modal abierto onCerrar={onCerrar} ancho={430}>
      <div className="modal-body">
        <div className="exito">
          <div className="ic">{mensaje.icono}</div>
          <h2 style={{ fontSize: "1.35rem" }}>{mensaje.titulo}</h2>
          <p style={{ color: "var(--gris-txt)", marginTop: 10, fontSize: ".94rem" }}>
            {mensaje.texto}
          </p>
          <div className="modal-pie" style={{ justifyContent: "center" }}>
            <button className="btn-lleno" onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
