# Teoría HTML y React

## HTML

HTML (HyperText Markup Language) es el lenguaje de marcado utilizado para estructurar el contenido de una página web.

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
