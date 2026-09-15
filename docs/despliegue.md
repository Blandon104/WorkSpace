# Taller: Publicación de proyectos React + Supabase

## Introducción

Este documento resume con mis propias palabras los conceptos necesarios para publicar un proyecto hecho con React y Supabase. También dejo una guía para llevar una aplicación de Vite + React a GitHub Pages.

> **Nota:** los comandos `nslookup` y `dig` que pide el taller deben ejecutarse en mi computador. No invento sus salidas: dejo el espacio para pegar la salida real después de ejecutarlos.

---

# Parte 1 — Investigación teórica

## 1. Cómo llega un usuario a mi sitio

Cuando una persona escribe una URL en el navegador, primero el navegador necesita saber qué servidor corresponde al dominio. Para eso consulta DNS. Después establece una conexión de red con el servidor. En una conexión HTTPS se realiza además el proceso TLS para comprobar el certificado y proteger la comunicación. Finalmente el navegador envía una petición HTTP, el servidor responde con recursos como HTML, CSS y JavaScript, y el navegador los interpreta para mostrar la página.

### Paso a paso

1. El usuario escribe una URL, por ejemplo `https://github.com`.
2. El navegador identifica el dominio y consulta DNS para encontrar una dirección IP.
3. Se establece una conexión TCP con el servidor.
4. Como la conexión es HTTPS, se realiza el handshake TLS. En esta etapa se negocia la seguridad y se valida el certificado.
5. El navegador envía una petición HTTP, por ejemplo una petición `GET`.
6. El servidor devuelve una respuesta HTTP con un código de estado y el contenido solicitado.
7. El navegador descarga los recursos adicionales, como CSS, JavaScript, imágenes y fuentes.
8. Finalmente construye y muestra la página.

### Partes de una URL

Ejemplo:

`https://app.ejemplo.com:443/usuarios?rol=estudiante#perfil`

- **Esquema:** `https` indica el protocolo utilizado.
- **Subdominio:** `app` identifica una parte específica del sitio.
- **Dominio:** `ejemplo` identifica el nombre registrado.
- **TLD:** `.com` es la extensión de nivel superior.
- **Puerto:** `443` es el puerto habitual de HTTPS. Normalmente el navegador no necesita mostrarlo.
- **Ruta:** `/usuarios` indica el recurso solicitado.
- **Query string:** `?rol=estudiante` contiene parámetros enviados en la URL.
- **Fragmento:** `#perfil` apunta a una sección concreta de la página.

### Dominio, subdominio y hosting

Un **dominio** es el nombre que identifica un sitio en Internet. Un **subdominio** es una parte adicional del dominio, como `app.ejemplo.com` o `www.ejemplo.com`. El **hosting** es el servicio o infraestructura donde se almacenan y sirven los archivos de la aplicación.

Se pueden contratar por separado porque cumplen funciones diferentes: el dominio sirve como dirección, el DNS indica hacia dónde debe dirigirse esa dirección y el hosting proporciona la infraestructura que entrega la aplicación.

---

## 2. DNS

DNS significa **Domain Name System**. Su función principal es convertir nombres fáciles de recordar, como `github.com`, en información que los equipos pueden utilizar, principalmente direcciones IP. Por eso se suele comparar con una agenda de contactos de Internet.

### Jerarquía DNS

La consulta puede recorrer una jerarquía formada por:

1. **Root servers:** indican dónde encontrar los servidores responsables de cada TLD.
2. **TLD servers:** conocen los servidores autoritativos de extensiones como `.com` o `.co`.
3. **Servidores autoritativos:** contienen la información oficial de un dominio.
4. **Resolver recursivo:** realiza las consultas necesarias y normalmente guarda las respuestas en caché.

### Registros DNS

#### A

Relaciona un nombre con una dirección IPv4.

Ejemplo:

```text
@  A  203.0.113.10
```

#### AAAA

Hace una función parecida al registro A, pero utilizando una dirección IPv6.

```text
@  AAAA  2001:db8::10
```

