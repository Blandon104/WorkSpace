const estudiantes = [
  { nombre: "Carlos", edad: 21, carrera: "Ingeniería de Sistemas" },
  { nombre: "Ana", edad: 19, carrera: "Diseño Gráfico" },
  { nombre: "Luis", edad: 23, carrera: "Administración" },
];

function mostrarEstudiante(estudiante) {
  console.log("Nombre: " + estudiante.nombre);
  console.log("Edad: " + estudiante.edad);
  if (estudiante.carrera) {
    console.log("Carrera: " + estudiante.carrera);
  }
  console.log("-----------------------");
}

const estudiantesMayores = estudiantes.filter((estudiante) => estudiante.edad >= 18);

console.log("Estudiantes mayores de 18 años:");
console.log("==============================");
estudiantesMayores.forEach(mostrarEstudiante);

