# Taller: Cookies en aplicaciones web (React + Supabase)

**Estudiante:** Jose Alejandro Blandon Garcia  
**Grado:** 11-2  
**Repositorio:** WorkSpace  
**Fecha:** 17 de septiembre de 2026

> Este documento responde el taller con palabras propias y con ejemplos de código. Las capturas que dependen del navegador del estudiante se dejan señaladas para completar desde DevTools; no se inventan capturas ni resultados que no hayan sido observados.

## Parte 1 — Investigación teórica

### 1. Qué es una cookie

Una cookie es un pequeño dato asociado a un sitio web. El servidor puede pedir al navegador que la guarde y el navegador puede enviarla después en las solicitudes que correspondan. Por eso sirve para conservar información entre peticiones HTTP, por ejemplo una sesión, una preferencia o un identificador. La cabecera de respuesta es `Set-Cookie` y la de petición es `Cookie`.

#### Cookie vs. localStorage vs. sessionStorage

| Característica | Cookie | localStorage | sessionStorage |
|---|---|---|---|
| ¿Se envía automáticamente al servidor? | Sí, si dominio, ruta y reglas de `SameSite` coinciden. | No. Hay que enviarlo desde JavaScript. | No. Hay que enviarlo desde JavaScript. |
| ¿Sobrevive a cerrar el navegador? | Sí, si tiene `Expires` o `Max-Age`; si no, normalmente es de sesión. | Sí, hasta que se borre. | No; normalmente dura la sesión de esa pestaña. |
| ¿Tiene expiración configurable? | Sí, con `Expires` o `Max-Age`. | No tiene una expiración por tiempo propia. | No tiene una expiración por tiempo propia. |
| ¿Tamaño máximo aproximado? | Aproximadamente 4 KB por cookie. | Aproximadamente varios MB por origen, dependiendo del navegador. | Aproximadamente varios MB por origen, dependiendo del navegador. |
| ¿Accesible desde JavaScript? | Sí, salvo `HttpOnly`. | Sí. | Sí. |

HTTP es *stateless* porque cada petición es independiente y el protocolo no conserva por sí mismo el estado de la petición anterior. Las cookies permiten asociar solicitudes posteriores con un usuario o sesión mediante un dato que el navegador conserva y reenvía automáticamente.

**Ejemplo:**