#### CNAME

Hace que un nombre sea un alias de otro nombre de dominio.

```text
www  CNAME  ejemplo.com
```

#### ALIAS / ANAME

Son mecanismos ofrecidos por algunos proveedores para conseguir un comportamiento parecido a un alias en el dominio raíz. Son útiles porque un CNAME tradicional tiene restricciones para usarse en el apex o dominio raíz. La disponibilidad exacta depende del proveedor DNS.

#### MX

Indica qué servidores reciben correo electrónico para el dominio.

```text
@  MX  10  mail.ejemplo.com
```

#### TXT

Guarda texto asociado al dominio. Se usa, entre otras cosas, para verificaciones de propiedad y políticas de correo como SPF y DKIM.

Ejemplo de SPF:

```text
@  TXT  "v=spf1 include:_spf.ejemplo.com ~all"
```

También se pueden publicar valores TXT proporcionados por un servicio para demostrar que se controla un dominio.

#### NS

Indica cuáles son los servidores DNS autoritativos de un dominio.

```text
@  NS  ns1.proveedor-dns.com
```

#### SOA

El registro SOA contiene información principal de la zona DNS, como el servidor autoritativo principal, el responsable de la zona y valores utilizados para sincronización y caché.

### TTL

TTL significa **Time To Live**. Indica durante cuánto tiempo una respuesta DNS puede permanecer almacenada en caché. Si un registro tiene un TTL de 3600 segundos, un resolver puede conservar esa respuesta durante aproximadamente una hora antes de volver a consultarla.

### Propagación DNS

Cuando se cambia un registro DNS, diferentes resolvers pueden seguir teniendo la respuesta anterior mientras su TTL no haya terminado. Por eso el cambio no aparece de forma instantánea para todas las personas. La actualización depende del TTL, de las cachés y de la configuración del proveedor. No existe un tiempo universal exacto para todos los cambios.

### Ejercicio práctico

Estos son los comandos solicitados por el taller:

```bash
nslookup github.io
dig github.com A
dig github.com MX
dig +trace anthropic.com
```

En Windows, si no tengo `dig`, puedo usar:

```bash
nslookup -type=MX github.com
```

**Salida real pendiente:** debo ejecutar los comandos en mi computador y pegar aquí la salida o una captura. No se debe presentar una salida inventada como si hubiera sido ejecutada localmente.

---

## 3. Dominios

### Registrador, proveedor DNS y hosting

Un **registrador** es una empresa mediante la cual se registra un nombre de dominio. Un **proveedor DNS** administra la zona DNS y responde las consultas relacionadas con el dominio. Un **hosting** proporciona el lugar donde se ejecuta o almacena el sitio.

Una misma empresa puede ofrecer los tres servicios, pero técnicamente no son lo mismo.

### TLD genéricos y de código de país

Los TLD genéricos incluyen extensiones como `.com`, `.dev` y `.app`. Los TLD de código de país representan territorios, por ejemplo `.co` para Colombia. Algunas extensiones pueden tener reglas específicas de registro o requisitos establecidos por su registro correspondiente.

`.com.co` es una extensión de segundo nivel relacionada con Colombia y tiene condiciones y precios propios del registrador.

### WHOIS y privacidad

WHOIS es un sistema utilizado para consultar información asociada a un registro de dominio. La privacidad de dominio busca evitar que determinados datos personales del registrante queden expuestos públicamente. Las políticas concretas dependen de la extensión y del registrador.

### Nameservers

Los **nameservers** son los servidores que indican dónde se encuentra la información DNS autoritativa de un dominio. “Apuntar el dominio a otro proveedor” normalmente significa cambiar los nameservers o modificar los registros DNS para que las consultas lleguen al servicio que se quiere utilizar.

### Precios consultados

Los precios cambian con promociones, impuestos y condiciones del registrador, por lo que se deben comprobar antes de comprar.

