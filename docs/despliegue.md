# Taller: Publicación de proyectos React + Supabase

**Estudiante:** Jose Alejandro Blandon Garcia — 11-2  
**Repositorio:** `Blandon104/WorkSpace`  
**Entregable:** `docs/despliegue.md`

> Las respuestas están redactadas con mis propias palabras. Los precios y límites que pueden cambiar se consultaron en documentación oficial.

---

# Parte 1 — Investigación teórica

## 1. Cómo llega un usuario a mi sitio

Cuando una persona escribe una URL, el navegador primero identifica el dominio y consulta DNS para conocer la dirección IP correspondiente. Después establece la conexión de red. En HTTPS se realiza el handshake TLS para negociar el cifrado y comprobar el certificado. Luego se envía una petición HTTP, normalmente `GET`, y el servidor devuelve una respuesta con un código de estado y los recursos solicitados. El navegador descarga HTML, CSS, JavaScript, imágenes y demás recursos y finalmente construye la página.

### Paso a paso

1. El usuario escribe una URL.
2. El navegador consulta DNS para resolver el dominio.
3. Se establece TCP cuando HTTP/1.1 o HTTP/2 se transportan sobre TCP.
4. Para HTTPS se realiza el handshake TLS y se valida el certificado.
5. El navegador envía una petición HTTP.
6. El servidor responde con un estado y contenido.
7. Se descargan los recursos adicionales.
8. El navegador ejecuta el JavaScript y muestra la interfaz.

### Partes de una URL

Ejemplo: `https://app.ejemplo.com:443/usuarios?rol=estudiante#perfil`

- **Esquema:** `https`.
- **Subdominio:** `app`.
- **Dominio:** `ejemplo`.
- **TLD:** `.com`.
- **Puerto:** `443`, habitual para HTTPS.
- **Ruta:** `/usuarios`.
- **Query string:** `?rol=estudiante`.
- **Fragmento:** `#perfil`, procesado normalmente por el navegador.

### Dominio, subdominio y hosting

El dominio es el nombre que identifica el sitio. Un subdominio es una parte del dominio, por ejemplo `app.ejemplo.com`. El hosting es la infraestructura que almacena, ejecuta o sirve la aplicación. Pueden contratarse por separado porque son servicios distintos: el registrador administra el nombre, DNS resuelve el nombre y el hosting entrega la aplicación.

---

## 2. DNS

DNS significa **Domain Name System**. Convierte nombres fáciles de recordar, como `github.com`, en información utilizable por los equipos, principalmente direcciones IP. Por eso se compara con una agenda de contactos de Internet.

### Jerarquía

1. **Root servers:** orientan la consulta hacia el TLD correspondiente.
2. **TLD servers:** indican qué servidores son autoritativos para un dominio.
3. **Servidores autoritativos:** contienen la información oficial de la zona.
4. **Resolver recursivo:** realiza las consultas y normalmente almacena respuestas en caché.

### Registros DNS

| Registro | Para qué sirve | Ejemplo |
|---|---|---|
| `A` | Nombre → IPv4 | `@ A 203.0.113.10` |
| `AAAA` | Nombre → IPv6 | `@ AAAA 2001:db8::10` |
| `CNAME` | Alias de otro nombre | `www CNAME ejemplo.com` |
| `ALIAS/ANAME` | Comportamiento tipo alias en el dominio raíz, según proveedor | `@ ALIAS app.ejemplo.com` |
| `MX` | Servidores que reciben correo | `@ MX 10 mail.ejemplo.com` |
| `TXT` | Verificaciones y políticas de texto | `@ TXT "v=spf1 include:_spf.ejemplo.com ~all"` |
| `NS` | Nameservers autoritativos | `@ NS ns1.proveedor.com` |
| `SOA` | Información principal de la zona | servidor, responsable, serial y timers |

`ALIAS` y `ANAME` son mecanismos que algunos proveedores ofrecen para resolver una limitación del CNAME tradicional en el dominio raíz; no son exactamente el mismo registro y su soporte depende del proveedor.

Los `TXT` se usan, entre otras cosas, para SPF, DKIM y verificaciones de propiedad de dominio. SPF indica servidores autorizados para enviar correo y DKIM publica la clave que permite verificar una firma de correo.

### TTL y propagación

**TTL (Time To Live)** indica cuánto tiempo una respuesta DNS puede permanecer en caché. Por ejemplo, un TTL de 3600 segundos permite aproximadamente una hora de caché. Un TTL alto reduce consultas pero puede retrasar la aplicación de cambios.

