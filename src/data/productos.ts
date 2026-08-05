export type Categoria =
  | "Gastronomía"
  | "Bienestar"
  | "Aventura"

  | "Estadías"
  | "Cultura"
  | "Niños y Familia";

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
  tipo?: string;
  zona?: string;
};

const VIDEO_AVENTURA = "/video/aventura.mp4";

const VIDEO_BIENESTAR = "/video/bienestar.mp4";
const VIDEO_GASTRONOMIA = "/video/gastronomia.mp4";
const VIDEO_ESTADIAS = "/video/estadias.mp4";
const VIDEO_CULTURA = "/video/cultura.mp4";
const VIDEO_NINOS = "/video/ninos.mp4";

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
    categoria: "Aventura",
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
    videoCategoria: VIDEO_AVENTURA,
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
    categoria: "Aventura",
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
    videoCategoria: VIDEO_AVENTURA,
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
  // ─────────────────────────────────────────────────
  // 20 RESTAURANTES REALES — PUNTA CANA
  // ─────────────────────────────────────────────────
  {
    id: 11,
    slug: "mediterraneo-eden-roc",
    titulo: "Mediterraneo at Eden Roc",
    categoria: "Gastronomía",
    lugar: "Cap Cana",
    personas: 2,
    rating: 4.9,
    precio: 8500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Exclusivo",
    descripcion:
      "Restaurante insignia del único Relais & Châteaux de RD. Menú estacional, ingredientes europeos artesanales. Solo 12 mesas por noche.",
    incluye: [
      "Copa de espumante de bienvenida",
      "Cuatro tiempos con maridaje de vinos",
      "Mesa reservada a tu nombre",
      "Para dos personas",
    ],
    aliados: [
      ["Eden Roc Cap Cana", "Martes a sábado · 19:00–22:00"],
    ],
    historia:
      "El único Relais & Châteaux de República Dominicana abre las puertas de su restaurante insignia. Doce mesas, menú que cambia con las estaciones, ingredientes traídos de proveedores europeos. Aquí cada plato es una obra de arte y la terraza con vista a jardines tropicales iluminados es el escenario perfecto.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    ],
  },
  {
    id: 12,
    slug: "la-palapa-eden-roc",
    titulo: "La Palapa by Eden Roc",
    categoria: "Gastronomía",
    lugar: "Cap Cana",
    personas: 2,
    rating: 4.8,
    precio: 6500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva online",
    descripcion:
      "El primer restaurante de Cap Cana, desde 2003. Pabellón abierto sobre el océano con ceviche, pastas artesanales y mariscos del día.",
    incluye: [
      "Ceviche del día a compartir",
      "Plato principal de mariscos para cada uno",
      "Postre tropical",
      "Para dos personas",
    ],
    aliados: [
      ["Eden Roc Cap Cana", "Todos los días · 12:00–22:30"],
    ],
    historia:
      "Desde 2003, La Palapa es el restaurante que lo empezó todo en Cap Cana. Un pabellón abierto donde el mar Caribe rompe a tus pies mientras disfrutas ceviches preparados por chefs de Italia, Suiza y República Dominicana. El sonido del océano es tu banda sonora.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    ],
  },
  {
    id: 13,
    slug: "blue-grill-eden-roc",
    titulo: "Blue Grill + Bar",
    categoria: "Gastronomía",
    lugar: "Cap Cana",
    personas: 2,
    rating: 4.7,
    precio: 7200,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#154360", "#5499C7"],
    etiqueta: "",
    descripcion:
      "Cocina Nikkei (peruana-japonesa) con show de cocina abierta del Chef Koyi Murrieta. Única fusión de este tipo en el Caribe.",
    incluye: [
      "Tiradito de atún o salmón",
      "Selección robatayaki del chef",
      "Postre japonés",
      "Para dos personas",
    ],
    aliados: [
      ["Eden Roc Beach Club", "Miércoles a lunes · 18:00–23:00"],
    ],
    historia:
      "El Chef Koyi Murrieta lidera un show-kitchen donde la técnica japonesa Robatayaki se fusiona con sabores peruanos. Es cocina Nikkei en su máxima expresión — una combinación que no encontrarás en ningún otro restaurante del Caribe. La barra de cócteles artesanales y la cava de puros completan la experiencia.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
    ],
  },
  {
    id: 14,
    slug: "cenote-cave-dining",
    titulo: "Cenote Cave Dining",
    categoria: "Gastronomía",
    lugar: "Cap Cana",
    personas: 2,
    rating: 5.0,
    precio: 35000,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#3C1642", "#B07BAC"],
    etiqueta: "Exclusivo",
    descripcion:
      "Cena privada dentro de un cenote subterráneo. Champagne, saxofonista en vivo sobre una roca, butler privado. La experiencia más exclusiva del Caribe.",
    incluye: [
      "Cena privada de 4 tiempos en la cueva",
      "Champagne y bouquet de rosas",
      "Saxofonista en vivo",
      "Butler privado toda la noche",
    ],
    aliados: [
      ["Eden Roc Cap Cana", "Solo por reservación privada"],
    ],
    historia:
      "Un cenote natural oculto al pie de un acantilado de 20 metros, iluminado con luces violeta y rosa, rodeado de vegetación selvática. Desciendes a una cueva donde te espera una mesa para dos con champagne, un saxofonista tocando sobre una roca y un butler privado. Es la cena más exclusiva que existe en el Caribe — literalmente de otro mundo.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    ],
  },
  {
    id: 15,
    slug: "drago-grill-cap-cana",
    titulo: "Drago Grill",
    categoria: "Gastronomía",
    lugar: "Cap Cana Marina",
    personas: 2,
    rating: 4.6,
    precio: 6800,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Reserva online",
    descripcion:
      "Steakhouse argentino en la marina de Cap Cana. Cortes premium con vista a los yates iluminados. Música en vivo.",
    incluye: [
      "Provoleta a la parrilla",
      "Corte premium a elegir (300g)",
      "Guarniciones gourmet",
      "Para dos personas",
    ],
    aliados: [
      ["Drago Grill", "Todos los días · 12:00–23:00"],
    ],
    historia:
      "En la marina de Cap Cana, con yates iluminados como telón de fondo, Drago sirve los mejores cortes argentinos de la zona. El churrasco es perfecto, el ribeye de exportación y la lubina son leyenda. La música en vivo complementa una noche que se siente como un puerto mediterráneo en el Caribe.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
    ],
  },
  {
    id: 16,
    slug: "juanillo-beach-club",
    titulo: "Juanillo Grill & Beach Club",
    categoria: "Gastronomía",
    lugar: "Playa Juanillo, Cap Cana",
    personas: 2,
    rating: 4.7,
    precio: 5200,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "",
    descripcion:
      "Beach dining en Playa Juanillo — una de las playas más bellas del Caribe. Paella, mariscos y pies en la arena.",
    incluye: [
      "Ceviche del día a compartir",
      "Plato principal de mariscos o paella",
      "Postre tropical",
      "Para dos personas",
    ],
    aliados: [
      ["Juanillo Grill", "Todos los días · 10:00–22:00"],
    ],
    historia:
      "Playa Juanillo está considerada una de las playas más hermosas de República Dominicana. Arena blanca, aguas cristalinas turquesa y una cocina que fusiona sabores mediterráneos y caribeños. Las cabañas y tumbonas están incluidas. La tarde se convierte en noche sin que te des cuenta.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1540541338287-41700c64f5e0?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    ],
  },
  {
    id: 17,
    slug: "harvest-cap-cana",
    titulo: "Harvest Cap Cana",
    categoria: "Gastronomía",
    lugar: "Los Establos, Cap Cana",
    personas: 2,
    rating: 4.5,
    precio: 4800,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#4D3319", "#A9714B"],
    etiqueta: "",
    descripcion:
      "Farm-to-table orgánico en la zona ecuestre de Cap Cana. Menú estacional con ingredientes 100% locales y sostenibles.",
    incluye: [
      "Ensalada del huerto orgánico",
      "Plato principal de la cosecha del día",
      "Postre de temporada",
      "Para dos personas",
    ],
    aliados: [
      ["Harvest Cap Cana", "Miércoles a domingo · 18:00–22:00"],
    ],
    historia:
      "En Los Establos, la zona ecuestre de Cap Cana, Harvest es un concepto auténtico de farm-to-table donde cada ingrediente cuenta una historia de origen local. El menú cambia según la cosecha — carnes de pastoreo, mariscos del día y vegetales orgánicos de productores dominicanos. Es comer con conciencia.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    ],
  },
  {
    id: 18,
    slug: "sbg-punta-cana",
    titulo: "SBG Punta Cana",
    categoria: "Gastronomía",
    lugar: "BlueMall, Downtown Punta Cana",
    personas: 2,
    rating: 4.8,
    precio: 7500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Reserva online",
    descripcion:
      "Restaurante #1 de Punta Cana según Guía Macarfi. Antes Bachata Rosa (Juan Luis Guerra). Rock shrimp tempura y arroz de pato son leyenda.",
    incluye: [
      "Rock shrimp tempura (entrada signature)",
      "Plato principal a elegir del menú",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["SBG Punta Cana", "Martes a domingo · 18:00–23:00"],
    ],
    historia:
      "Antes conocido como Bachata Rosa, co-creado con Juan Luis Guerra, SBG es el restaurante mejor calificado de toda la región Este según la Guía Macarfi 2025. Dos salones con diseño dramático — techos altos, cocina visible y ventanales que miran a fuentes de agua. El rock shrimp tempura y el arroz de pato frito son platos que la gente cruza la isla para probar.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f0b?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    ],
  },
  {
    id: 19,
    slug: "noah-restaurant",
    titulo: "Noah Restaurant & Lounge",
    categoria: "Gastronomía",
    lugar: "Boulevard San Juan, Downtown",
    personas: 2,
    rating: 4.6,
    precio: 4500,
    precioAntes: 5800,
    glifo: "🍽️",
    colores: ["#3C1642", "#B07BAC"],
    etiqueta: "",
    descripcion:
      "Restaurante-lounge retro-moderno. Fusión latina con ravioli de langosta, mofongo de codorniz y cócteles de autor excepcionales.",
    incluye: [
      "Entrada de fusión a compartir",
      "Plato principal a elegir",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Noah Restaurant", "Martes a domingo · 17:00–01:00"],
    ],
    historia:
      "Noah es tanto sobre la comida como sobre el vibe. Booths acolchados de cuero, iluminación perfecta y la mejor música. El menú va desde ravioli de langosta hasta mofongo de codorniz y fusión caribeña-japonesa. Los cócteles artesanales son una experiencia en sí mismos — el barman es un artista.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    ],
  },
  {
    id: 20,
    slug: "citrus-fusion",
    titulo: "Citrus Fusion Cuisine",
    categoria: "Gastronomía",
    lugar: "Avenida Alemania, Downtown",
    personas: 2,
    rating: 4.5,
    precio: 3800,
    precioAntes: 4500,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "",
    descripcion:
      "Fusión de 6 cocinas del mundo: italiana, caribeña, asiática, mexicana, chilena y dominicana. Música en vivo y apto para todos.",
    incluye: [
      "Entrada internacional a elegir",
      "Plato principal de cualquier cocina",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Citrus Fusion", "Todos los días · 08:00–00:00"],
    ],
    historia:
      "Un verdadero crisol culinario donde convergen seis cocinas — italiana, caribeña, asiática, mexicana, chilena y dominicana. Tortellini de langosta, mahi-mahi mediterráneo, risotto negro. Cada plato es un viaje. La música en vivo le da energía y el menú acomoda todas las preferencias dietéticas, incluyendo veganos y celíacos.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    ],
  },
  {
    id: 21,
    slug: "la-yola",
    titulo: "La Yola",
    categoria: "Gastronomía",
    lugar: "Puntacana Yacht Club",
    personas: 2,
    rating: 4.8,
    precio: 7000,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva online",
    descripcion:
      "Construido sobre pilotes en el mar Caribe. El restaurante más romántico de Punta Cana. Snapper dominicano y camarones al coco icónicos.",
    incluye: [
      "Ceviche o carpaccio de pulpo",
      "Snapper dominicano o camarones al coco",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Puntacana Resort & Club", "Todos los días · 18:30–22:30"],
    ],
    historia:
      "Construido sobre pilotes sobre el mar Caribe, inspirado en la yola dominicana — el bote de pesca tradicional. Ampliamente considerado el restaurante más romántico de Punta Cana. El atardecer aquí es un espectáculo natural que cambia cada noche. Vienes por la vista, te quedas por el snapper dominicano.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    ],
  },
  {
    id: 22,
    slug: "bamboo-tortuga-bay",
    titulo: "Bamboo at Tortuga Bay",
    categoria: "Gastronomía",
    lugar: "Tortuga Bay, Puntacana Resort",
    personas: 2,
    rating: 4.9,
    precio: 8000,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#7E5109", "#F5B041"],
    etiqueta: "Exclusivo",
    descripcion:
      "Diseñado por Oscar de la Renta. AAA Four Diamond. Vegetales del huerto orgánico propio. Uno de los más exclusivos del Caribe.",
    incluye: [
      "Jugo orgánico del huerto",
      "Ensalada del jardín propio",
      "Plato principal orgánico premium",
      "Para dos personas",
    ],
    aliados: [
      ["Tortuga Bay Hotel", "Todos los días · 07:00–22:00"],
    ],
    historia:
      "El restaurante diseñado por el legendario Oscar de la Renta en Tortuga Bay. Ganador del AAA Four Diamond Award. Los vegetales crecen en sus propios jardines orgánicos, los jugos son recién exprimidos. Es uno de los espacios gastronómicos más exclusivos del Caribe — cada detalle lleva la estética del maestro dominicano.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1470337458703-46a7e6bf5c2b?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80",
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    ],
  },
  {
    id: 23,
    slug: "jellyfish-beach",
    titulo: "Jellyfish Beach Restaurant",
    categoria: "Gastronomía",
    lugar: "Playa Bávaro",
    personas: 2,
    rating: 4.7,
    precio: 5500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva online",
    descripcion:
      "El restaurante de playa más icónico de Bávaro. Boho-chic con techo de paja. De beach club de día a gourmet de noche. Langosta legendaria.",
    incluye: [
      "Ceviche o taco de pescado",
      "Plato principal a elegir",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Jellyfish Restaurant", "Todos los días · 10:00–23:00"],
    ],
    historia:
      "Uno de los restaurantes más reconocidos de Punta Cana. Arquitectura boho-chic con techo de paja directamente sobre la arena de Bávaro. De día es un beach club relajado, de noche se transforma en una experiencia gourmet con cócteles premium. La langosta y el rack de cordero de Nueva Zelanda son legendarios.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    ],
  },
  {
    id: 24,
    slug: "passion-berasategui",
    titulo: "Passion by Martín Berasategui",
    categoria: "Gastronomía",
    lugar: "Paradisus Palma Real, Bávaro",
    personas: 2,
    rating: 4.8,
    precio: 7800,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "Exclusivo",
    descripcion:
      "Del chef español con 8 estrellas Michelin. Solo adultos. AAA Four Diamond. Menú degustación de 7 tiempos que es un viaje gastronómico.",
    incluye: [
      "Amuse-bouche del chef",
      "Menú degustación de 7 tiempos",
      "Maridaje de 3 vinos españoles",
      "Para dos personas",
    ],
    aliados: [
      ["Paradisus Palma Real", "Jueves a martes · 18:00–22:30"],
    ],
    historia:
      "Creado por Martín Berasategui, el chef español con más estrellas Michelin — 8 en total. Solo para adultos. Ganador del AAA Four Diamond Award. Un menú degustación de 7 tiempos que es un viaje por la España contemporánea adaptada al Caribe. Es una de las experiencias culinarias más aclamadas del Caribe y no necesitas ser huésped del resort.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    ],
  },
  {
    id: 25,
    slug: "playa-blanca-puntacana",
    titulo: "Playa Blanca",
    categoria: "Gastronomía",
    lugar: "Puntacana Resort & Club",
    personas: 2,
    rating: 4.6,
    precio: 4200,
    precioAntes: 5200,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "",
    descripcion:
      "Barefoot luxury en la arena blanca. Diseño all-white bajo palmeras. Ceviche, tuna tartare y cócteles tropicales con los pies en la arena.",
    incluye: [
      "Ceviche del día",
      "Plato principal a elegir",
      "Postre tropical",
      "Para dos personas",
    ],
    aliados: [
      ["Puntacana Resort & Club", "Todos los días · 09:00–19:00"],
    ],
    historia:
      "Diseño blanco sobre blanco bajo palmeras cocoteras. Puedes cenar en tumbonas con vista al mar turquesa. La música en vivo de artistas locales completa una experiencia de lujo descalzo. El ceviche, el tuna tartare y los cócteles tropicales son lo que los sueños caribeños están hechos.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1540541338287-41700c64f5e0?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
  },
  {
    id: 26,
    slug: "brassa-grill-westin",
    titulo: "Brassa Grill",
    categoria: "Gastronomía",
    lugar: "The Westin Puntacana",
    personas: 2,
    rating: 4.5,
    precio: 6500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "",
    descripcion:
      "Steakhouse contemporáneo. Todo pasa por la parrilla Candela de carbón. Cortes premium con sabor ahumado inigualable. Música en vivo los fines de semana.",
    incluye: [
      "Ensalada fresca de la casa",
      "Corte premium a la Candela",
      "Guarnición gourmet a elegir",
      "Para dos personas",
    ],
    aliados: [
      ["The Westin Puntacana", "Todos los días · 18:00–22:30"],
    ],
    historia:
      "Todas las proteínas se cocinan en la icónica parrilla Candela de carbón, dándole ese sabor ahumado que ningún otro método logra. La carta de vinos recorre el mundo y los cócteles usan ingredientes locales. Los fines de semana la música en vivo transforma la cena en una experiencia completa.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    ],
  },
  {
    id: 27,
    slug: "herman-311",
    titulo: "Herman 311",
    categoria: "Gastronomía",
    lugar: "Bávaro Shopping Center",
    personas: 2,
    rating: 4.7,
    precio: 5800,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "Reserva online",
    descripcion:
      "Top 10% mundial en TripAdvisor por 6 años consecutivos. La mejor langosta de Punta Cana. Tomahawk con chimichurri legendario.",
    incluye: [
      "Entrada del mar a elegir",
      "Langosta grillada (plato estrella)",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Herman 311", "Todos los días · 12:00–23:00"],
    ],
    historia:
      "Ganador del TripAdvisor Traveler's Choice por 6 años consecutivos, en el top 10% de restaurantes del mundo. Conocido por tener la mejor langosta de Punta Cana. El tomahawk con chimichurri es legendario. La terraza al aire libre con entretenimiento en vivo hace que cada noche sea diferente.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    ],
  },
  {
    id: 28,
    slug: "soles-beach-club",
    titulo: "Soles Beach Club",
    categoria: "Gastronomía",
    lugar: "Playa Los Corales, Bávaro",
    personas: 2,
    rating: 4.4,
    precio: 3500,
    precioAntes: 4200,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "",
    descripcion:
      "Institución de Bávaro con 23 años de historia. Beach club de día, fiesta en la playa de noche con DJ y parrilla encendida.",
    incluye: [
      "2 tumbonas reservadas en la playa",
      "Ceviche o nachos del mar",
      "Plato principal a elegir",
      "Para dos personas",
    ],
    aliados: [
      ["Soles Beach Club", "Todos los días · 08:45–23:45"],
    ],
    historia:
      "Con más de 23 años de historia, Soles es una institución de Bávaro. Cambia de personalidad durante el día — mañanas tranquilas, tardes de mojitos y tumbonas, noches de fiesta con DJ y parrilla encendida. Es la experiencia auténtica de playa dominicana como debe ser.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1540541338287-41700c64f5e0?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    ],
  },
  {
    id: 29,
    slug: "zoho-beach-club",
    titulo: "Zoho Beach Club",
    categoria: "Gastronomía",
    lugar: "Bávaro",
    personas: 2,
    rating: 4.5,
    precio: 4500,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "",
    descripcion:
      "El beach club más fotogénico de Bávaro. Boho-chic sofisticado. Shrimp cocktail en piña, paella marinera y tuna tartare bajo las estrellas.",
    incluye: [
      "Tuna tartare o shrimp cocktail en piña",
      "Plato principal a elegir",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Zoho Beach Club", "Todos los días · 09:00–22:00"],
    ],
    historia:
      "El beach club más fotogénico de Bávaro. Sofisticado y boho-chic, con platos como el shrimp cocktail servido sobre piña y yuca frita, paella marinera y tuna tartare. Los domingos hay entretenimiento con DJs y bailarines. Es la nueva referencia en beach dining de Punta Cana.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
  },
  {
    id: 30,
    slug: "cabanna-restaurant",
    titulo: "Cabanna Restaurant & Cocktail Club",
    categoria: "Gastronomía",
    lugar: "Paseo San Juan, Bávaro",
    personas: 2,
    rating: 4.4,
    precio: 4200,
    precioAntes: 0,
    glifo: "🍽️",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "",
    descripcion:
      "Un pedazo de Ibiza en el Caribe. Cocina balear-mediterránea, paella de mariscos. Viernes y sábados con DJs, bottle shows y fiesta hasta las 2AM.",
    incluye: [
      "Bruschetta mediterránea",
      "Paella mixta para dos",
      "Postre de la casa",
      "Para dos personas",
    ],
    aliados: [
      ["Cabanna Restaurant", "Todos los días · 12:00–02:00 (weekends)"],
    ],
    historia:
      "Traído a Punta Cana por el grupo español Enjoygroup, inspirado en las Islas Baleares. La cocina mediterránea-balear se fusiona con el Caribe. Viernes y sábados se transforma con música en vivo, DJs y bottle shows estilo Ibiza. Es donde los almuerzos relajados se convierten en noches memorables.",
    videoCategoria: VIDEO_GASTRONOMIA,
    imagen: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    ],
  },
  // ─────────────────────────────────────────────────
  // NIÑOS Y FAMILIA
  // ─────────────────────────────────────────────────
  {
    id: 31,
    slug: "nado-con-delfines",
    titulo: "Nado con delfines en familia",
    categoria: "Niños y Familia",
    lugar: "Dolphin Explorer, Bávaro",
    personas: 4,
    rating: 4.9,
    precio: 12500,
    precioAntes: 0,
    glifo: "🐬",
    colores: ["#0984E3", "#74B9FF"],
    etiqueta: "Reserva online",
    descripcion:
      "Nado interactivo con delfines para toda la familia. Incluye beso, abrazo, paseo dorsal y fotos profesionales. A partir de 4 años.",
    incluye: [
      "Nado interactivo de 30 minutos",
      "Fotos y video profesional incluido",
      "Briefing educativo sobre delfines",
      "Para hasta 4 personas (2 adultos + 2 niños)",
    ],
    aliados: [
      ["Dolphin Explorer", "Todos los días · 09:00, 11:00, 14:00"],
    ],
    historia:
      "Los ojos de un niño cuando toca un delfín por primera vez. La risa cuando el delfín le da un beso. El abrazo familiar en el agua turquesa. Este no es un show — es un encuentro real con una de las criaturas más inteligentes del planeta. A partir de 4 años, toda la familia puede participar.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Animales",
    zona: "Bávaro",
    imagen: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    ],
  },
  {
    id: 32,
    slug: "scape-park-aventura-familiar",
    titulo: "Scape Park — aventura familiar",
    categoria: "Niños y Familia",
    lugar: "Cap Cana",
    personas: 4,
    rating: 4.8,
    precio: 15800,
    precioAntes: 0,
    glifo: "🌴",
    colores: ["#00B894", "#55EFC4"],
    etiqueta: "Exclusivo",
    descripcion:
      "Parque de aventuras en Cap Cana: Hoyo Azul, tirolesas, cenotes, cuevas y senderos ecológicos. Todo el día para la familia.",
    incluye: [
      "Acceso full day a Scape Park",
      "Hoyo Azul (cenote natural)",
      "Tirolesas sobre el bosque",
      "Para hasta 4 personas",
    ],
    aliados: [
      ["Scape Park at Cap Cana", "Todos los días · 08:00–17:30"],
    ],
    historia:
      "Un parque de aventuras enclavado en los acantilados de Cap Cana. El Hoyo Azul es un cenote natural de agua cristalina turquesa al pie de un acantilado de 75 metros — parece sacado de una película. Tirolesas sobre el bosque tropical, cuevas con petroglifos taínos y senderos ecológicos. Los niños no van a querer irse.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Parque de aventuras",
    zona: "Cap Cana",
    imagen: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    ],
  },
  {
    id: 33,
    slug: "clase-chocolate-en-familia",
    titulo: "Clase de chocolate para niños",
    categoria: "Niños y Familia",
    lugar: "ChocoMuseo, Downtown",
    personas: 4,
    rating: 4.7,
    precio: 4200,
    precioAntes: 5000,
    glifo: "🍫",
    colores: ["#6E2C00", "#D68910"],
    etiqueta: "",
    descripcion:
      "Taller interactivo donde los niños hacen su propio chocolate desde el grano de cacao. Degustación y se llevan su creación a casa.",
    incluye: [
      "Taller de bean-to-bar de 90 minutos",
      "Degustación de chocolates",
      "Cada niño se lleva su chocolate",
      "Para hasta 4 personas",
    ],
    aliados: [
      ["ChocoMuseo Punta Cana", "Martes a sábado · 10:00 y 14:00"],
    ],
    historia:
      "Los niños aprenden de dónde viene el chocolate — desde el grano de cacao dominicano hasta la barra. Tuestan, muelen, mezclan y crean su propia receta. Al final se llevan su chocolate personalizado a casa. Es educativo, delicioso y los papás también se divierten.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Taller educativo",
    zona: "Downtown",
    imagen: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    ],
  },
  {
    id: 34,
    slug: "cabalgata-en-la-playa",
    titulo: "Cabalgata en la playa",
    categoria: "Niños y Familia",
    lugar: "Playa Bávaro",
    personas: 4,
    rating: 4.6,
    precio: 6800,
    precioAntes: 0,
    glifo: "🐎",
    colores: ["#7E5109", "#F5B041"],
    etiqueta: "Reserva online",
    descripcion:
      "Paseo a caballo por la playa de Bávaro al atardecer. Caballos mansos aptos para niños desde 5 años. Guía bilingüe.",
    incluye: [
      "Paseo de 90 minutos por la playa",
      "Caballos mansos para todas las edades",
      "Guía bilingüe",
      "Para hasta 4 personas",
    ],
    aliados: [
      ["Rancho RD", "Todos los días · 08:00, 15:00 y 17:00 (sunset)"],
    ],
    historia:
      "El sol cae sobre el Caribe mientras la familia entera cabalga por la arena de Bávaro. Los caballos son mansos y entrenados para niños. El guía cuenta historias de la zona. Es una de esas experiencias que los niños dibujan en la escuela cuando regresan a casa.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Naturaleza",
    zona: "Bávaro",
    imagen: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    ],
  },
  {
    id: 35,
    slug: "snorkel-familiar-bavaro",
    titulo: "Snorkel familiar en arrecife",
    categoria: "Niños y Familia",
    lugar: "Bávaro",
    personas: 4,
    rating: 4.7,
    precio: 5500,
    precioAntes: 6800,
    glifo: "🐠",
    colores: ["#0E6251", "#48C9B0"],
    etiqueta: "",
    descripcion:
      "Excursión en bote a arrecife de coral con equipo de snorkel para toda la familia. Guía marino, chalecos para niños y fotos acuáticas.",
    incluye: [
      "Bote al arrecife (20 min)",
      "Equipo de snorkel para todos",
      "Chalecos flotadores para niños",
      "Para hasta 4 personas",
    ],
    aliados: [
      ["Marinarium Excursions", "Lunes a sábado · 09:00 y 13:00"],
    ],
    historia:
      "El primer pez tropical que un niño ve debajo del agua le cambia la perspectiva del mundo. Arrecifes de coral, estrellas de mar, peces de todos los colores. Los guías marinos cuidan de toda la familia y las fotos acuáticas capturan esas caras de asombro que no tienen precio.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Acuática",
    zona: "Bávaro",
    imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
      "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
    ],
  },
  {
    id: 36,
    slug: "tour-piratas-punta-cana",
    titulo: "Tour de piratas para niños",
    categoria: "Niños y Familia",
    lugar: "Marina Cap Cana",
    personas: 4,
    rating: 4.8,
    precio: 7200,
    precioAntes: 0,
    glifo: "🏴‍☠️",
    colores: ["#2D3436", "#636E72"],
    etiqueta: "Reserva online",
    descripcion:
      "Aventura en barco pirata con búsqueda del tesoro, disfraces, snorkel y parada en playa secreta. Los niños se convierten en capitanes.",
    incluye: [
      "Navegación en barco pirata (3 horas)",
      "Búsqueda del tesoro con mapa",
      "Disfraces y espadas de pirata",
      "Para hasta 4 personas",
    ],
    aliados: [
      ["Ocean Adventures", "Miércoles a domingo · 09:30"],
    ],
    historia:
      "Un barco pirata real zarpa desde la marina de Cap Cana. Los niños reciben disfraces, espadas de espuma y un mapa del tesoro. Navegan hasta una playa secreta donde buscan el cofre escondido. Hay snorkel, hay gritos de '¡tierra a la vista!' y hay recuerdos que van a contar por años.",
    videoCategoria: VIDEO_NINOS,
    tipo: "Aventura",
    zona: "Cap Cana",
    imagen: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=800&q=80",
    imagenes: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
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
    filtro: (p) => [1, 2, 5, 14, 21, 18, 24, 10].includes(p.id),
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
};

