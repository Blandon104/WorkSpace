# Documentación de código

## 1. ¿Cómo se documenta el código FrontEnd y cuál es la diferencia con el código BackEnd?

El **FrontEnd** es la parte de una aplicación que el usuario puede ver y utilizar. Incluye la interfaz, los botones, formularios, menús, estilos y las interacciones que ocurren en el navegador. Normalmente utiliza HTML, CSS y JavaScript, además de bibliotecas o frameworks como React.

Para documentar FrontEnd se recomienda explicar:

- Qué hace cada componente o sección de la interfaz.
- Qué datos recibe y qué datos muestra.
- Qué funciones o eventos importantes existen.
- Cómo se organiza la estructura de los archivos.
- Qué partes necesitan una explicación especial.

Ejemplo:

```jsx
// Muestra el nombre del usuario recibido mediante props.
function Usuario({ nombre }) {
  return <h2>{nombre}</h2>;
}
```

El **BackEnd** es la parte que funciona detrás de la interfaz. Se encarga, entre otras cosas, de procesar información, aplicar reglas de negocio, comunicarse con bases de datos y proporcionar servicios o APIs al FrontEnd.

La principal diferencia es que el **FrontEnd se concentra en la interfaz y la interacción con el usuario**, mientras que el **BackEnd se concentra en el procesamiento, los datos y la lógica del servidor**. Ambos deben documentarse explicando su propósito, funcionamiento, entradas, salidas y dependencias importantes.

## 2. ¿Cómo se documenta código CSS?

CSS se documenta principalmente mediante **comentarios**, que permiten explicar la intención de una regla o agrupar estilos relacionados. Los comentarios CSS utilizan `/* */` y el navegador no los aplica como estilos. citeturn0search1turn0search13

Ejemplo:

```css
/* Estilos principales de la tarjeta de usuario */
.card {
  padding: 20px;
  border-radius: 10px;
}
```

Es recomendable comentar aquello que no sea evidente por sí mismo. No es necesario explicar cada propiedad si su función ya resulta clara. También es útil separar los estilos en secciones y utilizar nombres de clases que indiquen claramente su propósito.

## 3. ¿Cómo se documenta código JavaScript?

JavaScript permite utilizar dos formas principales de comentarios: comentarios de una línea con `//` y comentarios de varias líneas con `/* */`. Estos comentarios son ignorados por el navegador y sirven para explicar la intención o lógica del código. citeturn0search2turn0search3

Ejemplo:

```javascript
// Calcula el precio final aplicando el descuento.
function calcularPrecio(precio, descuento) {
  return precio - (precio * descuento);
}
```

En código JavaScript es mejor explicar **por qué** se realiza una operación cuando no es evidente, en lugar de escribir un comentario que simplemente repita lo que hace el código. También conviene documentar funciones complejas, parámetros importantes, valores de retorno, APIs y decisiones que puedan generar dudas posteriormente. citeturn0search12

## 4. ¿Cómo se documenta código React específicamente?

En React se documenta principalmente la estructura y comportamiento de los **componentes**, sus **props**, el **estado**, los Hooks, eventos y cualquier lógica que no sea evidente. La documentación oficial de React recomienda mantener los componentes y Hooks con una estructura predecible y evitar efectos secundarios durante el renderizado. citeturn0search4turn0search17

Un componente puede documentarse mediante comentarios cuando su propósito o lógica no sea evidente:

```jsx
// Muestra una lista de usuarios recibida mediante props.
function ListaUsuarios({ usuarios }) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.nombre}</li>
      ))}
    </ul>
  );
}
```

También es importante explicar:

- **Props:** qué información recibe el componente y para qué se utiliza.
- **State:** qué información cambia durante la ejecución y qué provoca su actualización.
- **Eventos:** qué sucede cuando el usuario hace clic, escribe o realiza alguna acción.
- **Hooks:** para qué se utiliza cada Hook y qué efecto tiene.
- **Funciones:** qué problema resuelven y qué datos reciben o devuelven.
- **Dependencias:** qué librerías externas necesita el componente.

React utiliza componentes como piezas de la interfaz y permite anidarlos para construir aplicaciones. Sus Hooks permiten utilizar características como el estado y los efectos dentro de componentes. citeturn0search14turn0search8

### Ejemplo de documentación de un componente

```jsx
/**
 * Muestra un contador y permite aumentar su valor.
 * El estado se mantiene dentro del componente.
 */
function Contador() {
  const [contador, setContador] = useState(0);

  // Aumenta el contador en una unidad.
  function aumentar() {
    setContador(contador + 1);
  }

  return (
    <button onClick={aumentar}>
      Contador: {contador}
    </button>
  );
}
```

## 5. Buenas prácticas generales para documentar código

1. **Explicar lo importante:** documentar la intención y las partes que puedan generar dudas.
2. **Mantener los comentarios actualizados:** un comentario incorrecto puede confundir más que ayudar.
3. **Usar nombres claros:** una buena elección de nombres reduce la necesidad de comentarios innecesarios.
4. **No sobrecargar el código:** no hace falta comentar cada línea cuando el código es evidente.
5. **Documentar interfaces:** explicar qué datos recibe y devuelve una función, componente o módulo.
6. **Separar responsabilidades:** organizar el proyecto en archivos, componentes o módulos con funciones claras.

### Resumen

| Tecnología | Forma común de documentar | Qué conviene explicar |
|---|---|---|
| HTML | Comentarios `<!-- -->` y estructura clara | Secciones y propósito del marcado |
| CSS | Comentarios `/* */` y organización por secciones | Intención de estilos complejos |
| JavaScript | `//` y `/* */` | Lógica, funciones y decisiones importantes |
| React | Comentarios, nombres claros y documentación de componentes | Props, state, Hooks, eventos y lógica |
| BackEnd | Comentarios, documentación de APIs y módulos | Procesos, datos, endpoints y reglas de negocio |

Los comentarios HTML utilizan `<!-- -->`, los comentarios CSS utilizan `/* */` y JavaScript utiliza `//` o `/* */`. En React se aplican principalmente las convenciones de JavaScript, además de documentar la función de cada componente y sus datos. citeturn0search0turn0search1turn0search2
