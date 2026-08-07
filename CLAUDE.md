# Yupii — Contexto del Proyecto

## Quién es Alejandro
- Fundador de Yupii, emprendedor en República Dominicana
- No es desarrollador — no usa terminal, todo va por GitHub → Vercel (auto-deploy)
- Empuja código siempre via **GitHub API con python3** (nunca `git push`)
- Quiere memoria guardada después de CADA tarea completada

## Qué es Yupii
- Marketplace de experiencias regalo en RD (gastronomía, aventura, bienestar, romance, cultura)
- Modelo: GiftBoxes (el destinatario elige) + Experiencias directas
- Stack: Next.js 15 App Router, TypeScript, Supabase (auth + DB), Vercel

## Stack técnico
- **Framework**: Next.js 15, App Router, `"use client"` donde se necesita
- **Auth**: Supabase (`@supabase/ssr`) — browser client en `src/lib/supabase/client.ts`, server en `server.ts`
- **Estilos**: CSS puro en `src/app/globals.css` — NO Tailwind, NO CSS Modules
- **Datos**: `src/data/productos.ts` — array estático de productos
- **Íconos**: componentes en `src/components/Icons.tsx`
- **Deploy**: Vercel auto-deploy desde rama `main` del repo `alcaldeads/Yupii`

## Archivos clave
```
src/app/
  page.tsx                          ← Home
  globals.css                       ← TODO el CSS del proyecto aquí
  layout.tsx
  login/
    page.tsx + LoginClient.tsx      ← Login público (Google OAuth + email)
  auth/callback/route.ts            ← OAuth callback handler
  explorar/[categoria]/
    page.tsx + ExplorarClient.tsx   ← Páginas de categoría
  admin/                            ← Panel admin (protegido)
src/components/Header.tsx           ← Header principal (logo, nav, ícono usuario → /login)
src/lib/supabase/client.ts          ← Browser client
src/lib/supabase/server.ts          ← Server client
src/lib/actions/auth.ts             ← Server actions (solo admin login)
src/data/productos.ts               ← Datos estáticos
```

## Cómo hacer push (siempre así, sin terminal git)
```python
python3 - <<'PYEOF'
import subprocess, json, urllib.request
TOKEN = subprocess.check_output(["gh", "auth", "token"], text=True).strip()
REPO = "alcaldeads/Yupii"
BASE = f"https://api.github.com/repos/{REPO}"
def api(method, path, body=None):
    req = urllib.request.Request(f"{BASE}{path}",
        data=json.dumps(body).encode() if body else None,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json",
                 "Accept": "application/vnd.github+json"}, method=method)
    with urllib.request.urlopen(req) as r: return json.loads(r.read())
files = {"ruta/archivo.tsx": open("ruta/archivo.tsx").read()}
ref = api("GET", "/git/ref/heads/main")
head = ref["object"]["sha"]
tree0 = api("GET", f"/git/commits/{head}")["tree"]["sha"]
blobs = [{"path": p, "mode": "100644", "type": "blob",
          "sha": api("POST", "/git/blobs", {"content": c, "encoding": "utf-8"})["sha"]}
         for p, c in files.items()]
new_tree = api("POST", "/git/trees", {"base_tree": tree0, "tree": blobs})
commit = api("POST", "/git/commits", {"message": "feat: ...", "tree": new_tree["sha"], "parents": [head]})
api("PATCH", "/git/refs/heads/main", {"sha": commit["sha"]})
print("✅ Pushed:", commit["sha"])
PYEOF
```

## Diseño — Reglas críticas
- **NUNCA** cambiar colores/tipografía/estructura sin que Alejandro lo pida explícitamente
- CSS en `globals.css` al final, clases con prefijo por sección (`.gastro-`, `.auth-`, `.xpl-`)
- Paleta: `--acento: #5b3df5` (morado), warm cream fondo, dorado `#D68910` para ratings
- Imágenes: siempre reales (de productos), nunca placeholders
- Diseño: espectacular, con detalle, full pages — nunca mediocre ni modal donde no toca

## Supabase
- URL: `https://sldvncoicbejphjqhzdo.supabase.co`
- Google OAuth: ✅ activo
- Apple OAuth: ❌ pendiente (requiere Apple Developer $99/año)
- Site URL configurada: `https://yupii.vercel.app`
- Redirect URLs: `https://yupii.vercel.app/**`

## Animación Gastro Hero (/explorar/gastronomia)
- FLIP card-to-fullscreen con `phase`: preview(1.6s) → expanding(0.75s) → fullscreen(3s)
- `queue[]` = orden del strip, rota cuando card empieza a expandirse (NO al terminar)
- `featuredIdx` = qué muestra el header — solo cambia en double-rAF (mismo frame que CSS transition)
- Cards SIEMPRE visibles (z-index strip 4 > expander 2), nunca opacity:0
- Ver `pattern_flip_card_expansion.md` en memoria para código completo

## Páginas pendientes / ideas
- Reset de contraseña (`/login/reset` — link existe, página no)
- Header session-aware (ícono usuario cambia si está logueado)
- Página de perfil del usuario
