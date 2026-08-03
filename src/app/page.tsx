"use client";

import { useState } from "react";
import { FILAS, PRODUCTOS, SECCIONES_CAT, type Producto } from "@/data/productos";
import Header from "@/components/Header";
import HeroCarrusel from "@/components/HeroCarrusel";
import FilaProductos from "@/components/FilaProductos";
import CategorySection from "@/components/CategorySection";
import { BandaCorporativa, Newsletter, PieSitio } from "@/components/Secciones";
import Opiniones from "@/components/Opiniones";
import FAQ from "@/components/FAQ";
import ModalCanje from "@/components/ModalCanje";
import ModalMensaje, { type Mensaje } from "@/components/ModalMensaje";
import { Chat } from "@/components/Icons";

export default function Home() {
  const [canje, setCanje] = useState(false);
  const [mensaje, setMensaje] = useState<Mensaje>(null);
  const [carrito, setCarrito] = useState(0);

  const buscar = (q: string) => {
    const t = q.toLowerCase().trim();
    const hit = PRODUCTOS.find((p) =>
      `${p.titulo} ${p.categoria} ${p.lugar} ${p.descripcion}`.toLowerCase().includes(t)
    );
    if (hit) {
      window.location.href = `/experiencia/${hit.slug}`;
    } else {
      setMensaje({
        icono: "🔍",
        titulo: "Sin resultados",
        texto: `No encontramos nada con "${q}". Prueba con spa, paracaídas, cena o Samaná.`,
      });
    }
  };

  const abrirExperiencia = (p: Producto) => {
    window.location.href = `/experiencia/${p.slug}`;
  };

  return (
    <>
      <Header
        carrito={carrito}
        onAbrirRegalo={() => setCanje(true)}
        onBuscar={buscar}
        onCarrito={() =>
          setMensaje({
            icono: "🛒",
            titulo: "Tu carrito",
            texto: carrito
              ? `Tienes ${carrito} experiencia${carrito > 1 ? "s" : ""} en el carrito.`
              : "Tu carrito está vacío. Explora el catálogo y agrega la primera.",
          })
        }
      />

      <main>
        <HeroCarrusel />

        {/* Highlighted rows: "Lo más regalado" and "Ofertas" */}
        <div className="wrap">
          {FILAS.map((f) => (
            <FilaProductos
              key={f.id}
              id={f.id}
              titulo={f.titulo}
              productos={PRODUCTOS.filter(f.filtro)}
              onAbrir={abrirExperiencia}
              onVerMas={() =>
                setMensaje({
                  icono: "📂",
                  titulo: "Categoría completa",
                  texto:
                    "En el sitio real esto abre la categoría con todos sus filtros: precio, zona, cantidad de personas y calificación.",
                })
              }
            />
          ))}
        </div>

        {/* Category sections with video backgrounds */}
        {SECCIONES_CAT.map((sec) => (
          <CategorySection
            key={sec.id}
            section={sec}
            productos={PRODUCTOS.filter((p) => p.categoria === sec.categoria)}
            onAbrir={abrirExperiencia}
          />
        ))}

        <Opiniones />

        <BandaCorporativa
          onSolicitar={() =>
            setMensaje({
              icono: "💼",
              titulo: "Propuesta corporativa",
              texto:
                "Un asesor te escribe en menos de 24 horas hábiles con la propuesta, la factura de muestra y el acceso al panel de seguimiento de canjes.",
            })
          }
        />

        <Newsletter
          onSuscribir={() =>
            setMensaje({
              icono: "📬",
              titulo: "Suscripción confirmada",
              texto:
                "Te vamos a avisar de las nuevas experiencias y de las ofertas antes que a nadie.",
            })
          }
        />

        <FAQ />
      </main>

      <PieSitio />

      <button
        className="chat"
        aria-label="Abrir chat"
        onClick={() =>
          setMensaje({
            icono: "💬",
            titulo: "Chat de soporte",
            texto:
              "Escríbenos por WhatsApp al 809 000 0000. Respondemos de lunes a sábado, de 8:00 a 20:00.",
          })
        }
      >
        <Chat />
      </button>

      <ModalCanje abierto={canje} onCerrar={() => setCanje(false)} />
      <ModalMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />
    </>
  );
}
