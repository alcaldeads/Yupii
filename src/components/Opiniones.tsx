import { Estrella } from "./Icons";

type Opinion = {
  nombre: string;
  texto: string;
  regalo: string;
  estrellas: number;
  hace: string;
};

const OPINIONES: Opinion[] = [
  {
    nombre: "María Fernández",
    texto:
      "Le regalé a mi esposo la cena degustación por nuestro aniversario. El restaurante fue espectacular, la atención increíble. Ya estoy viendo qué le regalo para Navidad.",
    regalo: "Cena degustación 8 tiempos",
    estrellas: 5,
    hace: "Hace 2 semanas",
  },
  {
    nombre: "Carlos Mejía",
    texto:
      "El salto en paracaídas fue la mejor experiencia de mi vida. El equipo de Skydive Punta Cana es super profesional. Mi hermano no lo podía creer.",
    regalo: "Salto en paracaídas tándem",
    estrellas: 5,
    hace: "Hace 3 semanas",
  },
  {
    nombre: "Ana Lucía Pérez",
    texto:
      "Compré el spa para mi mamá por el Día de las Madres. Me llamó llorando de la emoción. Yupii me salvó de regalar otra cartera.",
    regalo: "Ritual de spa para dos",
    estrellas: 5,
    hace: "Hace 1 mes",
  },
  {
    nombre: "Roberto Sánchez",
    texto:
      "Usamos Yupii para premiar a los 50 mejores vendedores. Cada uno eligió su experiencia. La plataforma es facilísima de usar.",
    regalo: "Cliente corporativo",
    estrellas: 4,
    hace: "Hace 1 mes",
  },
  {
    nombre: "Valentina Díaz",
    texto:
      "El catamarán al atardecer en Bávaro fue mágico. Las fotos quedaron increíbles. Lo recomiendo para parejas.",
    regalo: "Catamarán al atardecer",
    estrellas: 5,
    hace: "Hace 2 meses",
  },
  {
    nombre: "José Miguel Torres",
    texto:
      "Le regalé la ruta del café a mi papá. Volvió hablando del café dominicano como un sommelier. Definitivamente vuelvo a usar Yupii.",
    regalo: "Ruta del café y cascada",
    estrellas: 5,
    hace: "Hace 2 meses",
  },
];

function EstrellaVacia({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

export default function Opiniones() {
  return (
    <section className="opiniones">
      <div className="wrap">
        <h2 className="opiniones-titulo">Lo que dicen nuestros clientes</h2>
        <div className="opinion-grid">
          {OPINIONES.map((o) => (
            <div key={o.nombre} className="opinion-card">
              <div className="opinion-stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <span key={k} className={k < o.estrellas ? "star-filled" : "star-empty"}>
                    {k < o.estrellas ? <Estrella size={16} /> : <EstrellaVacia size={16} />}
                  </span>
                ))}
              </div>
              <p className="opinion-texto">&ldquo;{o.texto}&rdquo;</p>
              <div className="opinion-autor">
                <span className="opinion-nombre">{o.nombre}</span>
                <span className="opinion-regalo">Regaló: {o.regalo}</span>
                <span className="opinion-fecha">{o.hace}</span>
              </div>
              <span className="opinion-verificado">&#10003; Compra verificada</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