```http
Set-Cookie: sesion=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

### 2. Cómo se crea una cookie

El servidor usa `Set-Cookie` en la respuesta:

```http
Set-Cookie: tema=oscuro; Max-Age=3600; Path=/
```

En una petición posterior, el navegador puede enviarla así:

```http
Cookie: tema=oscuro
```

Desde JavaScript se puede crear una cookie con `document.cookie`:

```js
document.cookie = "tema=oscuro; path=/; max-age=3600";
console.log(document.cookie);
```

La API es incómoda porque trabaja con una cadena de texto y no ofrece una función separada y sencilla para crear, buscar o borrar por nombre. Además, JavaScript no puede leer una cookie marcada como `HttpOnly`.

La diferencia principal es que una cookie creada por servidor puede incluir atributos como `HttpOnly`, que JavaScript no puede establecer mediante `document.cookie`. Una cookie creada por JavaScript queda disponible para JavaScript y, por tanto, no puede ser `HttpOnly`.

### 3. Atributos de una cookie

#### `Expires` y `Max-Age`

`Expires` indica una fecha y hora de expiración. `Max-Age` indica cuántos segundos debe durar desde que se recibe. Si no se especifica ninguno, la cookie normalmente es de sesión y se elimina al terminar la sesión del navegador.

```http
Set-Cookie: usuario=Jose; Expires=Wed, 30 Sep 2026 23:59:59 GMT; Path=/
Set-Cookie: tema=oscuro; Max-Age=3600; Path=/
```

Cuando ambos aparecen, `Max-Age` tiene prioridad.

#### `Domain` y `Path`

`Domain` determina para qué dominio y subdominios puede aplicarse la cookie. Si se omite, queda asociada al host que la creó y no se amplía a sus subdominios. `Path` limita las rutas en las que el navegador enviará la cookie.

```http
Set-Cookie: id=123; Domain=example.com; Path=/app
```

Si `Domain` se omite, la cookie queda vinculada al host actual. Si `Path` se omite, el navegador calcula una ruta por defecto a partir de la URL que la creó.

#### `Secure`

Hace que la cookie se transmita solamente mediante una conexión segura HTTPS. Una cookie marcada `Secure` no debe establecerse normalmente desde un sitio HTTP inseguro, salvo excepciones de desarrollo como ciertos casos de `localhost` definidos por los navegadores.

```http
Set-Cookie: sesion=abc; Secure; Path=/
```

#### `HttpOnly`

Impide que JavaScript lea la cookie mediante `document.cookie`. Esto es importante para reducir el impacto de un XSS, porque un script inyectado no puede extraer directamente esa cookie.

```http
Set-Cookie: sesion=abc123; HttpOnly; Secure; SameSite=Lax; Path=/
```

`HttpOnly` no impide que el navegador envíe la cookie en solicitudes normales que correspondan a sus reglas.

#### `SameSite`

Controla cuándo una cookie puede viajar en solicitudes *cross-site*.

- **Strict:** restringe fuertemente el envío cross-site. Por ejemplo, si un usuario llega a un sitio mediante un enlace desde otro sitio, la cookie `Strict` puede no viajar en esa navegación inicial.
- **Lax:** permite la cookie en algunas navegaciones de nivel superior, especialmente GET, por lo que un enlace externo puede llegar al sitio y enviar la cookie en ese contexto, pero muchas solicitudes embebidas o métodos como POST cross-site no la reciben.
- **None:** permite el envío cross-site, pero requiere `Secure`.

Ejemplos:

```http
Set-Cookie: sesion=abc; SameSite=Strict; Secure; HttpOnly; Path=/
Set-Cookie: sesion=abc; SameSite=Lax; Secure; HttpOnly; Path=/
Set-Cookie: widget=abc; SameSite=None; Secure; Path=/
```

En un `<iframe>` de otro sitio, una cookie `Strict` no viaja y una `Lax` normalmente tampoco; una cookie `None; Secure` sí puede viajar si las demás condiciones del navegador se cumplen.

#### `Partitioned` (CHIPS)

`Partitioned` permite almacenar una cookie en un espacio separado por el sitio de nivel superior. Esto busca permitir usos legítimos de cookies embebidas de terceros sin conservar una única cookie que permita asociar al usuario entre muchos sitios diferentes.

```http
Set-Cookie: widget=abc; SameSite=None; Secure; Partitioned; Path=/
```

### 4. Cookies de primera parte vs. terceros

Una cookie de primera parte pertenece al sitio que el usuario está visitando. Una cookie de terceros está asociada a un dominio diferente que aparece dentro de la página, por ejemplo mediante un contenido embebido.

Los navegadores han restringido las cookies de terceros porque pueden utilizarse para seguimiento entre sitios y crear perfiles de navegación. Safari y Firefox aplican bloqueos importantes y Chrome también ha incorporado restricciones y mecanismos de particionado.

Un uso legítimo puede ser un widget de chat o un mapa embebido que necesita conservar configuración dentro del sitio donde aparece. Un uso publicitario puede ser una red de anuncios que intenta reconocer el mismo navegador en diferentes sitios para medir o personalizar publicidad.

### 5. Sesiones y autenticación

Una sesión del lado del servidor es información que el servidor mantiene asociada a un identificador. El navegador suele conservar solamente ese identificador en una cookie, mientras los datos reales de la sesión permanecen en el servidor.

**Sesión con cookie:** el navegador envía automáticamente la cookie y el servidor busca la sesión correspondiente.

**JWT:** el token contiene información firmada que el servidor puede validar. En una aplicación web puede transportarse en una cabecera `Authorization: Bearer ...` o, dependiendo del diseño, almacenarse en una cookie.

Un JWT puede guardarse en memoria, en `localStorage` o en una cookie. En una SPA es común usar almacenamiento del navegador, pero guardar tokens sensibles en `localStorage` significa que JavaScript puede leerlos. Si existe un XSS, el atacante podría acceder al token.

Una cookie `HttpOnly` no puede ser leída por JavaScript, lo que reduce ese riesgo. Sin embargo, las cookies se envían automáticamente y eso crea un riesgo de CSRF si el servidor no aplica medidas adicionales.

`localStorage` no se adjunta automáticamente a las peticiones cross-site; el código JavaScript tiene que leerlo y colocarlo en una solicitud. Por eso el mecanismo de ataque CSRF clásico basado en envío automático de cookies no funciona igual con `localStorage`.

Un *refresh token* permite obtener nuevos access tokens sin volver a pedir al usuario todas las credenciales. Por su duración y capacidad de mantener una sesión, debe protegerse especialmente.

### 6. Seguridad: XSS y CSRF

#### XSS

Un XSS ocurre cuando un atacante consigue que el navegador ejecute JavaScript no confiable dentro del contexto de una página. Si una cookie no es `HttpOnly`, ese script podría intentar leerla:

```js
console.log(document.cookie);
```

Si la cookie tiene `HttpOnly`, `document.cookie` no puede devolverla. Esto no elimina todas las consecuencias de XSS: el script todavía podría realizar acciones con los permisos de la página mientras permanezca activo.

#### CSRF

Un escenario conceptual sería:

1. La víctima inicia sesión en `banco.example`.
2. El navegador conserva la cookie de sesión.
3. La víctima visita otro sitio controlado por un atacante.
4. Ese sitio intenta enviar una petición al banco.
5. Si el endpoint confía únicamente en la cookie y el navegador la incluye, el servidor podría interpretar la petición como perteneciente a la víctima.

El ejercicio pedido por el taller se representa conceptualmente así, sin ejecutarlo contra ningún sitio real:

```html
<form action="https://banco.example/api/transferir-dinero" method="POST">
  <input type="hidden" name="destino" value="cuenta-ejemplo">
  <input type="hidden" name="monto" value="100">