En la consulta realizada a Namecheap, un `.com` aparece con precio de registro de **US$11.28** y renovación de **US$18.48**. Namecheap también muestra una promoción de primer año de US$6.79 para nuevos clientes. urlNamecheap .comhttps://www.namecheap.com/domains/registration/gtld/com/

Para `.co`, Namecheap muestra **US$7.98** como precio promocional del primer año y **US$45.48** para renovación. urlNamecheap .cohttps://www.namecheap.com/domains/registration/cctld/co/

En `.com.co`, la página consultada muestra **US$19.48** para registro y **US$26.48** para renovación. urlNamecheap .com.cohttps://www.namecheap.com/domains/registration/cctld/com-co/

El precio del primer año puede ser menor porque el registrador aplica promociones para captar nuevos clientes. La renovación suele utilizar el precio normal del registro y puede ser diferente entre TLD.

---

## 4. HTTPS y certificados

### TLS/SSL

TLS es el protocolo que protege la comunicación entre el navegador y el servidor. Su función principal es proporcionar cifrado, integridad de los datos y autenticación del servidor mediante certificados. SSL es el nombre histórico de una tecnología anterior; actualmente se utiliza TLS.

### Autoridad Certificadora y Let's Encrypt

Una **Autoridad Certificadora (CA)** es una entidad que emite certificados digitales después de realizar las comprobaciones correspondientes. **Let's Encrypt** es una CA que proporciona certificados TLS de forma automatizada.

### DV, OV y EV

- **DV:** comprueba principalmente el control sobre el dominio.
- **OV:** añade comprobaciones sobre la organización solicitante.
- **EV:** aplica un proceso de validación de identidad organizacional más amplio.

La diferencia principal está en el nivel de validación realizado por la CA, no en que uno cifre y otro no.

### Certificado wildcard

Un certificado wildcard permite proteger un dominio y múltiples subdominios de un nivel. Por ejemplo, un certificado para `*.ejemplo.com` puede cubrir `app.ejemplo.com` y `www.ejemplo.com`.

### Error de certificado para el nombre

El error “certificado no válido para este nombre” aparece cuando el nombre que se visita no coincide con los nombres para los que fue emitido el certificado. Puede ocurrir, por ejemplo, si se configura un dominio personalizado pero el certificado todavía no incluye ese dominio o el DNS apunta a un sitio diferente.

### HSTS

HSTS significa **HTTP Strict Transport Security**. Es una política que indica al navegador que debe utilizar HTTPS para el sitio durante el período indicado. Ayuda a evitar que el usuario vuelva a una conexión HTTP insegura.

---

## 5. Modelos de alojamiento

| Modelo | Ejemplos | Ventajas | Desventajas | Cuándo usarlo |
|---|---|---|---|---|
| Hosting compartido | Hostinger, cPanel | Económico y sencillo | Recursos compartidos y menos control | Sitios pequeños |
| VPS | DigitalOcean Droplet, Linode, AWS EC2 | Más control y recursos dedicados virtualmente | Requiere más administración | Aplicaciones que necesitan configurar servidor |
| Servidor dedicado | OVH, Hetzner | Recursos exclusivos y mucho control | Mayor costo y administración | Sistemas con necesidades altas |
| PaaS | Render, Railway, Heroku, Fly.io | Despliegue sencillo sin administrar todo el servidor | Dependencia de la plataforma | Aplicaciones web y APIs |
| Serverless / Functions | Vercel Functions, AWS Lambda, Supabase Edge Functions | Escala según peticiones y evita administrar servidores tradicionales | Límites y modelo de ejecución específico | APIs y tareas puntuales |
| Hosting estático + CDN | GitHub Pages, Netlify, Cloudflare Pages, Vercel | Muy apropiado para React compilado, rápido y sencillo | No ejecuta un backend tradicional por sí solo | Frontends estáticos |
| BaaS | Supabase, Firebase, Appwrite | Ofrece servicios de backend listos para usar | Dependencia del proveedor | Apps que necesitan Auth, BD, Storage o Realtime |

### CDN

