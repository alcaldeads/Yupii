"use client";

import { useState } from "react";

type Pregunta = {
  q: string;
  a: string;
};

const PREGUNTAS: Pregunta[] = [
  {
    q: "¿Qué es Yupii?",
    a: "Yupii es la primera plataforma de experiencias para regalar en República Dominicana. Ofrecemos experiencias únicas de gastronomía, aventura, bienestar, estadías y más, que puedes regalar a cualquier persona.",
  },
  {
    q: "¿Cómo funciona?",
    a: "Es muy simple: 1) Elige la experiencia que quieres regalar. 2) Personaliza tu regalo con un mensaje y elige cómo enviarlo (email o WhatsApp). 3) La persona que lo recibe canjea su código y reserva con el aliado. Tiene 12 meses para disfrutarla.",
  },
  {
    q: "¿Cuánto tiempo tiene para canjear?",
    a: "Todos los códigos de regalo tienen una validez de 12 meses desde la fecha de compra. Si necesita más tiempo, puede solicitar una extensión.",
  },
  {
    q: "¿Puede cambiar la experiencia?",
    a: "Sí. Si la persona que recibe el regalo prefiere otra experiencia, puede cambiarla por una de igual o mayor valor (pagando la diferencia) en cualquier momento antes del vencimiento.",
  },
  {
    q: "¿Cómo funcionan los regalos corporativos?",
    a: "Contáctanos y en menos de 4 horas te enviamos una propuesta personalizada. Tú defines el presupuesto por persona, nosotros generamos los códigos y cada empleado elige su propia experiencia. Incluye un dashboard de seguimiento.",
  },
  {
    q: "¿Los precios incluyen impuestos?",
    a: "Sí, todos los precios mostrados incluyen el ITBIS (18%). El precio que ves es el precio final.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) y transferencias bancarias.",
  },
  {
    q: "¿Puedo devolver una compra?",
    a: "Si el código no ha sido canjeado, puedes solicitar un reembolso completo dentro de los primeros 30 días. Después de ese período, el código sigue vigente por 12 meses.",
  },
];

export default function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setAbierto((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="faq">
      <div className="wrap">
        <h2 className="faq-titulo">Preguntas frecuentes</h2>
        <div className="faq-lista">
          {PREGUNTAS.map((p, idx) => {
            const open = abierto === idx;
            return (
              <div key={idx} className={`faq-item${open ? " faq-item-open" : ""}`}>
                <button
                  className="faq-pregunta"
                  onClick={() => toggle(idx)}
                  aria-expanded={open}
                >
                  <span>{p.q}</span>
                  <span className="faq-icono">{open ? "−" : "+"}</span>
                </button>
                <div className="faq-respuesta" style={{ maxHeight: open ? "300px" : "0" }}>
                  <p>{p.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
