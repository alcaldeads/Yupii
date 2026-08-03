export type Categoria =
  | "Gastronomía"
  | "Bienestar"
  | "Aventura"
  | "Náutico"
  | "Estadías"
  | "Cultura";

export type Producto = {
  id: number;
  slug: string;
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
  historia: string;
  videoCategoria: string;
  imagen: string;
  imagenes: string[];
};

const VIDEO_AVENTURA = "/videos/aventura.mp4";
const VIDEO_NAUTICO = "/videos/nautico.mp4";
const VIDEO_BIENESTAR = "/videos/bienestar.mp4";
const VIDEO_GASTRONOMIA = "/videos/gastronomia.mp4";
const VIDEO_ESTADIAS = "/videos/estadias.mp4";
const VIDEO_CULTURA = "/videos/cultura.mp4";

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    slug: "salto-en-paracaidas",
    titulo: "Salto tándem en paracaídas",
    categoria: "Aventura",
    lugar: "Punta Cana",
    personas: 1,
    rating: 5.0,
    precio: 21500,
    precioAntes: 0,
    glifo: "🪂",
    colores: ["#0F3460", "#3E92CC"],
    etiqueta: "Reserva ahora",
    descripcion:
      "Salto desde 10,000 pies con instructor USPA certificado. Vista completa de la costa este. Video y fotos incluidas.",
    incluye: [
      "Instructor tándem USPA certificado",
      "Equipo completo y briefing de seguridad",
      "Video HD y fotos del salto",
      "Traslado desde tu hotel en Punta Cana",
    ],
    aliados: [
      ["Skydive Punta Cana", "Vuelos 8:00 y 15:00 · todos los días"],
    ],
    historia:
      "Diez mil pies de altura. El viento en la cara. La costa de Punta Cana debajo de ti. Y entonces... saltas. Cuarenta segundos de caída libre que cambian cómo ves todo.",
    videoCategoria: VIDEO_AVENTURA,
    imagen: "https://images.unsplash.com/photo-1474623809196-26c1d33457cc?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1504197885148-4c4dba98b691?w=800&q=80",
      "https://images.unsplash.com/photo-1520869562600-32a31b271cd2?w=800&q=80",
      "https://images.unsplash.com/photo-1525198104776-f6e8a873f9b7?w=800&q=80",
    ],
  },
  {
    id: 2,
    slug: "catamaran-al-atardecer",
    titulo: "Catamarán al atardecer",
    categoria: "Náutico",
    lugar: "Bávaro",
    personas: 2,
    rating: 4.7,
    precio: 5900,
    precioAntes: 7200,
    glifo: "⛵",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva online",
    descripcion:
      "Tres horas de navegación por la costa de Bávaro al atardecer. Barra abierta, snorkel y música a bordo.",
    incluye: [
      "Barra abierta nacional e internacional",
      "Snorkel con equipo incluido",
      "Música en vivo a bordo",
      "Para dos personas",
    ],
    aliados: [
      ["Bávaro Sailing", "Salidas 15:30 diarias"],
      ["Power Adventures", "Miércoles a domingo"],
    ],
    historia:
      "El sol cae sobre el Caribe mientras brindas con la persona que más quieres. Tres horas de sal, brisa y música suave. Esto no se olvida.",
    videoCategoria: VIDEO_NAUTICO,
    imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=80",
    ],
  },
  {
    id: 3,
    slug: "curso-de-kitesurf",
    titulo: "Curso de kitesurf 3 días",
    categoria: "Aventura",
    lugar: "Cabarete",
    personas: 1,
    rating: 4.8,
    precio: 34500,
    precioAntes: 0,
    glifo: "🪁",
    colores: ["#154360", "#5499C7"],
    etiqueta: "",
    descripcion:
      "Tres días de clases en la capital mundial del kitesurf. Instructor IKO certificado, 9 horas totales, equipo incluido.",
    incluye: [
      "9 horas de clase en 3 días",
      "Equipo completo incluido",
      "Instructor IKO certificado",
      "Máximo 3 alumnos por grupo",
    ],
    aliados: [
      ["Cabarete Kite Point", "Todo el año según viento"],
      ["KiteDR", "Octubre a agosto"],
    ],
    historia:
      "Cabarete, la capital mundial del kitesurf. Tres días aprendiendo a volar sobre el agua con instructores IKO. No necesitas experiencia, solo ganas.",
    videoCategoria: VIDEO_AVENTURA,
    imagen: "https://images.unsplash.com/photo-1559291001-693fb9166cba?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800&q=80",
      "https://images.unsplash.com/photo-1515002246390-7bf7e8f87b39?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    ],
  },
  {
    id: 4,
    slug: "buceo-isla-catalina",
    titulo: "Buceo en Isla Catalina",
    categoria: "Náutico",
    lugar: "Bayahíbe",
    personas: 1,
    rating: 4.8,
    precio: 9200,
    precioAntes: 0,
    glifo: "🤿",
    colores: ["#1A5276", "#7FB3D5"],
    etiqueta: "Reserva online",
    descripcion:
      "Dos inmersiones en El Muro y El Acuario de Isla Catalina. Almuerzo en la isla incluido.",
    incluye: [
      "Dos inmersiones guiadas",
      "Equipo completo de buceo",
      "Almuerzo buffet en la isla",
      "Traslado en bote desde Bayahíbe",
    ],
    aliados: [
      ["ScubaFun", "Martes a domingo"],
      ["Dressel Divers", "Todo el año"],
    ],
    historia:
      "Desciendes por El Muro de Catalina y el mundo cambia. Corales, peces tropicales, tortugas. Dos inmersiones en uno de los mejores arrecifes del Caribe.",
    videoCategoria: VIDEO_NAUTICO,
    imagen: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
      "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&q=80",
    ],
  },
  {
    id: 5,
    slug: "vuelo-en-globo",
    titulo: "Vuelo en globo aerostático",
    categoria: "Aventura",
    lugar: "Punta Cana",
    personas: 2,
    rating: 5.0,
    precio: 11500,
    precioAntes: 0,
    glifo: "🎈",
    colores: ["#123C69", "#AC3B61"],
    etiqueta: "Exclusivo",
    descripcion:
      "Vuelo de 1h15min al amanecer sobre Punta Cana. Brindis con espumante, certificado de vuelo y desayuno tropical.",
    incluye: [
      "Vuelo de 1 hora 15 minutos",
      "Brindis con espumante al aterrizar",
      "Certificado de vuelo",
      "Desayuno tropical incluido",
    ],
    aliados: [
      ["Dominican Balloons", "Sábados y domingos al amanecer"],
    ],
    historia:
      "Amanecer desde el cielo. El valle entero debajo de ti mientras el globo sube en silencio. Brindis al aterrizar y un desayuno que sabe a victoria.",
    videoCategoria: VIDEO_AVENTURA,
    imagen: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1495243691856-c3e26fdf094f?w=800&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    ],
  },
  {
    id: 6,
    slug: "spa-para-dos",
    titulo: "Ritual de spa para dos",
    categoria: "Bienestar",
    lugar: "Piantini, Santo Domingo",
    personas: 2,
    rating: 4.8,
    precio: 7200,
    precioAntes: 8600,
    glifo: "💆",
    colores: ["#3C1642", "#B07BAC"],
    etiqueta: "",
    descripcion:
      "Masaje de 80 minutos a cuatro manos, exfoliación corporal, jacuzzi y copa de espumante.",
    incluye: [
      "Masaje de 80 minutos para dos",
      "Exfoliación corporal completa",
      "Acceso a jacuzzi privado",
      "Copa de espumante de cortesía",
    ],
    aliados: [
      ["SD Wellness — Blue Mall", "Todos los días con cita"],
      ["Ondavisión Spa", "Lunes a sábado"],
    ],
    historia:
      "Ochenta minutos de masaje a cuatro manos. Exfoliación, jacuzzi, una copa de espumante. Sales flotando. Sales queriendo volver.",
    videoCategoria: VIDEO_BIENESTAR,
    imagen: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
    ],
  },
  {
    id: 7,
    slug: "villa-frente-al-mar",
    titulo: "Noche en villa boutique frente al mar",
    categoria: "Estadías",
    lugar: "Las Terrenas, Samaná",
    personas: 2,
    rating: 4.9,
    precio: 9900,
    precioAntes: 0,
    glifo: "🏨",
    colores: ["#7E5109", "#F5B041"],
    etiqueta: "",
    descripcion:
      "Villa privada con piscina, desayuno en la terraza mirando el Atlántico y late checkout.",
    incluye: [
      "Villa completa para dos",
      "Desayuno servido en la terraza",
      "Piscina privada",
      "Late check-out sin costo",
    ],
    aliados: [
      ["Saman Boutique Hotel", "Sujeto a disponibilidad"],
    ],
    historia:
      "Te despiertas con el sonido del mar. Piscina privada. Desayuno en la terraza mirando el Atlántico. Check-out cuando tú quieras.",
    videoCategoria: VIDEO_ESTADIAS,
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
  },
  {
    id: 8,
    slug: "ruta-del-cafe",
    titulo: "Ruta del café y cascada",
    categoria: "Cultura",
    lugar: "Jarabacoa",
    personas: 2,
    rating: 4.6,
    precio: 3200,
    precioAntes: 4200,
    glifo: "☕",
    colores: ["#4D3319", "#A9714B"],
    etiqueta: "",
    descripcion:
      "Tour de finca cafetalera, tueste y cata de café, almuerzo típico y caminata a la cascada Jimenoa.",
    incluye: [
      "Tour de finca con tueste y cata",
      "Almuerzo típico dominicano",
      "Entrada a cascada Jimenoa",
      "Guía local bilingüe",
    ],
    aliados: [
      ["Finca Monte Alto", "Miércoles a domingo"],
      ["Rancho Baiguate", "Todos los días"],
    ],
    historia:
      "Caminas entre cafetales a mil metros de altura. Tuestas tu propio café. Almuerzas en la montaña. Y terminas bajo una cascada de 40 metros.",
    videoCategoria: VIDEO_CULTURA,
    imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    ],
  },
  {
    id: 9,
    slug: "ballenas-jorobadas",
    titulo: "Avistamiento de ballenas jorobadas",
    categoria: "Aventura",
    lugar: "Samaná",
    personas: 2,
    rating: 4.9,
    precio: 4800,
    precioAntes: 0,
    glifo: "🐋",
    colores: ["#0B3D3B", "#45B39D"],
    etiqueta: "Temporada Ene-Mar",
    descripcion:
      "Salida en bote con guía biólogo a la bahía de Samaná. Temporada de enero a marzo.",
    incluye: [
      "Bote con guía biólogo marino",
      "Chaleco y seguro incluidos",
      "Café y frutas tropicales a bordo",
      "Para dos personas",
    ],
    aliados: [
      ["Whale Samaná", "15 de enero al 25 de marzo"],
    ],
    historia:
      "Cada invierno, miles de ballenas jorobadas llegan a la bahía de Samaná a tener sus crías. Verlas saltar a metros de tu bote es algo que no se puede explicar.",
    videoCategoria: VIDEO_AVENTURA,
    imagen: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1454991727061-be514eae86f7?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-92ab472cad1d?w=800&q=80",
    ],
  },
  {
    id: 10,
    slug: "cena-degustacion",
    titulo: "Cena degustación del chef",
    categoria: "Gastronomía",
    lugar: "Zona Colonial, Santo Domingo",
    personas: 2,
    rating: 4.9,
    precio: 8500,
    precioAntes: 10500,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Reserva online",
    descripcion:
      "Menú de 8 tiempos con maridaje en una casona del siglo XVII. Cocina abierta, solo 12 asientos por noche.",
    incluye: [
      "Ocho tiempos para dos personas",
      "Maridaje de vinos incluido",
      "Mesa reservada a tu nombre",
      "Cocina abierta del chef",
    ],
    aliados: [
      ["Fine Dining Zona Colonial", "Martes a sábado · 19:00 y 21:00"],
    ],
    historia:
      "Una casona del siglo XVII. Doce asientos. Ocho tiempos con maridaje. El chef cocina frente a ti. Cada plato cuenta una historia del Caribe.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    ],
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
    filtro: (p) => [1, 2, 5, 6, 10, 7].includes(p.id),
  },
  {
    id: "ofertas",
    titulo: "Ofertas de la semana",
    filtro: (p) => p.precioAntes > 0,
  },
];

