# Teoría HTML y React

## HTML

HTML (HyperText Markup Language) es el lenguaje de marcado utilizado para estructurar el contenido de una página web.

### ¿Qué es una etiqueta de HTML?

Una etiqueta de HTML es una instrucción que le indica al navegador qué tipo de elemento debe mostrar en una página web. Se escribe normalmente entre los símbolos `<` y `>`. Por ejemplo, la etiqueta `<p>` se utiliza para crear un párrafo.

### ¿Qué etiquetas componen la estructura de un archivo HTML?

La estructura básica de un archivo HTML está compuesta principalmente por estas etiquetas:

- `<!DOCTYPE html>`: indica que el documento utiliza HTML5.
- `<html>`: contiene todo el contenido de la página web.
- `<head>`: contiene información de configuración y metadatos de la página.
- `<title>`: establece el título que aparece en la pestaña del navegador.
- `<body>`: contiene todo el contenido que el usuario puede ver en la página.

### Estructura básica

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página</title>
</head>
<body>
  <h1>Hola mundo</h1>
</body>
</html>
```

### 5 etiquetas de texto en HTML

1. **`<h1>`**: se utiliza para colocar el título principal de una página.
2. **`<h2>`**: sirve para crear subtítulos o títulos de segundo nivel.
3. **`<p>`**: se utiliza para escribir párrafos de texto.
4. **`<strong>`**: sirve para destacar un texto importante, normalmente mostrándolo en negrita.
5. **`<em>`**: sirve para darle énfasis a una parte del texto, normalmente mostrándola en cursiva.

### ¿Cómo funciona un link en HTML?

Un link o enlace permite llevar al usuario desde una página web hacia otra página, un sitio web, un archivo o incluso otra sección de la misma página. Para crear un enlace se utiliza principalmente la etiqueta `<a>`, conocida como etiqueta de ancla.

El destino del enlace se coloca en el atributo `href`, mientras que el texto que puede pulsar el usuario se escribe entre la etiqueta de apertura y la etiqueta de cierre.

```html
<a href="https://www.ejemplo.com">Visitar página</a>
```

En este ejemplo, `<a>` crea el enlace, `href` indica hacia dónde debe dirigirse y `Visitar página` es el texto que verá y podrá pulsar el usuario.

También se puede usar `target="_blank"` para abrir el enlace en una nueva pestaña:

```html
<a href="https://www.ejemplo.com" target="_blank">Abrir página</a>
```

Por lo tanto, las etiquetas y atributos principales para crear un link son **`<a>`** y **`href`**. El atributo **`target`** es opcional y sirve para controlar dónde se abre el enlace.

### Etiquetas comunes

- `<h1>` a `<h6>`: títulos y subtítulos.
- `<p>`: párrafos.
- `<a>`: enlaces.
- `<img>`: imágenes.
- `<ul>` y `<ol>`: listas.
- `<li>`: elementos de una lista.
- `<div>`: contenedor genérico.
- `<section>`: sección semántica.
- `<header>`: encabezado.
- `<footer>`: pie de página.
- `<form>`: formulario.

### Atributos

Los atributos proporcionan información adicional a las etiquetas. Algunos ejemplos son `id`, `class`, `src`, `href` y `alt`.

```html
<a href="https://ejemplo.com">Visitar sitio</a>
<img src="imagen.jpg" alt="Descripción de la imagen">
```

## CSS

CSS (Cascading Style Sheets) es el lenguaje que se utiliza para definir la apariencia y presentación de una página web. Permite cambiar aspectos como colores, tamaños, fuentes, espacios y posiciones de los elementos. En pocas palabras, HTML organiza el contenido y CSS se encarga de darle estilo.

### Selectores CSS

Los selectores CSS son patrones que permiten elegir qué elementos HTML serán modificados por una regla de estilo.

Los selectores más utilizados son:

- **Selector de etiqueta:** selecciona todos los elementos de un tipo. Ejemplo: `p { color: blue; }` modifica todos los párrafos.
- **Selector de clase:** comienza con `.` y selecciona los elementos que tienen esa clase. Ejemplo: `.titulo { color: red; }`.
- **Selector de ID:** comienza con `#` y selecciona el elemento que tiene ese ID. Ejemplo: `#principal { background: gray; }`.
- **Selector universal:** `*` selecciona todos los elementos.
- **Selector de atributo:** selecciona elementos según uno de sus atributos. Ejemplo: `input[type="text"] { ... }`.
- **Selector de descendientes:** permite seleccionar elementos que están dentro de otro elemento. Ejemplo: `div p { color: green; }` selecciona los párrafos que están dentro de un `div`.