La **propagación DNS** ocurre porque diferentes resolvers y dispositivos pueden conservar respuestas anteriores hasta que vencen sus cachés. Por eso un cambio puede verse rápido en un lugar y más tarde en otro. No existe un tiempo universal exacto para todos los cambios.

### Ejercicio práctico

El taller solicita:

```bash
nslookup github.io
dig github.com A
dig github.com MX
dig +trace anthropic.com
```

En Windows, si no está instalado `dig`:

```bash
nslookup -type=MX github.com
```

**Evidencia:** el entorno usado para preparar este documento no tiene `nslookup` ni `dig` instalados y no pudo realizar consultas DNS externas. Por eso no invento una salida como si hubiera sido ejecutada en mi computador. Antes de entregar al profesor debo ejecutar los comandos en mi PC y pegar la salida o una captura real.

Comprobación del entorno:

```text
nslookup: command not found
dig: command not found
```

---

## 3. Dominios

### Registrador, DNS y hosting

Un **registrador** permite registrar el nombre de dominio. Un **proveedor DNS** administra los registros y responde consultas. El **hosting** proporciona la infraestructura que sirve el sitio. Una empresa puede ofrecer los tres servicios, pero cumplen funciones diferentes.

### TLD

Los TLD genéricos incluyen `.com`, `.dev` y `.app`. Los de código de país incluyen `.co` para Colombia. Algunas extensiones tienen requisitos específicos. `.com.co` también tiene condiciones propias.

### WHOIS y privacidad

WHOIS permite consultar información relacionada con registros de dominios. La privacidad de dominio busca reducir la exposición pública de datos personales del registrante cuando la extensión y el registrador lo permiten.

### Nameservers

Los nameservers son los servidores DNS autoritativos de un dominio. “Apuntar el dominio a otro proveedor” puede significar cambiar los nameservers o modificar registros para dirigir las consultas al proveedor elegido.

### Precios consultados

Los precios cambian por promociones, impuestos y condiciones. En la consulta actual de Namecheap:

| TLD | Registro | Renovación |
|---|---:|---:|
| `.com` | US$11.28 | US$18.48 |
| `.co` | US$7.98 promocional | US$45.48 |
| `.com.co` | US$19.48 | US$26.48 |

Namecheap también muestra una promoción de `.com` de US$6.79 para nuevos clientes. La renovación suele ser más alta porque las promociones se aplican al primer año y después se cobra la tarifa normal del TLD.

