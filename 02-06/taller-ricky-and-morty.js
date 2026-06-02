async function obtenerPersonaje(id) {
  try {
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    const respuesta = await fetch(url);
    const personaje = await respuesta.json();

    console.log(personaje);
  } catch (error) {
    console.error("Error al obtener el personaje:", error);
  }
}

obtenerPersonaje(1);

// Obtener todos los personajes
async function obtenerPersonajes() {
  try {
    const respuesta = await fetch(
      "https://rickandmortyapi.com/api/character"
    );

    const datos = await respuesta.json();

    console.log(datos);
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

obtenerPersonajes();


// Mostrar únicamente los nombres
async function soloNombres() {
  try {
    const respuesta = await fetch(
      "https://rickandmortyapi.com/api/character"
    );

    const datos = await respuesta.json();

    const nombres = datos.results.map(personaje => personaje.name);

    console.log(nombres);
  } catch (error) {
    console.error("Error al obtener los nombres:", error);
  }
}

soloNombres();


// Obtener una página específica
async function obtenerPagina(numeroPagina) {
  try {
    const respuesta = await fetch(
      `https://rickandmortyapi.com/api/character?page=${numeroPagina}`
    );

    const datos = await respuesta.json();

    console.log(datos);
  } catch (error) {
    console.error("Error al obtener la página:", error);
  }
}

obtenerPagina(2);