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

Los selectores CSS son patrones que permiten elegir qué elementos HTML serán modificados por una regla de estilo. citeturn0search5

Los selectores más utilizados son:

- **Selector de etiqueta:** selecciona todos los elementos de un tipo. Ejemplo: `p { color: blue; }` modifica todos los párrafos.
- **Selector de clase:** comienza con `.` y selecciona los elementos que tienen esa clase. Ejemplo: `.titulo { color: red; }`.
- **Selector de ID:** comienza con `#` y selecciona el elemento que tiene ese ID. Ejemplo: `#principal { background: gray; }`.
- **Selector universal:** `*` selecciona todos los elementos.
- **Selector de atributo:** selecciona elementos según uno de sus atributos. Ejemplo: `input[type="text"] { ... }`.
- **Selector de descendientes:** permite seleccionar elementos que están dentro de otro elemento. Ejemplo: `div p { color: green; }` selecciona los párrafos que están dentro de un `div`.

También se pueden agrupar varios selectores separados por comas cuando deben compartir las mismas reglas. citeturn0search3

```css
h1, h2, p {
  font-family: Arial, sans-serif;
}
```

### ¿Cómo puede una etiqueta ser modificada por múltiples selectores CSS?

Una misma etiqueta HTML puede coincidir con varios selectores CSS al mismo tiempo. Cuando ocurre esto, el navegador utiliza la **cascada** y la **especificidad** para decidir qué valor aplicar cuando diferentes reglas intentan modificar la misma propiedad. citeturn0search0turn0search2

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

Los tres selectores coinciden con el mismo `<p>`, pero no todos tienen la misma especificidad. En este caso, el selector de ID (`#texto`) tiene mayor especificidad que el selector de clase (`.importante`) y que el selector de etiqueta (`p`), por lo que el texto termina siendo rojo. citeturn0search0

Si dos reglas tienen la misma especificidad y afectan la misma propiedad, normalmente prevalece la que aparece después en el CSS. citeturn0search4

## React

React es una biblioteca de JavaScript utilizada para construir interfaces de usuario mediante componentes reutilizables.

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