Un CDN distribuye archivos desde servidores ubicados en diferentes lugares. Así el usuario puede recibir los recursos desde un punto cercano. Esto reduce la latencia y también disminuye la carga que tendría que soportar el servidor de origen.

### Sitio estático y sitio dinámico

Un sitio **estático** entrega archivos ya generados, como HTML, CSS y JavaScript. Un sitio dinámico o renderizado en servidor genera parte del contenido en respuesta a la solicitud del usuario.

Una aplicación React creada con Vite termina, después de `npm run build`, en archivos estáticos dentro de `dist`. Por eso puede publicarse en servicios de hosting estático.

### SPA

Una **SPA (Single Page Application)** carga una aplicación principal y cambia el contenido mediante JavaScript sin recargar toda la página. En un hosting estático puede aparecer un 404 al recargar una ruta como `/dashboard`, porque el servidor busca un archivo llamado `dashboard` y no entiende que esa ruta pertenece a la SPA.

En GitHub Pages una solución sencilla para el taller es utilizar `HashRouter`, porque la parte después de `#` no se envía al servidor.

---

## 6. Comparativa de plataformas

| Plataforma | Plan gratuito / límites principales | Variables de entorno | SPA | Backend / funciones | Dominio personalizado / HTTPS | Preview deployments |
|---|---|---|---|---|---|---|
| GitHub Pages | Sitio publicado hasta 1 GB y límite flexible de 100 GB/mes | Sí mediante Actions/secrets para el proceso de build | Requiere configuración para rutas internas | No es backend tradicional | Sí / HTTPS | No es su punto fuerte; Actions puede manejar flujos de preview |
| Netlify | Free con 300 créditos mensuales | Sí | Sí, con configuración de redirects cuando sea necesaria | Sí, Functions | Sí / SSL | Sí, previews ilimitadas según su plan Free actual |
| Vercel | Hobby gratuito; incluye 100 GB/mes de transferencia rápida y límites de builds | Sí | Sí | Sí, Functions | Sí / HTTPS automático | Sí, despliegues de preview por cambios Git |
| Cloudflare Pages | Free con 500 builds/mes, 1 build simultáneo y hasta 20.000 archivos por sitio | Sí | Sí, según configuración del proyecto | Sí, mediante Pages Functions/Workers | Sí | Sí, previews ilimitadas |
| Render | Static Sites gratis; el plan Hobby tiene límites de uso | Sí | Sí | Sí, web services y otras opciones | Sí / TLS administrado | Sí, según el tipo de servicio |

Las cifras anteriores son las consultadas en la documentación oficial. GitHub Pages publica límites de 1 GB por sitio y 100 GB/mes de ancho de banda flexible. urlLímites de GitHub Pageshttps://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Netlify ofrece actualmente un plan Free con 300 créditos mensuales, dominios personalizados con SSL y previews ilimitadas. urlPrecios de Netlifyhttps://www.netlify.com/pricing/

Vercel tiene un plan Hobby gratuito, con 100 GB de transferencia rápida mensual y previews por cada push de Git. urlPlan Hobby de Vercelhttps://vercel.com/docs/plans/hobby

Cloudflare Pages Free permite 500 builds al mes, 20.000 archivos por sitio y despliegues de preview ilimitados. urlLímites de Cloudflare Pageshttps://developers.cloudflare.com/pages/platform/limits/

Render ofrece Static Sites gratuitos, despliegues automáticos desde Git y dominios personalizados con TLS administrado. urlPrecios de Renderhttps://render.com/pricing

### ¿Cuál elegiría para RECORDATE?

Para mi proyecto elegiría **GitHub Pages + Supabase** si el objetivo principal es cumplir el taller y publicar el frontend de React de forma sencilla. GitHub Pages sirve muy bien para archivos estáticos y el backend que necesita RECORDATE puede estar en Supabase. Si necesitara más funciones de backend integradas en el mismo proveedor, consideraría Vercel o Netlify.

---

## 7. Supabase en producción

### ¿Qué es un BaaS?

