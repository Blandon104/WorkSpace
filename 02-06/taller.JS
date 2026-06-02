function Estudiante({ nombre, edad, carrera }) {
  return (
    <div>
      <p>Nombre: {nombre}</p>
      <p>Edad: {edad}</p>
      {carrera && <p>Carrera: {carrera}</p>}
    </div>
  );
}

function Lista() {
  const estudiantes = [
    { nombre: "Carlos", edad: 21, carrera: "Ingeniería de Sistemas" },
    { nombre: "Ana", edad: 19, carrera: "Diseño Gráfico" },
    { nombre: "Luis", edad: 23, carrera: "Administración" },
  ];

  return (
    <div>
      {estudiantes
        .filter((est) => est.edad >= 18)
        .map((est, index) => (
          <Estudiante
            key={index}
            nombre={est.nombre}
            edad={est.edad}
            carrera={est.carrera}
          />
        ))}
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Lista de Estudiantes</h1>
      <Lista />
    </>
  );
}

export default App;

