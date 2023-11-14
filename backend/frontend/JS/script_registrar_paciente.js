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



//BOTON REGISTRAR PACIENTE
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el botón "Registrar Paciente" por su ID
const botonRegistrar = document.getElementById("boton-registrar");

// Función para enviar los datos del formulario al servidor
function enviarDatosAlServidor() {
    // Obtén los valores ingresados por el usuario desde los campos del formulario
    const rut = document.getElementById("rut").value;
    const nombre = document.getElementById("nombre").value;
    const apellido_paterno = document.getElementById("apellido-paterno").value;
    const apellido_materno = document.getElementById("apellido-materno").value;
    const genero = document.getElementById("genero").value;
    const fecha_de_nacimiento = document.getElementById("fecha-nacimiento").value;
    const correo_electronico = document.getElementById("mail").value;
    const telefono = document.getElementById("telefono").value;
    const edad = document.getElementById("edad").value;
    const cancer = "desconocido";
    const diagnostico_inicial = document.getElementById("diagnostico-inicial").value;
    const radiografias = document.getElementById("radiografias").value;
    const condiciones_fisicas = document.getElementById("condiciones-fisicas").value;
    const condiciones_ambientales = document.getElementById("condiciones-ambientales").value;
    const datos_gen_mol = document.getElementById("datos-geneticos").value;
    const historia_medica = document.getElementById("historia-medica").value;
    // Obtén los valores de los demás campos aquí

    // Crea un objeto con los datos del paciente
    const paciente = {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_de_nacimiento,
        correo_electronico,
        telefono,
        edad,
        cancer,
        diagnostico_inicial,
        radiografias,
        condiciones_fisicas,
        condiciones_ambientales,
        datos_gen_mol,
        historia_medica
    };

    // Realiza una solicitud POST al servidor para registrar al paciente
    fetch('/api/pacientes/registrar-paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente),
    })
        .then(function (response) {
            if (response.status === 201) {
                // El paciente se registró con éxito
                mostrarMensajeConfirmacion("Paciente registrado exitosamente.");
                // Limpia los campos del formulario
                // limpiarCampos();
            } else {
                mostrarMensajeError("Error al registrar paciente.");
            }
        })
        .catch(function (error) {
            console.error('Error al registrar paciente:', error);
            mostrarMensajeError("Error al registrar paciente.");
        });
}

// Agrega un evento de clic al botón "Registrar Paciente" para enviar los datos al servidor
botonRegistrar.addEventListener("click", function () {
    enviarDatosAlServidor();



});

// Función para mostrar un mensaje de confirmación
function mostrarMensajeConfirmacion(mensaje) {
    // Muestra el mensaje en la página (puedes implementar esto)
    alert(mensaje);
}

// Función para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
    // Muestra el mensaje de error en la página (puedes implementar esto)
    alert(mensaje);
}






////////////////////////////////////////////////////////////////////////////////////////



//BOTON LIMPIAR CAMPOS
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el botón "Limpiar Campos" por su ID
const botonLimpiarCampos = document.getElementById("limpiar-campos");

// Selecciona el formulario por su ID
const formulario = document.getElementById("registrar-paciente-form"); // Reemplaza "tu-formulario-id" con el ID de tu formulario

// Agrega un evento de clic al botón "Limpiar Campos"
botonLimpiarCampos.addEventListener("click", function () {
    // Recorre todos los elementos del formulario
    const elementosFormulario = formulario.elements;
    for (let i = 0; i < elementosFormulario.length; i++) {
        const elemento = elementosFormulario[i];
        // Verifica si el elemento es un campo de entrada (input) o un área de texto (textarea)
        if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
            // Limpia el valor del campo
            elemento.value = "";
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////


//BOTON CARGAR IMAGEN
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el input de tipo file y el botón para cargar la imagen
const inputRadiografiaImagen = document.getElementById("radiografia-imagen-input");
const botonCargarImagen = document.getElementById("cargar-imagen");
const imagenPrevia = document.getElementById("imagen-previa");
const inputRadiografias = document.getElementById("radiografias");

// Agrega un evento de clic al botón "Cargar Imagen seleccionada"
botonCargarImagen.addEventListener("click", function () {
  // Simula un clic en el input de tipo file para abrir el selector de archivos
  inputRadiografiaImagen.click();
});

// Escucha cambios en el input de tipo file
inputRadiografiaImagen.addEventListener("change", function () {
  const archivoSeleccionado = inputRadiografiaImagen.files[0];

  if (archivoSeleccionado) {
    // Muestra la vista previa de la imagen
    imagenPrevia.style.display = "block";
    inputRadiografias.value = archivoSeleccionado.name;

    // Lee el contenido del archivo y muestra la vista previa
    const lector = new FileReader();
    lector.onload = function (e) {
      imagenPrevia.src = e.target.result;
    };
    lector.readAsDataURL(archivoSeleccionado);
  }
});
////////////////////////////////////////////////////////////////////////////////////////



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