BaaS significa **Backend as a Service**. Es un servicio que proporciona componentes de backend sin que el desarrollador tenga que construir y administrar todo desde cero.

Supabase ofrece principalmente:

- **Postgres:** base de datos relacional.
- **Auth:** autenticación y gestión de sesiones.
- **Storage:** almacenamiento de archivos.
- **Realtime:** comunicación de datos en tiempo real.
- **Edge Functions:** funciones ejecutadas en el entorno de Supabase.

### Claves de Supabase

El taller utiliza los nombres tradicionales `anon` y `service_role`. Supabase está migrando hacia las claves **publishable** y **secret**, y documenta que las claves `anon` y `service_role` están siendo retiradas progresivamente hacia finales de 2026. urlSupabase API keyshttps://supabase.com/docs/guides/getting-started/api-keys

La idea importante es:

- La clave pública/publishable puede utilizarse desde el navegador.
- La clave secreta/service role tiene permisos elevados y **no debe enviarse al frontend**.
- La seguridad de los datos no depende de esconder la clave pública, sino de configurar correctamente las reglas de acceso.

### RLS

RLS significa **Row Level Security**. Permite definir qué filas puede consultar o modificar cada usuario. Es especialmente importante cuando el navegador se conecta directamente a Supabase.

Ejemplo conceptual para que un usuario solo pueda leer sus propias filas:

```sql
create policy "Usuarios pueden leer sus propias filas"
on public.actividades
for select
to authenticated
using (usuario_id = auth.uid());
```

Para permitir edición únicamente de sus propias filas se puede aplicar una política similar al `update`:

```sql
create policy "Usuarios pueden editar sus propias filas"
on public.actividades
for update
to authenticated
using (usuario_id = auth.uid())
with check (usuario_id = auth.uid());
```

La columna `usuario_id` debe estar relacionada con el usuario autenticado y las políticas deben adaptarse a la estructura real de la base de datos.

### Site URL y Redirect URLs

Supabase Auth necesita saber cuáles URLs están permitidas después de una autenticación. La **Site URL** funciona como URL predeterminada cuando no se especifica otra redirección. Las **Redirect URLs** permiten definir destinos válidos para los flujos de autenticación. Si se deja la URL de desarrollo y se publica la aplicación en otra dirección, un login puede intentar regresar a `localhost` o ser rechazado. urlSupabase Redirect URLshttps://supabase.com/docs/guides/auth/redirect-urls

### Límites del plan Free

Actualmente Supabase indica que el plan Free incluye 2 proyectos, 500 MB de base de datos por proyecto, 5 GB de egress, 1 GB de almacenamiento y 50.000 usuarios activos mensuales. También puede pausar proyectos Free después de una semana de poca actividad. urlPrecios de Supabasehttps://supabase.com/pricing urlPausa de proyectos Free de Supabasehttps://supabase.com/docs/guides/platform/free-project-pausing

---

## 8. Variables de entorno y seguridad

Una **variable de entorno** permite guardar una configuración fuera del código fuente. En un proyecto React con Vite se pueden utilizar variables como:

```env
VITE_SUPABASE_URL=https://mi-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=mi-clave-publica
```

El archivo `.env` normalmente se agrega a `.gitignore` para evitar publicar valores que no deben almacenarse en el repositorio.

### ¿Por qué `VITE_`?

Vite expone al código del navegador las variables que comienzan por `VITE_`. Esto significa que cualquier valor con ese prefijo termina dentro del bundle público y **no debe considerarse un secreto**. urlVariables de entorno de Vitehttps://vite.dev/guide/env-and-mode

### GitHub Secrets y secretos de runtime

Un secreto de GitHub Actions puede utilizarse durante un build sin escribirlo directamente en el archivo del workflow. Un secreto de runtime es un valor que permanece protegido en un servidor y solo se utiliza cuando el backend ejecuta una operación.

Una clave que termine en el JavaScript del navegador deja de ser secreta, aunque se haya guardado originalmente como GitHub Secret.

### Si se sube una clave por error