Fuentes: [Namecheap .com](https://www.namecheap.com/domains/registration/gtld/com/), [Namecheap .co](https://www.namecheap.com/domains/registration/cctld/co/), [Namecheap .com.co](https://www.namecheap.com/domains/registration/cctld/com-co/).

---

## 4. HTTPS y certificados

### TLS/SSL

TLS protege la comunicación entre navegador y servidor mediante cifrado, integridad y autenticación del servidor. SSL es el nombre histórico de una tecnología anterior; actualmente se utiliza TLS.

### CA y Let's Encrypt

Una **Autoridad Certificadora (CA)** emite certificados digitales después de realizar las validaciones correspondientes. **Let's Encrypt** es una CA que automatiza certificados TLS.

### DV, OV y EV

- **DV:** valida principalmente el control del dominio.
- **OV:** añade validación de la organización.
- **EV:** realiza una validación organizacional más amplia.

La diferencia está en la validación realizada, no en que solo uno cifre.

### Wildcard

Un certificado wildcard como `*.ejemplo.com` puede cubrir varios subdominios de un nivel, por ejemplo `app.ejemplo.com` y `www.ejemplo.com`.

### Certificado no válido para el nombre

Aparece cuando el nombre visitado no coincide con los nombres incluidos en el certificado. Puede ocurrir al configurar un dominio personalizado cuando el certificado todavía no incluye el dominio o cuando el DNS apunta al servicio equivocado.

### HSTS

**HTTP Strict Transport Security (HSTS)** indica al navegador que debe utilizar HTTPS durante el periodo indicado. Ayuda a evitar conexiones posteriores por HTTP.

Fuente: [Let's Encrypt FAQ](https://letsencrypt.org/es/docs/faq/).

---

## 5. Modelos de alojamiento

| Modelo | Ejemplos | Ventajas | Desventajas | ¿Cuándo usarlo? |
|---|---|---|---|---|
| Hosting compartido | Hostinger, cPanel | Económico y sencillo | Recursos compartidos | Sitios pequeños |
| VPS | DigitalOcean, Linode, AWS EC2 | Más control | Más administración | Apps que necesitan servidor configurable |
| Servidor dedicado | OVH, Hetzner | Recursos exclusivos | Costoso | Sistemas de alta demanda |
| PaaS | Render, Railway, Heroku, Fly.io | Despliegue fácil | Dependencia de plataforma | Apps web y APIs |
| Serverless / Functions | Vercel Functions, AWS Lambda, Supabase Edge Functions | No se administra servidor tradicional | Límites del modelo | APIs y tareas puntuales |
| Hosting estático + CDN | GitHub Pages, Netlify, Cloudflare Pages, Vercel | Rápido y sencillo | No reemplaza backend tradicional | Frontends React |
| BaaS | Supabase, Firebase, Appwrite | Auth, BD, Storage y otros servicios | Dependencia del proveedor | Apps con backend administrado |

### CDN

Un CDN distribuye contenido desde servidores cercanos al usuario. Reduce latencia, acelera la entrega y disminuye la carga del servidor de origen.

### Estático vs dinámico

Un sitio estático entrega archivos ya generados. Uno dinámico o renderizado en servidor puede generar contenido al recibir la petición. React con Vite, después de `npm run build`, produce archivos estáticos en `dist`, por lo que puede publicarse en hosting estático.

### SPA

Una **SPA** carga una aplicación principal y cambia las vistas con JavaScript. En un hosting estático, recargar `/dashboard` puede producir 404 porque el servidor busca un archivo `dashboard`. En GitHub Pages, `HashRouter` es una solución sencilla porque la parte después de `#` no se envía como ruta al servidor.

---

## 6. Comparativa de plataformas

| Plataforma | Gratis / límites principales | Variables de entorno | SPA | Backend / funciones | Dominio + HTTPS | Preview deployments |
|---|---|---|---|---|---|---|
| GitHub Pages | Sitio publicado hasta 1 GB; límite flexible de 100 GB/mes | Sí, mediante Actions/secrets | Requiere estrategia para rutas internas | No backend tradicional | Sí / HTTPS | Actions puede implementarlo, no es su función principal |
| Netlify | Free con 300 créditos/mes según su página actual | Sí | Sí, con redirects cuando se necesitan | Sí, Functions | Sí / SSL | Sí, previews ilimitadas en Free según página actual |
| Vercel | Hobby gratuito, con límites de uso | Sí | Sí | Sí, Functions | Sí / HTTPS | Sí |
| Cloudflare Pages | Free: 500 builds/mes, 1 build simultáneo, 20.000 archivos por sitio y 25 MiB por archivo | Sí | Sí | Sí, Pages Functions/Workers | Sí | Sí, previews para pull requests |
| Render | Static Sites gratis; otros servicios tienen límites de uso | Sí | Sí | Sí | Sí / TLS administrado | Sí, según servicio |

Fuentes oficiales: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Netlify](https://www.netlify.com/pricing/), [Vercel](https://vercel.com/docs/limits), [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/), [Render](https://render.com/pricing).

### ¿Cuál elegiría para mi proyecto?

Elegiría **GitHub Pages + GitHub Actions + Supabase**. El proyecto React con Vite se convierte en archivos estáticos, el repositorio ya está en GitHub y Actions permite automatizar el build. Supabase aporta autenticación y base de datos. Para un proyecto escolar es una combinación que permite practicar React, Git, CI/CD, variables de entorno y RLS sin administrar un servidor propio.

---

## 7. Supabase en producción

### BaaS

Un **BaaS (Backend as a Service)** ofrece servicios de backend administrados. Supabase incluye PostgreSQL, Auth, Storage, Realtime y Edge Functions, además de APIs y herramientas de administración.

### `anon key` vs `service_role`

La **anon key** está pensada para aplicaciones cliente y puede terminar visible en el navegador. La **service_role key** tiene permisos elevados y puede saltarse RLS, por lo que **jamás debe ir al frontend ni a una variable `VITE_`**. Debe permanecer del lado del servidor.

### RLS

**Row Level Security (RLS)** permite controlar qué filas puede leer o modificar cada usuario. Es fundamental cuando el cliente usa una clave pública desde el navegador.

Ejemplo con una tabla `perfiles` y una columna `user_id`:

```sql
alter table public.perfiles enable row level security;

create policy "Cada usuario puede leer su perfil"
on public.perfiles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Cada usuario puede editar su perfil"
on public.perfiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Así la política compara el usuario autenticado con el dueño de la fila. También se deben revisar los grants de la tabla, porque las políticas no sustituyen los permisos de PostgreSQL.

### Site URL y Redirect URLs

En Supabase → Authentication → URL Configuration se debe configurar la URL real. Para este repositorio, si se publica como project site:

```text
Site URL:
https://Blandon104.github.io/WorkSpace/

Redirect URLs:
https://Blandon104.github.io/WorkSpace/**
http://localhost:5173/**
```

Si no se configura la URL de producción, confirmaciones de correo, recuperación de contraseña u OAuth pueden regresar a `localhost` o ser rechazados.

Fuentes: [Supabase Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls) y [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Plan gratuito

La información actual consultada indica que Free incluye 500 MB de base de datos, 5 GB de egress, 5 GB de cached egress, 1 GB de almacenamiento de archivos, 50.000 MAU y hasta 2 proyectos activos. Los proyectos Free pueden pausarse después de aproximadamente una semana de poca actividad. Estos límites pueden cambiar y deben revisarse antes de una entrega.

Fuentes: [Supabase Pricing](https://supabase.com/pricing/) y [Project Pausing](https://supabase.com/docs/guides/platform/free-project-pausing).

---

## 8. Variables de entorno y seguridad

Una **variable de entorno** guarda configuración que se entrega al proceso durante desarrollo o despliegue. `.env` se agrega normalmente a `.gitignore` para no subir configuraciones locales o secretos.

En Vite, las variables que deben estar disponibles en el código cliente usan el prefijo `VITE_`. Todo lo que tenga ese prefijo puede terminar dentro del bundle y ser visible al usuario.

Ejemplo:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Una `service_role` nunca debe ponerse ahí.

**GitHub Secrets** son valores protegidos que Actions puede inyectar durante un build. Un secreto de **runtime** permanece en un servidor y se usa cuando el backend se ejecuta.

Si una clave secreta se sube por error a Git, borrar el archivo no basta: hay que **rotar/revocar la clave**, actualizar la configuración y revisar el historial. Una `service_role` expuesta debe tratarse como comprometida.

---

## 9. Build y despliegue

`npm run build` ejecuta el proceso de compilación y Vite genera normalmente `dist/`.

- **Minificación:** reduce el tamaño del código.
- **Tree shaking:** elimina código no utilizado.
- **Code splitting:** divide el código en varios archivos.
- **Hashing:** añade identificadores a nombres de archivos para controlar caché.

**CI** automatiza integración, instalación, pruebas y builds. **CD** automatiza la entrega o publicación. **GitHub Actions** permite ejecutar esos pasos ante eventos como un `push` a `main`.

Una rama `gh-pages` publica archivos generados desde una rama. Un workflow de Actions mantiene el código fuente y automatiza instalación, build y publicación. Para este taller prefiero Actions porque es repetible y se integra con el repositorio.

---

# Parte 2 — Tutorial: publicar React + Supabase en GitHub Pages

## Paso 0 — Verificar compilación

```bash
npm install
npm run build
npm run preview
```

Si `npm run build` falla, primero hay que corregir el error. `preview` permite revisar el resultado real del build.

## Paso 1 — URL del proyecto

Para un repositorio `usuario/mi-proyecto`:

```text
https://usuario.github.io/mi-proyecto/
```

Para `usuario.github.io`, la URL queda en la raíz.

En este repositorio, si se publica como project site, la URL esperada es:

```text
https://Blandon104.github.io/WorkSpace/
```

La URL solo será válida después de activar Pages y completar un deployment.

## Paso 2 — `base` de Vite

En `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/WorkSpace/',
})
```

Después:

```bash
npm run build
```

En `dist/index.html` las rutas de los assets deben incluir `/WorkSpace/`.

## Paso 3 — Router de la SPA

### Opción A: HashRouter

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App />
</HashRouter>
```

