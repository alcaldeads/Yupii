export type Categoria =
  | "Gastronomía"
  | "Bienestar"
  | "Aventura"
  | "Náutico"
  | "Estadías"
  | "Cultura"
  | "Eventos";

export type Producto = {
  id: number;
  titulo: string;
  categoria: Categoria;
  lugar: string;
  personas: number;
  rating: number;
  precio: number;
  precioAntes: number;
  glifo: string;
  colores: [string, string];
  etiqueta: string;
  descripcion: string;
  incluye: string[];
  aliados: [string, string][];
};

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    titulo: "Cena degustación de 8 tiempos",
    categoria: "Gastronomía",
    lugar: "Zona Colonial",
    personas: 2,
    rating: 4.9,
    precio: 8900,
    precioAntes: 10500,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Reserva online",
    descripcion:
      "Menú del chef con maridaje en una casona restaurada del siglo XVII. Cocina abierta y solo doce asientos por noche.",
    incluye: [
      "Ocho tiempos para dos personas",
      "Maridaje de vinos incluido",
      "Mesa reservada a tu nombre",
      "Válido de martes a sábado",
    ],
    aliados: [
      ["Mesón de la Zona", "Martes a sábado · 19:00 y 21:00"],
      ["Casa Bastidas", "Jueves a domingo · 20:00"],
    ],
  },
  {
    id: 2,
    titulo: "Salto en paracaídas tándem",
    categoria: "Aventura",
    lugar: "Punta Cana",
    personas: 1,
    rating: 5.0,
    precio: 19500,
    precioAntes: 0,
    glifo: "🪂",
    colores: ["#0F3460", "#3E92CC"],
    etiqueta: "Reserva ahora",
    descripcion:
      "Salto desde 10,000 pies con instructor certificado. Vista completa de la costa este antes de abrir el paracaídas.",
    incluye: [
      "Instructor tándem certificado",
      "Equipo completo y briefing",
      "Video y fotos del salto",
      "Traslado desde tu hotel",
    ],
    aliados: [
      ["Skydive Punta Cana", "Vuelos 8:00 y 15:00 · todos los días"],
      ["Bávaro Adventures", "Fines de semana"],
    ],
  },
  {
    id: 3,
    titulo: "Ritual de spa para dos",
    categoria: "Bienestar",
    lugar: "Piantini",
    personas: 2,
    rating: 4.8,
    precio: 7200,
    precioAntes: 8600,
    glifo: "💆",
    colores: ["#3C1642", "#B07BAC"],
    etiqueta: "",
    descripcion:
      "Masaje de 80 minutos a cuatro manos, exfoliación corporal, sauna y circuito de hidroterapia.",
    incluye: [
      "Masaje de 80 minutos para dos",
      "Exfoliación y sauna",
      "Circuito de hidroterapia",
      "Copa de espumante",
    ],
    aliados: [
      ["SD Wellness — Blue Mall", "Todos los días con cita"],
      ["Ondavisión Spa", "Lunes a sábado"],
    ],
  },
  {
    id: 4,
    titulo: "Catamarán al atardecer",
    categoria: "Náutico",
    lugar: "Bávaro",
    personas: 2,
    rating: 4.7,
    precio: 6400,
    precioAntes: 0,
    glifo: "⛵",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva ahora",
    descripcion:
      "Tres horas de navegación por la costa, con parada para snorkel y piscina natural. Barra abierta a bordo.",
    incluye: [
      "Barra abierta nacional",
      "Snorkel con equipo",
      "Música en vivo los viernes",
      "Para dos personas",
    ],
    aliados: [
      ["Bávaro Sailing", "Salidas 15:30 diarias"],
      ["Ocean Adventures", "Miércoles a domingo"],
    ],
  },
  {
    id: 5,
    titulo: "Una noche en villa frente al mar",
    categoria: "Estadías",
    lugar: "Las Terrenas",
    personas: 2,
    rating: 4.9,
    precio: 23500,
    precioAntes: 0,
    glifo: "🏨",
    colores: ["#7E5109", "#F5B041"],
    etiqueta: "",
    descripcion:
      "Villa privada con piscina y desayuno servido en la terraza. Check-out tardío sin costo.",
    incluye: [
      "Villa completa para dos",
      "Desayuno en la terraza",
      "Piscina privada",
      "Check-out a las 15:00",
    ],
    aliados: [
      ["Villa Aliseo", "Sujeto a disponibilidad"],
      ["Casa Cosón", "Todo el año"],
    ],
  },
  {
    id: 6,
    titulo: "Curso de kitesurf para principiantes",
    categoria: "Aventura",
    lugar: "Cabarete",
    personas: 1,
    rating: 4.8,
    precio: 11800,
    precioAntes: 13500,
    glifo: "🪁",
    colores: ["#154360", "#5499C7"],
    etiqueta: "",
    descripcion:
      "Tres días de clases en la capital mundial del kitesurf. No necesitas experiencia previa.",
    incluye: [
      "9 horas de clase en 3 días",
      "Equipo completo incluido",
      "Instructor IKO certificado",
      "Máximo 3 alumnos por grupo",
    ],
    aliados: [
      ["Cabarete Kite School", "Todo el año según viento"],
      ["Laurel Eastman", "Octubre a agosto"],
    ],
  },
  {
    id: 7,
    titulo: "Avistamiento de ballenas jorobadas",
    categoria: "Aventura",
    lugar: "Samaná",
    personas: 2,
    rating: 4.9,
    precio: 5200,
    precioAntes: 0,
    glifo: "🐋",
    colores: ["#0B3D3B", "#45B39D"],
    etiqueta: "Temporada",
    descripcion:
      "Salida en bote a la bahía de Samaná con guía biólogo. Del 15 de enero al 25 de marzo.",
    incluye: [
      "Bote con guía biólogo",
      "Chaleco y seguro",
      "Café y frutas a bordo",
      "Para dos personas",
    ],
    aliados: [["Whale Samaná", "15 de enero al 25 de marzo"]],
  },
  {
    id: 8,
    titulo: "Buceo en la Isla Catalina",
    categoria: "Náutico",
    lugar: "Bayahíbe",
    personas: 1,
    rating: 4.8,
    precio: 9600,
    precioAntes: 0,
    glifo: "🤿",
    colores: ["#1A5276", "#7FB3D5"],
    etiqueta: "Reserva online",
    descripcion:
      "Dos inmersiones en la pared de Catalina, uno de los mejores arrecifes del Caribe.",
    incluye: [
      "Dos inmersiones guiadas",
      "Equipo completo",
      "Almuerzo en la isla",
      "Traslado en bote",
    ],
    aliados: [
      ["Bayahíbe Divers", "Martes a domingo"],
      ["Casa Daniel", "Todo el año"],
    ],
  },
  {
    id: 9,
    titulo: "Ruta del café y cascada",
    categoria: "Cultura",
    lugar: "Jarabacoa",
    personas: 2,
    rating: 4.6,
    precio: 3400,
    precioAntes: 4200,
    glifo: "☕",
    colores: ["#4D3319", "#A9714B"],
    etiqueta: "",
    descripcion:
      "Finca cafetalera, tueste y cata, y caminata a la cascada Jimenoa. Día completo con almuerzo.",
    incluye: [
      "Tour de finca con cata",
      "Almuerzo típico",
      "Entrada a la cascada",
      "Guía local",
    ],
    aliados: [
      ["Finca Alta Gracia", "Miércoles a domingo"],
      ["Rancho Baiguate", "Todos los días"],
    ],
  },
  {
    id: 10,
    titulo: "Cata de ron dominicano premium",
    categoria: "Gastronomía",
    lugar: "Zona Colonial",
    personas: 2,
    rating: 4.7,
    precio: 2900,
    precioAntes: 0,
    glifo: "🥃",
    colores: ["#5D2F0E", "#C77C3C"],
    etiqueta: "",
    descripcion:
      "Cata guiada de seis rones añejos con maridaje de chocolate y tabaco.",
    incluye: [
      "Seis rones añejos",
      "Maridaje de chocolate",
      "Sommelier de ron",
      "Para dos personas",
    ],
    aliados: [["Ron Bar Zona Colonial", "Jueves a sábado · 20:00"]],
  },
  {
    id: 11,
    titulo: "Clase privada de cocina dominicana",
    categoria: "Cultura",
    lugar: "Santiago",
    personas: 2,
    rating: 4.9,
    precio: 4100,
    precioAntes: 0,
    glifo: "👩‍🍳",
    colores: ["#7B241C", "#E59866"],
    etiqueta: "",
    descripcion:
      "Cocinas y te comes un sancocho, tostones y habichuelas con dulce, con una cocinera de la casa.",
    incluye: [
      "Clase de 3 horas",
      "Todos los ingredientes",
      "Almuerzo con lo que cocinaste",
      "Recetario para llevar",
    ],
    aliados: [["Cocina de Doña Elba", "Sábados · 10:00"]],
  },
  {
    id: 12,
    titulo: "Brunch con vista al Malecón",
    categoria: "Gastronomía",
    lugar: "Santo Domingo",
    personas: 2,
    rating: 4.5,
    precio: 3600,
    precioAntes: 4300,
    glifo: "🥂",
    colores: ["#1C4E80", "#8AB6D6"],
    etiqueta: "",
    descripcion:
      "Brunch de domingo con mimosas ilimitadas durante dos horas y vista al mar Caribe.",
    incluye: [
      "Brunch buffet para dos",
      "Mimosas ilimitadas 2 horas",
      "Mesa junto a la ventana",
    ],
    aliados: [["Terraza Malecón", "Domingos · 11:00 a 15:00"]],
  },
  {
    id: 13,
    titulo: "Masaje descontracturante 60 min",
    categoria: "Bienestar",
    lugar: "Naco",
    personas: 1,
    rating: 4.6,
    precio: 2400,
    precioAntes: 0,
    glifo: "🧖",
    colores: ["#4A235A", "#BB8FCE"],
    etiqueta: "Reserva online",
    descripcion:
      "Masaje profundo de espalda, cuello y hombros con aceites tibios.",
    incluye: ["60 minutos de masaje", "Aceites esenciales", "Té de cortesía"],
    aliados: [
      ["Zen Spa Naco", "Lunes a sábado"],
      ["Aura Wellness", "Todos los días"],
    ],
  },
  {
    id: 14,
    titulo: "Concierto en Altos de Chavón",
    categoria: "Eventos",
    lugar: "La Romana",
    personas: 2,
    rating: 4.9,
    precio: 14500,
    precioAntes: 0,
    glifo: "🎤",
    colores: ["#2C1A47", "#7D5BA6"],
    etiqueta: "Últimos cupos",
    descripcion:
      "Dos entradas al anfiteatro griego con vista al río Chavón. Fecha a elegir de la cartelera.",
    incluye: [
      "Dos entradas preferenciales",
      "Acceso al pueblo artesanal",
      "Estacionamiento incluido",
    ],
    aliados: [["Anfiteatro Altos de Chavón", "Según cartelera"]],
  },
  {
    id: 15,
    titulo: "Noche de comedia en vivo",
    categoria: "Eventos",
    lugar: "Santo Domingo",
    personas: 2,
    rating: 4.4,
    precio: 2200,
    precioAntes: 2800,
    glifo: "🎭",
    colores: ["#7D1128", "#D36B7A"],
    etiqueta: "",
    descripcion:
      "Show de stand-up con tres comediantes dominicanos y dos tragos incluidos.",
    incluye: ["Dos entradas", "Dos tragos incluidos", "Mesa reservada"],
    aliados: [["Comedy Club RD", "Viernes y sábados · 21:00"]],
  },
  {
    id: 16,
    titulo: "Escapada de un día a Isla Saona",
    categoria: "Aventura",
    lugar: "Bayahíbe",
    personas: 2,
    rating: 4.8,
    precio: 7800,
    precioAntes: 9200,
    glifo: "🏝️",
    colores: ["#0A6E70", "#5DD3C6"],
    etiqueta: "Reserva ahora",
    descripcion:
      "Catamarán y lancha rápida, piscina natural, almuerzo buffet en la playa y barra abierta.",
    incluye: [
      "Traslado ida y vuelta",
      "Almuerzo buffet",
      "Barra abierta",
      "Guía en español e inglés",
    ],
    aliados: [
      ["Saona Dreams", "Todos los días"],
      ["Isla Tour RD", "Lunes a sábado"],
    ],
  },
  {
    id: 17,
    titulo: "Vuelo en globo aerostático",
    categoria: "Aventura",
    lugar: "Constanza",
    personas: 2,
    rating: 5.0,
    precio: 26500,
    precioAntes: 0,
    glifo: "🎈",
    colores: ["#123C69", "#AC3B61"],
    etiqueta: "Exclusivo",
    descripcion:
      "Amanecer sobre el valle de Constanza, con brindis al aterrizar y certificado de vuelo.",
    incluye: [
      "Vuelo de 45 minutos",
      "Brindis al aterrizar",
      "Certificado de vuelo",
      "Traslado desde el hotel",
    ],
    aliados: [["Constanza Balloons", "Sábados y domingos al amanecer"]],
  },
  {
    id: 18,
    titulo: "Suite con jacuzzi frente al mar",
    categoria: "Estadías",
    lugar: "Cap Cana",
    personas: 2,
    rating: 4.9,
    precio: 31000,
    precioAntes: 36000,
    glifo: "🛁",
    colores: ["#0B3C5D", "#328CC1"],
    etiqueta: "",
    descripcion:
      "Una noche en suite con terraza privada, jacuzzi y desayuno para dos.",
    incluye: [
      "Suite con jacuzzi privado",
      "Desayuno para dos",
      "Acceso a playa y piscina",
      "Late check-out",
    ],
    aliados: [["Cap Cana Resort", "Sujeto a disponibilidad"]],
  },
];