No basta con borrar el archivo o hacer otro commit. Si una clave secreta fue publicada, debe **revocarse o rotarse** y después actualizar el sistema con la nueva clave. También conviene revisar el historial del repositorio.

---

## 9. Build y despliegue

### `npm run build`

El comando ejecuta el script de build definido en `package.json`. En un proyecto Vite normalmente transforma el código fuente en una versión optimizada para producción.

La carpeta **`dist/`** contiene los archivos finales que se pueden publicar: HTML, JavaScript, CSS, imágenes y otros recursos generados.

### Conceptos del proceso de build

- **Minificación:** reduce el tamaño de los archivos eliminando espacios y simplificando el código cuando es posible.
- **Tree shaking:** elimina código que no se utiliza.
- **Code splitting:** separa el código en diferentes archivos para cargar solamente lo necesario cuando la aplicación lo permite.
- **Hashing:** agrega identificadores al nombre de archivos para ayudar con el control de caché.

### CI/CD

CI/CD significa integración y entrega/despliegue continuo. La idea es automatizar tareas como instalar dependencias, probar, construir y publicar el proyecto.

**GitHub Actions** permite crear workflows automatizados dentro del repositorio. Puede ejecutar un build cada vez que se hace push y después publicar el resultado. urlGitHub Actionshttps://docs.github.com/en/actions

### `gh-pages` vs GitHub Actions

Con `gh-pages`, el proyecto puede publicar el contenido generado en una rama destinada a GitHub Pages. Con GitHub Actions se puede automatizar todo el proceso en un workflow: instalar dependencias, ejecutar el build, guardar el artefacto y desplegarlo. GitHub recomienda el flujo de Actions para automatizar publicaciones de Pages. urlPublicación de GitHub Pages con Actionshttps://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

---

# Parte 2 — Publicar React + Supabase en GitHub Pages

## Paso 0 — Comprobar que el proyecto compila

En la carpeta del proyecto:

```bash
npm install
npm run build
npm run preview
```

Si `npm run build` falla, primero hay que solucionar el error. `npm run preview` permite comprobar el resultado real del build antes de publicarlo.

---

## Paso 1 — Determinar la URL de GitHub Pages

Si el repositorio es un repositorio normal, la URL tiene esta estructura:

```text
https://usuario.github.io/nombre-del-repositorio/
```

Por ejemplo, si el repositorio se llama `recordate`, la URL sería parecida a:

```text
https://usuario.github.io/recordate/
```

En ese caso, Vite necesita conocer que la aplicación vive debajo de `/recordate/`.

---

## Paso 2 — Configurar `base` en Vite

En `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nombre-del-repositorio/',
})
```

El nombre debe coincidir exactamente con el repositorio. Si se deja `/` cuando la aplicación realmente vive en `/nombre-del-repositorio/`, los archivos JavaScript y CSS pueden buscarse en una ruta incorrecta y la página puede aparecer en blanco.

---

## Paso 3 — Resolver el problema de las rutas SPA

Para el taller, una opción sencilla es `HashRouter`:

```jsx
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      {/* rutas de la aplicación */}
    </HashRouter>
  )
}

export default App
```

La URL queda con una estructura como:

```text
https://usuario.github.io/mi-proyecto/#/dashboard
```

El fragmento después de `#` no se envía al servidor, por lo que GitHub Pages no intenta buscar un archivo llamado `dashboard`.

---

## Paso 4 — Variables de Supabase

