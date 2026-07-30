# Yupii

Marketplace de experiencias para regalar en República Dominicana. Prototipo funcional en Next.js.

> **Aviso:** precios, aliados, calificaciones y disponibilidad son de ejemplo. Nada se cobra ni se envía. No hay backend ni base de datos: todo el estado vive en memoria durante la sesión.

---

## Arrancar en local

Necesitas Node 18.18 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Otros comandos:

```bash
npm run build   # build de producción
npm start       # servir el build
npm run lint    # revisar el código
```

---

## Publicar en Vercel

### Opción A — desde la terminal (lo más rápido)

```bash
npm i -g vercel
vercel login
vercel          # primera vez: crea el proyecto y sube una preview
vercel --prod   # publica a producción
```

Vercel detecta Next.js solo. No hace falta configurar nada ni definir variables de entorno.

### Opción B — desde GitHub (recomendado para trabajar a diario)

```bash
git init
git add .
git commit -m "Yupii: prototipo inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/yupii.git
git push -u origin main
```

Luego en vercel.com: **Add New → Project → Import Git Repository** y elige el repo.

A partir de ahí, cada `git push` a `main` publica solo. Cada rama genera una URL de preview para probar sin tocar producción.

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx        Metadatos, fuente Figtree, CSS global
│   ├── page.tsx          Orquesta la página y maneja el estado de los modales
│   └── globals.css       TODO el diseño vive acá (sin Tailwind)
├── components/
│   ├── BarraAnuncios.tsx Barra negra rotativa
│   ├── Header.tsx        Logo, buscador, nav, carrito
│   ├── HeroCarrusel.tsx  Carrusel principal con autoplay
│   ├── FilaProductos.tsx Fila horizontal con flechas
│   ├── TarjetaProducto.tsx  La card
│   ├── Secciones.tsx     Categorías, banda corporativa, newsletter, footer
│   ├── Modal.tsx         Shell reutilizable (Escape, click fuera, scroll lock)
│   ├── ModalProducto.tsx Ficha + flujo de regalo en 3 pasos
│   ├── ModalCanje.tsx    Canje de código en 3 pasos
│   ├── ModalMensaje.tsx  Avisos genéricos
│   └── Icons.tsx         SVGs inline
├── data/
│   └── productos.ts      Catálogo, filas y categorías
└── lib/
    └── format.ts         Formato de moneda, degradados, generador de códigos
```

---

## Cómo tocar lo que vas a querer tocar

**Agregar o editar experiencias** → `src/data/productos.ts`. Cada producto lleva título, categoría, lugar, precio, colores del degradado, un emoji como imagen, qué incluye y sus aliados.

**Cambiar las filas de la home** → el array `FILAS` en el mismo archivo. Cada fila es un título más una función de filtro.

**Cambiar colores, tipografía o espaciados** → las variables CSS al inicio de `src/app/globals.css`. El color de acento es `--acento`.

**Cambiar los slides del hero** → el array `SLIDES` en `src/components/HeroCarrusel.tsx`.

---

## Decisiones técnicas

**CSS plano, sin Tailwind.** El diseño ya estaba escrito y funcionando; meter Tailwind solo agregaba una capa de configuración sin ganar nada. Si lo prefieres después, se instala encima sin romper lo que hay.

**La fuente Figtree se carga por `<link>`** en `layout.tsx`, no con `next/font`. Si quieres que se auto-hospede (mejor rendimiento, sin salto de layout), cambia a `next/font/google` — funciona bien en Vercel.

**Todo el estado en memoria.** No hay `localStorage` ni base de datos. Al recargar se pierde. Es a propósito: es un prototipo para enseñar, no para operar.

**Las "fotos" son degradados CSS con un emoji encima.** Cuando tengas fotos reales, cambia `card-foto` en `globals.css` y el campo `colores`/`glifo` por una URL de imagen.

---

## Lo que falta para que esto sea un producto real

- Backend y base de datos (Supabase o Postgres en Vercel)
- Autenticación de compradores y de aliados
- Pasarela de pago: **Azul o CardNet**. Stripe no opera con comercios registrados en RD.
- Motor de vouchers con códigos únicos, vigencia y estados de canje
- Panel para aliados (ver y marcar canjes) y panel para empresas
- Envío de correo y WhatsApp
- Definición legal de la vigencia y condiciones del voucher frente a la **Ley 358-05** y ProConsumidor, y el tratamiento fiscal de los montos no canjeados

---

## Estado del build

Verificado con `next build` y `tsc --noEmit`: compila limpio, sin errores de tipos. Ruta `/` estática, 116 kB de JS en la primera carga.
