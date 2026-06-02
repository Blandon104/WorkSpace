const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: configura las variables de entorno SUPABASE_URL y SUPABASE_KEY antes de ejecutar este script."
  );
  console.error(
    "Ejemplo: SUPABASE_URL=https://tu-proyecto.supabase.co SUPABASE_KEY=tu_anon_key node app.js"
  );
  process.exit(1);
}

const url = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/estudiantes`;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json",
};

async function obtenerEstudiantes() {
  try {
    console.log("Consultando API...");

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    console.log("Respuesta de la API:");
    console.log(data);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }
}

obtenerEstudiantes();