
let tamaño = 5;

for (let i = 1; i <= tamaño; i++) {
    let fila = "";

    for (let j = 1; j <= i; j++) {
        fila += "* ";
    }

    console.log(fila);
}