Las URLs quedan como `https://Blandon104.github.io/WorkSpace/#/dashboard`.

### Opción B: BrowserRouter + 404.html

```jsx
<BrowserRouter basename="/WorkSpace">
```

También se puede generar `404.html` a partir de `index.html` para que GitHub Pages devuelva la SPA al solicitar rutas internas.

## Paso 4 — Variables de Supabase

`.env` local:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Cliente:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

En GitHub: `Settings` → `Secrets and variables` → `Actions` → crear `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

La anon key seguirá siendo visible en el frontend. La seguridad depende de RLS, no de esconder esa clave.

## Paso 5 — Activar Pages

Repositorio → `Settings` → `Pages` → **Source: GitHub Actions**.

GitHub Pages permite HTTPS y se puede forzar HTTPS en el sitio.

## Paso 6 — Workflow

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Paso 7 — Publicar

```bash
git add .
git commit -m "chore: configurar despliegue en GitHub Pages"
git push origin main
```

Después se revisa la pestaña **Actions** y `Settings` → `Pages`.

## Paso 8 — Configurar Supabase

En Authentication → URL Configuration:

```text
Site URL:
https://Blandon104.github.io/WorkSpace/

Redirect URLs:
https://Blandon104.github.io/WorkSpace/**
http://localhost:5173/**
```

También se revisan las políticas RLS y se prueba la aplicación sin sesión para comprobar que los datos privados no sean accesibles.

## Paso 9 — Dominio personalizado

1. Comprar el dominio.
2. En GitHub Pages → Custom domain, introducirlo.
3. Configurar DNS.

Para `www`:

```text
Tipo: CNAME
Nombre: www
Valor: usuario.github.io
```

Para el dominio raíz, GitHub Pages documenta estos registros `A`:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Después de la verificación y emisión del certificado se puede activar **Enforce HTTPS**. Con un dominio propio en la raíz, Vite normalmente usa `base: '/'`.

---

# Ejemplo aplicado a mi repositorio

Mi repositorio es `Blandon104/WorkSpace`. El README explica que lo uso para practicar programación y mejorar mis habilidades. fileciteturn3file0L2-L6

La estructura del entregable es:

```text
docs/
└── despliegue.md
```

Flujo del frontend:

```text
React + Vite
    ↓