</form>
<script>
  // Conceptualmente, un sitio malicioso intentaría enviar el formulario.
  // No se ejecuta contra ningún servicio real.
</script>
```

Con `SameSite=Strict`, la cookie no se enviaría en el contexto cross-site y este ataque basado solamente en la cookie no funcionaría de la misma manera. Con `Lax`, muchas solicitudes CSRF quedan bloqueadas, pero existen contextos permitidos, por lo que no debe considerarse una protección completa.

Una defensa adicional es un **CSRF token** impredecible que el servidor exige además de la cookie. También se debe validar el método, el origen cuando corresponda y las reglas de autorización.

### 7. Cookies y privacidad / normativa

El RGPD europeo exige una base legal para el tratamiento de datos personales y, cuando el consentimiento es la base utilizada, este debe ser informado y expresado mediante una acción válida. En Colombia, la Ley 1581 de 2012 y su reglamentación establecen principios y reglas para el tratamiento de datos personales, incluyendo información al titular y, cuando corresponda, autorización.

Las cookies estrictamente necesarias para una función solicitada o esencial del sitio pueden tratarse de manera diferente a las cookies de analítica, publicidad o seguimiento. Para estas últimas normalmente se requiere gestionar adecuadamente el consentimiento cuando la legislación aplicable lo exige.

Un **gestor de consentimiento de cookies** muestra las categorías de cookies, informa para qué se usan y permite aceptar o rechazar las categorías que no sean necesarias. Como mínimo debería permitir una elección informada y conservar la decisión del usuario.

> Nota: la aplicación concreta de estas reglas depende del tipo de cookie, finalidad, datos tratados, jurisdicción y contexto. Este taller no sustituye asesoría jurídica.

### 8. Cookies en el mundo real: Supabase

En el cliente JavaScript normal de Supabase, `persistSession` está activo por defecto y el cliente intenta guardar la sesión en `localStorage`. La documentación actual indica que el flujo SSR utiliza almacenamiento mediante cookies y recomienda el paquete `@supabase/ssr` para aplicaciones con renderizado del lado del servidor.

Por eso en una SPA React pura es común que Supabase use `localStorage`: el código se ejecuta principalmente en el navegador y no existe un servidor propio que gestione una cookie `HttpOnly` y pueda leerla durante el renderizado.

En el repositorio se encontró un cliente Supabase basado en `createClient` con variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, por lo que el análisis del taller debe comprobar en DevTools si la sesión efectiva aparece en Local Storage. No se debe afirmar el resultado de DevTools sin observar el navegador.

Para una Edge Function de Supabase, la respuesta debe incluir la configuración CORS apropiada. La cabecera clave es `Access-Control-Allow-Origin`, y también deben permitirse los headers que usa el cliente, como `authorization`, `apikey`, `x-client-info` y `content-type`, según el caso.

Ejemplo conceptual:

```js
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://TU_USUARIO.github.io",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};
```

### 9. Herramientas del navegador

En Chrome DevTools, las cookies se consultan en **Application → Storage → Cookies** y luego se selecciona el dominio. En Firefox se pueden revisar desde **Storage Inspector → Cookies**.

La tabla de cookies puede mostrar columnas como:

- **Name:** nombre de la cookie.
- **Value:** valor almacenado.
- **Domain:** dominio al que aplica.
- **Path:** rutas donde aplica.
- **Expires / Max-Age:** momento o duración de expiración.
- **Size:** tamaño aproximado.
- **HttpOnly:** si JavaScript no puede leerla.
- **Secure:** si solo se envía mediante HTTPS.
- **SameSite:** regla de envío cross-site.

Para borrar una cookie específica desde DevTools se selecciona la cookie y se usa la opción de eliminación correspondiente, sin borrar todo el almacenamiento del sitio.

## Parte 2 — Ejercicio práctico

### Ejercicio A — Inspeccionar cookies reales

**Estado:** pendiente de captura real del navegador.

Pasos realizados/documentados:

1. Abrir el proyecto desplegado o un sitio con login.
2. Abrir DevTools.
3. Entrar a **Application → Cookies** en Chrome o **Storage → Cookies** en Firefox.
4. Revisar `Name`, `Value`, `Domain`, `Path`, `Expires`, `Size`, `HttpOnly`, `Secure` y `SameSite`.

**Captura que falta insertar:**

```text
[PEGAR AQUÍ CAPTURA DE DEVTOOLS — EJERCICIO A]
```

**Comprobación que debe hacerse en la consola:**

```js
document.cookie
```

Una cookie marcada `HttpOnly` no aparecerá en `document.cookie`. Una cookie visible para JavaScript sí puede aparecer, dependiendo de dominio y ruta.

### Ejercicio B — Crear y leer cookies con JavaScript

Código utilizado/documentado:

```js
// Crear una cookie simple
document.cookie = "tema=oscuro; path=/; max-age=3600";