También se pueden agrupar varios selectores separados por comas cuando deben compartir las mismas reglas.

```css
h1, h2, p {
  font-family: Arial, sans-serif;
}
```

### ¿Cómo puede una etiqueta ser modificada por múltiples selectores CSS?

Una misma etiqueta HTML puede coincidir con varios selectores CSS al mismo tiempo. Cuando ocurre esto, el navegador utiliza la **cascada** y la **especificidad** para decidir qué valor aplicar cuando diferentes reglas intentan modificar la misma propiedad.

Por ejemplo:

```html
<p id="texto" class="importante">Hola mundo</p>
```

```css
p {
  color: blue;
}

.importante {
  color: green;
}

#texto {
  color: red;
}
```

Los tres selectores coinciden con el mismo `<p>`, pero no todos tienen la misma especificidad. En este caso, el selector de ID (`#texto`) tiene mayor especificidad que el selector de clase (`.importante`) y que el selector de etiqueta (`p`), por lo que el texto termina siendo rojo.

Si dos reglas tienen la misma especificidad y afectan la misma propiedad, normalmente prevalece la que aparece después en el CSS.

## React

React es una biblioteca de JavaScript utilizada para construir interfaces de usuario mediante componentes reutilizables.

### ¿Qué es un componente de React?

Un componente de React es una parte independiente y reutilizable de una interfaz. Normalmente se crea mediante una función de JavaScript que devuelve JSX, es decir, una estructura que describe qué elementos se deben mostrar en pantalla.

Los componentes permiten dividir una aplicación grande en partes pequeñas y fáciles de organizar. Por ejemplo, una página podría tener componentes como `Header`, `Menu`, `TarjetaProducto` y `Footer`.

```jsx
function Saludo() {
  return <h1>Hola mundo</h1>;
}

export default Saludo;
```

En este ejemplo, `Saludo` es un componente porque es una función que devuelve una parte de la interfaz. Además, puede reutilizarse dentro de otros componentes.

### Relación entre los componentes de React y las etiquetas HTML

Los componentes de React y las etiquetas HTML se parecen porque ambos sirven para construir la interfaz que el usuario ve. Dentro de un componente de React se pueden utilizar etiquetas HTML mediante JSX, como `<div>`, `<h1>`, `<p>` y `<button>`.

Por ejemplo:

```jsx
function Perfil() {
  return (
    <div>
      <h1>Alejandro</h1>
      <p>Estudiante de desarrollo web</p>
    </div>
  );
}
```

Aquí `Perfil` es un **componente de React**, mientras que `<div>`, `<h1>` y `<p>` son **elementos escritos con sintaxis JSX que representan elementos HTML**.

### Parecidos

- Ambos ayudan a construir la interfaz de una página o aplicación.
- Los componentes pueden contener varias etiquetas HTML.
- JSX permite escribir etiquetas con una sintaxis muy parecida a HTML.
- Tanto los componentes como las etiquetas pueden organizar el contenido de una interfaz.

### Diferencias

- Una **etiqueta HTML** es un elemento definido por el estándar HTML, como `<p>` o `<button>`.
- Un **componente de React** es una unidad de código creada por el desarrollador que puede combinar elementos, lógica y datos.
- Las etiquetas HTML por sí solas no tienen el concepto de estado de React; los componentes pueden utilizar `state` y otros recursos de React.
- Los componentes pueden recibir **props**, que permiten enviarles información desde otros componentes.
- Un componente puede reutilizarse muchas veces y cada instancia puede trabajar con datos diferentes.

En resumen, **HTML proporciona los elementos básicos de la interfaz y React permite organizarlos en componentes reutilizables y agregarles lógica y comportamiento**.

### Tipos de variables en un componente de React

Dentro de un componente de React se pueden encontrar diferentes tipos de valores y variables. Los más importantes son:

1. **Variables locales:** se declaran normalmente con `const` o `let` dentro del componente. Sirven para realizar cálculos o guardar valores que se utilizan durante una renderización. Si cambia una variable local por sí sola, React no vuelve a renderizar el componente.
2. **Props:** son valores que el componente recibe desde su componente padre. Se utilizan para enviar información hacia un componente hijo. Las props se consideran inmutables dentro del componente que las recibe.
3. **State (estado):** son valores que React guarda para el componente y que pueden cambiar durante su funcionamiento. Cuando se actualizan mediante su función setter, React puede volver a renderizar el componente.
4. **Variables constantes externas:** también se pueden utilizar valores definidos fuera del componente, por ejemplo, constantes que no dependen de una renderización específica.

Ejemplo:

```jsx
import { useState } from "react";

const titulo = "Mi aplicación";

function Perfil({ nombre }) {
  const mensaje = "Bienvenido";
  const [edad, setEdad] = useState(17);

  return (
    <div>
      <h1>{titulo}</h1>
      <p>{mensaje}, {nombre}</p>
      <p>Edad: {edad}</p>
      <button onClick={() => setEdad(edad + 1)}>Aumentar edad</button>
    </div>
  );
}
```

En este ejemplo, `titulo` es una constante externa, `mensaje` es una variable local, `nombre` es una prop y `edad` es una variable de estado.

### ¿Qué son los Props de un componente?

Los **props** son datos que un componente recibe desde otro componente, normalmente desde su componente padre. Permiten que un mismo componente sea reutilizable y muestre información diferente dependiendo de los datos que recibe.

Por ejemplo:

```jsx
function Usuario({ nombre }) {
  return <p>Hola, {nombre}</p>;
}

function App() {
  return <Usuario nombre="Alejandro" />;
}
```

En este caso, `nombre` es un prop. El componente `App` se lo envía a `Usuario`, y `Usuario` lo utiliza para mostrar el texto correspondiente.

Las props pueden contener diferentes tipos de valores, como textos, números, booleanos, arreglos, objetos e incluso funciones. El componente que recibe las props no debe modificarlas directamente; si necesita un valor diferente, debe recibir nuevas props o utilizar su propio estado.

### ¿Qué es useState?

`useState` es un **Hook de React** que permite agregar una variable de estado a un componente funcional. React guarda ese estado entre las diferentes renderizaciones del componente. `useState` devuelve dos valores: el estado actual y una función para actualizarlo. citeturn0search0turn0search3

La forma básica de utilizarlo es:

```jsx
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <button onClick={() => setContador(contador + 1)}>
      Contador: {contador}
    </button>
  );
}
```

Aquí:

- `contador` es la variable que contiene el estado actual.
- `setContador` es la función utilizada para actualizar el estado.
- `useState(0)` establece `0` como valor inicial.
- Al llamar a `setContador`, React programa una nueva renderización para mostrar el nuevo valor. citeturn0search0

El estado puede guardar diferentes tipos de datos, como números, textos, valores booleanos, arreglos u objetos. No se debe modificar directamente la variable de estado; se debe utilizar la función setter proporcionada por `useState`. citeturn0search2turn0search6

### Conceptos principales

- **Componentes:** piezas independientes y reutilizables de la interfaz.
- **JSX:** sintaxis que permite escribir una estructura similar a HTML dentro de JavaScript.
- **Props:** datos que un componente recibe desde otro componente.
- **State:** datos internos de un componente que pueden cambiar durante la ejecución.
- **Hooks:** funciones especiales que permiten utilizar características de React, como `useState` y `useEffect`.

### Componente básico

```jsx
function Saludo() {
  return <h1>Hola mundo</h1>;
}

export default Saludo;
```

### Props

```jsx
function Usuario({ nombre }) {
  return <p>Hola, {nombre}</p>;
}

<Usuario nombre="Alejandro" />
```

### useState

`useState` permite crear y actualizar datos que pertenecen al estado de un componente.

```jsx
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <button onClick={() => setContador(contador + 1)}>
      Contador: {contador}
    </button>
  );
}
```

### useEffect

`useEffect` permite ejecutar efectos secundarios, por ejemplo, realizar peticiones a una API o reaccionar a cambios en determinadas variables.

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("El componente se ha montado");
}, []);
```

## Relación entre HTML y React

HTML define la estructura de una página web de forma tradicional. React utiliza JSX para describir la interfaz mediante componentes, lo que facilita dividir una aplicación en partes reutilizables y mantener su estado y comportamiento.