En local se puede tener un `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Y el cliente de Supabase:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Para GitHub Actions, los valores pueden guardarse como secretos del repositorio y utilizarse durante el build.

**Importante:** `VITE_SUPABASE_ANON_KEY` es una clave pública para el frontend; la clave secreta/service role nunca debe incluirse en el bundle.

---

## Paso 5 — Activar GitHub Pages con Actions

En GitHub:

`Settings → Pages → Source → GitHub Actions`

GitHub Pages puede utilizar un workflow que haga checkout del repositorio, construya los archivos, suba el artefacto y realice el despliegue. urlConfigurar fuente de publicación de GitHub Pageshttps://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

---

## Paso 6 — Workflow de despliegue

Crear:

```text
.github/workflows/deploy.yml
```

Ejemplo:

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

---

## Paso 7 — Subir los cambios

```bash
git add .
git commit -m "chore: configurar despliegue en GitHub Pages"
git push origin main
```

Después se revisa la pestaña **Actions** para comprobar si el workflow terminó correctamente. La URL se puede consultar desde `Settings → Pages`.

---

## Paso 8 — Configurar Supabase para producción

En Supabase se debe entrar a:

`Authentication → URL Configuration`

La **Site URL** debe ser la URL pública real del proyecto. Por ejemplo:

```text
https://usuario.github.io/mi-proyecto/
```

También se deben agregar las Redirect URLs que realmente utilizará la aplicación. Supabase indica que la URL de producción es especialmente importante para confirmaciones por correo y recuperación de contraseña. urlSupabase Redirect URLshttps://supabase.com/docs/guides/auth/redirect-urls

Además, las políticas RLS deben estar activas en las tablas que contengan datos de usuarios.

---

## Paso 9 — Dominio personalizado (opcional)

Si se compra un dominio propio, GitHub Pages permite configurar dominios apex y subdominios. urlDominios personalizados en GitHub Pageshttps://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

Para un subdominio como `www.midominio.com`, un registro habitual es:

```text
Tipo: CNAME
Nombre: www
Valor: usuario.github.io
```

Para un dominio raíz se pueden utilizar los registros A indicados por GitHub Pages:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

GitHub Pages soporta HTTPS y permite activar **Enforce HTTPS** desde la configuración del sitio. urlHTTPS en GitHub Pageshttps://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

---

# Errores frecuentes

| Problema | Posible causa | Solución |
|---|---|---|
| Página en blanco | `base` incorrecto | Usar el nombre exacto del repositorio en `vite.config.js` |
| 404 al recargar `/dashboard` | Problema de SPA | Usar `HashRouter` o configurar una estrategia de `404.html` |
| `supabaseUrl is required` | Variable no llegó al build | Revisar `.env` o los secrets de Actions |
| Login devuelve a localhost | Site URL incorrecta | Cambiar URL Configuration en Supabase |
| Error de CORS | URL no autorizada | Revisar la configuración de Supabase |
| Datos visibles sin sesión | RLS mal configurado | Activar RLS y revisar las políticas |
| Sitio no cambia después del deploy | Caché | Recargar con `Ctrl + Shift + R` |

---

# Checklist de entrega

- [ ] `docs/despliegue.md` está dentro del repositorio `workspace`.
- [ ] Parte 1 respondida con mis propias palabras.
- [ ] Fuentes consultadas incluidas.
- [ ] Ejecuté `nslookup` y/o `dig` y pegué la salida real.
- [ ] El proyecto compila con `npm run build`.
- [ ] La aplicación está publicada.
- [ ] La URL pública está configurada.
- [ ] El workflow de GitHub Actions aparece en verde.
- [ ] Supabase tiene configuradas la Site URL y Redirect URLs.
- [ ] Las políticas RLS están activas.

## Fuentes principales

- GitHub Pages: https://docs.github.com/en/pages
- GitHub Actions: https://docs.github.com/en/actions
- Vite: https://vite.dev/guide/env-and-mode
- Supabase: https://supabase.com/docs
- Supabase Auth Redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls
- Supabase API Keys: https://supabase.com/docs/guides/getting-started/api-keys
- Supabase Pricing: https://supabase.com/pricing
- Netlify Pricing: https://www.netlify.com/pricing/
- Vercel Hobby: https://vercel.com/docs/plans/hobby
- Cloudflare Pages Limits: https://developers.cloudflare.com/pages/platform/limits/
- Render Pricing: https://render.com/pricing
- Namecheap .com: https://www.namecheap.com/domains/registration/gtld/com/
- Namecheap .co: https://www.namecheap.com/domains/registration/cctld/co/