// Leer todas las cookies visibles a JS
console.log(document.cookie);

// Crear una cookie que expira en el pasado (borrarla)
document.cookie = "tema=; path=/; max-age=0";

console.log(document.cookie);
```

**Resultado esperado:** después de la primera línea debe aparecer `tema=oscuro` entre las cookies visibles para JavaScript. Después de poner `max-age=0`, esa cookie deja de estar disponible.

No existe un `document.cookie = ""` que borre todo porque cada asignación de `document.cookie` modifica una cookie concreta; no es una API de borrado global. Para borrar una cookie hay que apuntar a la misma combinación de nombre y atributos de alcance, especialmente el `path`, que se utilizó al crearla.

### Ejercicio C — Mini helper de cookies en React

El helper se creó en:

`src/utils/cookies.js`

El código está publicado en el repositorio como parte del taller.

Ejemplo de uso en un componente React:

```jsx
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "./utils/cookies";

export default function Tema() {
  const [tema, setTema] = useState(() => getCookie("tema") || "claro");

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  const cambiarTema = () => {
    const nuevoTema = tema === "claro" ? "oscuro" : "claro";
    setTema(nuevoTema);
    setCookie("tema", nuevoTema, 30, {
      secure: location.protocol === "https:",
      sameSite: "Lax",
    });
  };

  return (
    <button onClick={cambiarTema}>
      Tema actual: {tema}
    </button>
  );
}
```

**Captura que falta insertar:**

```text
[PEGAR AQUÍ CAPTURA DEL SELECTOR DE TEMA FUNCIONANDO Y COOKIE EN DEVTOOLS]
```

### Ejercicio D — Simular CSRF

La simulación conceptual se encuentra en la sección de seguridad anterior. No se ejecuta contra ningún sitio ajeno.

- Con `SameSite=Strict`, la cookie no se envía en el contexto cross-site que necesita el ataque, por lo que el ataque basado solo en la cookie queda bloqueado.
- Con `SameSite=Lax`, se bloquean muchos escenarios, pero existen navegaciones cross-site permitidas, por lo que se recomienda complementar con tokens CSRF y otras validaciones.

### Ejercicio E — Auditoría del proyecto React + Supabase

En el repositorio existe una configuración del cliente Supabase mediante `createClient` y variables de entorno Vite. El comportamiento predeterminado actual de `@supabase/supabase-js` es persistir la sesión en `localStorage` cuando se utiliza en el navegador.

**Comprobación que debe hacerse en el navegador:**

1. Abrir DevTools.
2. Ir a **Application → Local Storage** y buscar el dominio del proyecto.
3. Revisar **Application → Cookies**.
4. Identificar dónde aparece la sesión.
5. Comparar el resultado con `document.cookie`.

Si el token está en `localStorage`, un XSS que consiga ejecutar JavaScript en el mismo origen podría intentar leer el almacenamiento y extraer información de sesión. Las mitigaciones incluyen evitar insertar HTML no confiable, sanitizar entradas cuando sea necesario, usar una política CSP adecuada, mantener dependencias actualizadas y reducir la exposición de tokens al JavaScript cuando la arquitectura permita sesiones mediante cookies `HttpOnly`.

**Resultado de DevTools:**

```text
[COMPLETAR DESPUÉS DE REVISAR EL PROYECTO DESPLEGADO]
Ubicación observada del token: ______________________
Cookie relacionada encontrada: _______________________
```

## Tabla resumen final

| Atributo/concepto | ¿Lo usa tu proyecto? | ¿Dónde lo verificaste? |
|---|---|---|
| `Secure` | Pendiente de comprobar | DevTools → Application → Cookies |
| `HttpOnly` | Pendiente de comprobar | DevTools → Application → Cookies |
| `SameSite` | Pendiente de comprobar | DevTools → Application → Cookies |
| Cookies de terceros | Pendiente de comprobar | DevTools → Application → Cookies / Network |
| Banner de consentimiento | Pendiente de comprobar | Interfaz del proyecto |
| Token de Supabase: ¿cookie o localStorage? | La configuración de `supabase-js` indica `localStorage` por defecto; falta verificar el despliegue | DevTools → Application → Local Storage / Cookies |

## Fuentes consultadas

- MDN Web Docs — HTTP cookies, `Set-Cookie`, `Cookie`, `document.cookie` y CHIPS.
- Supabase Docs — JavaScript Auth, SSR, `@supabase/ssr` y CORS de Edge Functions.
- Legislación colombiana sobre protección de datos personales: Ley 1581 de 2012 y reglamentación aplicable.

## Conclusión

Las cookies son una herramienta para mantener estado entre peticiones HTTP, pero sus atributos cambian bastante su seguridad y privacidad. `HttpOnly` ayuda frente a la lectura de cookies mediante XSS, `Secure` limita su transporte a conexiones seguras y `SameSite` reduce muchos escenarios de CSRF. En React con Supabase, una SPA puede usar `localStorage` por defecto, mientras que una arquitectura SSR puede usar cookies administradas con `@supabase/ssr`. La configuración concreta del proyecto debe comprobarse siempre desde DevTools en el navegador donde está desplegado.
