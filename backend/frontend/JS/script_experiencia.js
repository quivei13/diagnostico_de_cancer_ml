
//BOTON VOLVER
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el botón "Volver" por su ID
const botonVolver = document.getElementById("boton-volver");

// Agrega un evento de clic al botón "Volver"
botonVolver.addEventListener("click", function () {
    // Utiliza la función window.history.back() para regresar a la página anterior
    window.history.back();
});
////////////////////////////////////////////////////////////////////////////////////////





// Array de preguntas
const preguntas = [
    "¿Ha tenido algún inconveniente en este sitio web?",
    "¿El sistema contiene todas las funcionalidades que necesita? Si no, por favor mencione qué funciones nuevas podría tener.",
    "¿El sitio web se demora demasiado tiempo en responder o funciona como las demás páginas?",
    "¿Encuentra que es intuitivo y amigable este sitio web?"
];

// Obtener elementos del DOM
const generarPreguntaBtn = document.getElementById("generar-pregunta");
const preguntaGeneradaDiv = document.getElementById("pregunta-generada");
const textoPregunta = document.getElementById("pregunta");
const respuestaTextarea = document.getElementById("respuesta");
const registrarRespuestaBtn = document.getElementById("registrar-respuesta");

// Agregar evento al botón "Generar Pregunta de Negocio"
generarPreguntaBtn.addEventListener("click", () => {
    // Obtener una pregunta aleatoria del array
    const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];

    // Mostrar la pregunta generada
    textoPregunta.textContent = preguntaAleatoria;
    preguntaGeneradaDiv.style.display = "block";
});

// Agregar evento al botón "Registrar Respuesta"
registrarRespuestaBtn.addEventListener("click", () => {
    // Obtener la pregunta y la respuesta
    const pregunta = textoPregunta.textContent;
    const respuesta = respuestaTextarea.value;

    // Enviar la pregunta y la respuesta al servidor
    enviarRespuestaAlServidor(pregunta, respuesta);
});

// Función para enviar la respuesta al servidor
function enviarRespuestaAlServidor(pregunta, respuesta) {
    // Realizar una solicitud AJAX al servidor para registrar la respuesta en la base de datos
    fetch('/api/experiencia/registrar-respuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pregunta, respuesta })
    })
    .then((response) => {
        if (response.ok) {
            // Respuesta exitosa, puedes mostrar un mensaje al usuario
            alert("Respuesta registrada con éxito.");
            // Limpiar el formulario o hacer cualquier otra acción necesaria
            preguntaGeneradaDiv.style.display = "none";
            respuestaTextarea.value = "";
        } else {
            // Hubo un error en la respuesta del servidor, muestra un mensaje de error
            alert("Error al registrar la respuesta.");
        }
    })
    .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Error en la solicitud al servidor.");
    });
}


//BOTON CERRAR SESION
////////////////////////////////////////////////////////////////////////////////////////
// Obtén el botón "Cerrar Sesión" por su ID
const botonCerrarSesion = document.getElementById("cerrar-sesion");

// Agrega un controlador de eventos al botón
botonCerrarSesion.addEventListener("click", function () {
  // Aquí debes realizar el cierre de sesión, por ejemplo, si estás utilizando cookies o sessionStorage, puedes borrar la información de sesión.
  
  // Luego, redirecciona a la página "index.html"
  window.location.href = "index.html";
});
////////////////////////////////////////////////////////////////////////////////////////