export const SECCIONES_CAT: CatSection[] = [
  {
    id: "aventura",
    titulo: "Aventura y adrenalina",
    categoria: "Aventura",
    gradiente: "linear-gradient(135deg, #0F3460 0%, #1a6fa0 50%, #3E92CC 100%)",
    videoUrl: "/video/aventura.mp4",
  },
  {
    id: "bienestar",
    titulo: "Bienestar y spa",
    categoria: "Bienestar",
    gradiente: "linear-gradient(135deg, #3C1642 0%, #6b3a70 50%, #B07BAC 100%)",
    videoUrl: "/video/bienestar.mp4",
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
  {
    id: "ninos-familia",
    titulo: "Niños y familia",
    categoria: "Niños y Familia",
    gradiente: "linear-gradient(135deg, #0984E3 0%, #74B9FF 50%, #55EFC4 100%)",
    videoUrl: VIDEO_NINOS,
  },
];

export const CATEGORIAS: { cat: Categoria; icono: string; nombre: string; slug: string; descripcion: string }[] = [
  { cat: "Aventura", icono: "🪂", nombre: "Aventura", slug: "aventura", descripcion: "Adrenalina pura — saltos, vuelos, expediciones y todo lo que acelera el corazón" },
  { cat: "Bienestar", icono: "💆", nombre: "Bienestar y spa", slug: "bienestar", descripcion: "Desconecta del mundo — masajes, rituales de spa, yoga y momentos de paz total" },
  { cat: "Gastronomía", icono: "🍽️", nombre: "Gastronomía", slug: "gastronomia", descripcion: "Los mejores restaurantes de Punta Cana — desde fine dining hasta beach clubs con los pies en la arena" },
  { cat: "Estadías", icono: "🏨", nombre: "Estadías", slug: "estadias", descripcion: "Noches que se convierten en recuerdos — villas, boutiques y escapes frente al mar" },
  { cat: "Cultura", icono: "☕", nombre: "Cultura y naturaleza", slug: "cultura", descripcion: "La República Dominicana auténtica — café, cascadas, historia y tradición" },
  { cat: "Niños y Familia", icono: "👨‍👩‍👧‍👦", nombre: "Niños y familia", slug: "ninos-familia", descripcion: "Experiencias que los niños van a dibujar en la escuela — delfines, piratas, chocolate y aventura" },
];

export function catFromSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug)?.cat;
}