export type CatSection = {
  id: string;
  titulo: string;
  categoria: Categoria;
  gradiente: string;
  videoUrl: string;
  youtubeId?: string;
  youtubeStart?: number;
};

export const SECCIONES_CAT: CatSection[] = [
  {
    id: "aventura",
    titulo: "Aventura y adrenalina",
    categoria: "Aventura",
    gradiente: "linear-gradient(135deg, #0F3460 0%, #1a6fa0 50%, #3E92CC 100%)",
    videoUrl: VIDEO_AVENTURA,
    youtubeId: "a-ABV-HpSXM",
    youtubeStart: 23,
  },
  {
    id: "nautico",
    titulo: "Mar y navegación",
    categoria: "Náutico",
    gradiente: "linear-gradient(135deg, #0E6251 0%, #1a8a7a 50%, #48C9B0 100%)",
    videoUrl: VIDEO_NAUTICO,
  },
  {
    id: "bienestar",
    titulo: "Bienestar y spa",
    categoria: "Bienestar",
    gradiente: "linear-gradient(135deg, #3C1642 0%, #6b3a70 50%, #B07BAC 100%)",
    videoUrl: VIDEO_BIENESTAR,
  },
  {
    id: "gastronomia",
    titulo: "Gastronomía y sabor",
    categoria: "Gastronomía",
    gradiente: "linear-gradient(135deg, #6E2C00 0%, #a05a1a 50%, #D68910 100%)",
    videoUrl: VIDEO_GASTRONOMIA,
  },
  {
    id: "estadias",
    titulo: "Estadías y escapes",
    categoria: "Estadías",
    gradiente: "linear-gradient(135deg, #7E5109 0%, #b07a2a 50%, #F5B041 100%)",
    videoUrl: VIDEO_ESTADIAS,
  },
  {
    id: "cultura",
    titulo: "Cultura y naturaleza",
    categoria: "Cultura",
    gradiente: "linear-gradient(135deg, #4D3319 0%, #7a5a3a 50%, #A9714B 100%)",
    videoUrl: VIDEO_CULTURA,
  },
];

export const CATEGORIAS: { cat: Categoria; icono: string; nombre: string }[] = [
  { cat: "Aventura", icono: "🪂", nombre: "Aventura" },
  { cat: "Náutico", icono: "⛵", nombre: "Náutico" },
  { cat: "Bienestar", icono: "💆", nombre: "Bienestar y spa" },
  { cat: "Gastronomía", icono: "🍽️", nombre: "Gastronomía" },
  { cat: "Estadías", icono: "🏨", nombre: "Estadías" },
  { cat: "Cultura", icono: "☕", nombre: "Cultura y naturaleza" },
];
