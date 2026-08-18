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