export type Ocasion = {
  id: string;
  titulo: string;
  subtitulo: string;
  imagen: string;
  color: string;
  sugeridos: number[];
};

export const OCASIONES: Ocasion[] = [
  {
    id: "cumpleanos",
    titulo: "Cumpleaños",
    subtitulo: "Que lo celebre con algo que nunca va a olvidar",
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    color: "#E84393",
    sugeridos: [14, 5, 21, 18],
  },
  {
    id: "aniversario",
    titulo: "Aniversario",
    subtitulo: "Celebren juntos con una noche que cuente su historia",
    imagen: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
    color: "#D63031",
    sugeridos: [14, 21, 11, 2],
  },
  {
    id: "romantico",
    titulo: "Noche romántica",
    subtitulo: "Cena al atardecer, velas y la persona correcta",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    color: "#6C5CE7",
    sugeridos: [21, 11, 14, 22],
  },
  {
    id: "dia-madres",
    titulo: "Día de las Madres",
    subtitulo: "Dale lo que siempre dice que no necesita pero merece",
    imagen: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    color: "#FDA7DF",
    sugeridos: [6, 22, 25, 17],
  },
  {
    id: "dia-padres",
    titulo: "Día del Padre",
    subtitulo: "Una experiencia a la altura de todo lo que ha dado",
    imagen: "https://images.unsplash.com/photo-1542652694-40abf526446e?w=600&q=80",
    color: "#0984E3",
    sugeridos: [1, 15, 26, 5],
  },
  {
    id: "navidad",
    titulo: "Navidad",
    subtitulo: "El regalo que no se envuelve — se vive",
    imagen: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=600&q=80",
    color: "#00B894",
    sugeridos: [14, 7, 22, 6],
  },
  {
    id: "porque-si",
    titulo: "Porque sí",
    subtitulo: "No necesitas excusa para hacer feliz a alguien",
    imagen: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80",
    color: "#FDCB6E",
    sugeridos: [23, 28, 20, 8],
  },
  {
    id: "despedida",
    titulo: "Despedida",
    subtitulo: "La última noche de soltero/a merece ser épica",
    imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    color: "#E17055",
    sugeridos: [30, 23, 2, 1],
  },
];