npm run build
    ↓
dist/
    ↓
GitHub Actions
    ↓
GitHub Pages
    ↓
Usuario
```

Flujo de datos:

```text
React en navegador
       ↓
Supabase anon key
       ↓
Auth + API
       ↓
PostgreSQL + RLS
```

La `service_role` no se publica en el navegador.

---

# Errores frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Página en blanco / 404 en assets | `base` incorrecto | Usar `/WorkSpace/` |
| 404 al recargar una ruta | Problema de SPA | `HashRouter` o `404.html` |
| `supabaseUrl is required` | Secretos no llegaron al build | Revisar `env:` del workflow |
| Login vuelve a localhost | Site URL incorrecta | Configurar URL de producción |
| `Failed to fetch` | Configuración o dominio incorrecto | Revisar Supabase y navegador |
| Datos visibles sin iniciar sesión | RLS o grants incorrectos | Activar RLS y políticas |
| Sitio no se actualiza | Caché | `Ctrl + Shift + R` y revisar Actions |

---

# Evidencias que debo agregar antes de entregar

El taller exige ejemplos propios y evidencias. Antes de entregar al profesor debo añadir:

1. Salida o captura real de `nslookup github.io`.
2. Salida o captura real de `dig github.com A`.
3. Salida o captura real de `dig github.com MX`.
4. Salida o captura real de `dig +trace anthropic.com`.
5. URL pública final del proyecto.
6. Captura del workflow de Actions en verde.
7. Captura de las políticas RLS activas en Supabase.

No inventé estas evidencias. La limitación del entorno de preparación impide ejecutar esas consultas como si fueran realizadas desde mi PC.

---

# Fuentes consultadas

- [GitHub Pages — límites](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [GitHub Pages — HTTPS](https://docs.github.com/es/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Netlify — precios](https://www.netlify.com/pricing/)
- [Vercel — límites](https://vercel.com/docs/limits)
- [Vercel — Hobby](https://vercel.com/docs/plans/hobby)
- [Cloudflare Pages — límites](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages — previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Render — precios](https://render.com/pricing)
- [Supabase — precios](https://supabase.com/pricing/)
- [Supabase — RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase — Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- [Supabase — pausa de proyectos Free](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Let's Encrypt — FAQ](https://letsencrypt.org/es/docs/faq/)
- [Namecheap — .com](https://www.namecheap.com/domains/registration/gtld/com/)
- [Namecheap — .co](https://www.namecheap.com/domains/registration/cctld/co/)
- [Namecheap — .com.co](https://www.namecheap.com/domains/registration/cctld/com-co/)

---

# Conclusión

Publicar una aplicación React requiere entender no solo cómo subir archivos, sino también DNS, dominios, HTTPS, hosting, CDN, build, variables de entorno y seguridad. En una aplicación con Supabase, RLS es fundamental porque el frontend se ejecuta en el navegador. Para mi proyecto escolar, GitHub Pages + Actions para el frontend y Supabase para backend y datos es una combinación sencilla para practicar un flujo real de desarrollo y despliegue.