export type Fila = {
  id: string;
  titulo: string;
  filtro: (p: Producto) => boolean;
};

export const FILAS: Fila[] = [
  {
    id: "lo-mas",
    titulo: "Lo más regalado",
    filtro: (p) => [2, 1, 5, 16, 4, 3].includes(p.id),
  },
  {
    id: "ofertas",
    titulo: "Ofertas de la semana",
    filtro: (p) => p.precioAntes > 0,
  },
  {
    id: "gastro",
    titulo: "Gastronomía y bebidas",
    filtro: (p) => p.categoria === "Gastronomía",
  },
  {
    id: "aventura",
    titulo: "Deportes y actividades al aire libre",
    filtro: (p) => p.categoria === "Aventura" || p.categoria === "Náutico",
  },
  {
    id: "hoteles",
    titulo: "Hoteles y lugares increíbles",
    filtro: (p) => p.categoria === "Estadías",
  },
  {
    id: "bienestar",
    titulo: "Estar bien",
    filtro: (p) => p.categoria === "Bienestar",
  },
  {
    id: "eventos",
    titulo: "Eventos",
    filtro: (p) => p.categoria === "Eventos" || p.categoria === "Cultura",
  },
];

export const CATEGORIAS: { cat: Categoria; icono: string; nombre: string }[] = [
  { cat: "Gastronomía", icono: "🍽️", nombre: "Gastronomía" },
  { cat: "Bienestar", icono: "💆", nombre: "Bienestar y spa" },
  { cat: "Aventura", icono: "🪂", nombre: "Aventura" },
  { cat: "Estadías", icono: "🏨", nombre: "Estadías" },
  { cat: "Náutico", icono: "⛵", nombre: "Náutico" },
  { cat: "Cultura", icono: "🎭", nombre: "Cultura y talleres" },
];
