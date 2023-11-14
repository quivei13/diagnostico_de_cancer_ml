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


//BOTON LIMPIAR CAMPOS
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el botón "Limpiar Campos" por su ID
const botonLimpiarCampos = document.getElementById("limpiar-campos");

// Selecciona el formulario por su ID
const formulario = document.getElementById("editar-paciente-form"); // Reemplaza "tu-formulario-id" con el ID de tu formulario

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


//BOTON BUSCAR
////////////////////////////////////////////////////////////////////////////////////////
// Agrega un evento de clic al botón "Buscar"
const botonBuscar = document.getElementById("boton-buscar");
botonBuscar.addEventListener("click", buscarPacientePorRut);

// Función para buscar pacientes por RUT
function buscarPacientePorRut() {
    const rutABuscar = document.getElementById("buscar-rut").value;

    // Realiza una solicitud GET al servidor para obtener los datos del paciente por RUT
    fetch(`/api/pacientes/get/${rutABuscar}`)
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                mostrarMensajeError("Paciente no encontrado.");
                limpiarCampos();
            } else {
                mostrarMensajeError("Error al buscar paciente.");
            }
        })
        .then(function (data) {
            // Carga los datos del paciente en el formulario
            cargarDatosDelPaciente(data);
        })
        .catch(function (error) {
            console.error('Error al buscar paciente:', error);
            mostrarMensajeError("Error al buscar paciente.");
        });
}

// 

// Función para cargar los datos del paciente en el formulario
function cargarDatosDelPaciente(paciente) {
    document.getElementById("rut").value = paciente.rut;
    document.getElementById("nombres").value = paciente.nombre;
    document.getElementById("apellido-paterno").value = paciente.apellido_paterno;
    document.getElementById("apellido-materno").value = paciente.apellido_materno;
    document.getElementById("genero").value = paciente.genero;


    const fechaNacimiento = paciente.fecha_de_nacimiento;;
    const fechaNacimientoObj = new Date(fechaNacimiento);
    document.getElementById("fecha-nacimiento").value = fechaNacimientoObj.toISOString().split('T')[0];


    document.getElementById("mail").value = paciente.correo_electronico;
    document.getElementById("telefono").value = paciente.telefono;
    document.getElementById("edad").value = paciente.edad;
    document.getElementById("cancer").value = paciente.cancer;
    document.getElementById("diagnostico-inicial").value = paciente.diagnostico_inicial;
    document.getElementById("radiografias").value = paciente.radiografias;
    document.getElementById("condiciones-fisicas").value = paciente.condiciones_fisicas;
    document.getElementById("condiciones-ambientales").value = paciente.condiciones_ambientales;
    document.getElementById("datos-geneticos").value = paciente.datos_gen_mol;
    document.getElementById("historia-medica").value = paciente.historia_medica;
    // Carga otros campos del formulario

    // Habilita los botones de "Actualizar Paciente" y "Borrar Paciente"
    document.getElementById("boton-actualizar").disabled = false;
    document.getElementById("boton-borrar").disabled = false;
}
////////////////////////////////////////////////////////////////////////////////////////



//BOTON ACTUALIZAR
////////////////////////////////////////////////////////////////////////////////////////
// Agrega un evento de clic al botón "Actualizar Paciente"
const botonActualizar = document.getElementById("boton-actualizar");
botonActualizar.addEventListener("click", actualizarPaciente);

// Función para actualizar los datos del paciente
function actualizarPaciente() {
    const rut = document.getElementById("rut").value;
    const nombre = document.getElementById("nombres").value;
    const apellido_paterno = document.getElementById("apellido-paterno").value;
    const apellido_materno = document.getElementById("apellido-materno").value;
    const genero = document.getElementById("genero").value;
    const fecha_de_nacimiento = document.getElementById("fecha-nacimiento").value;
    const correo_electronico = document.getElementById("mail").value;
    const telefono = document.getElementById("telefono").value;
    const edad = document.getElementById("edad").value;
    const cancer = document.getElementById("cancer").value;
    const diagnostico_inicial = document.getElementById("diagnostico-inicial").value;
    const radiografias = document.getElementById("radiografias").value;
    const condiciones_fisicas = document.getElementById("condiciones-fisicas").value;
    const condiciones_ambientales = document.getElementById("condiciones-ambientales").value;
    const datos_gen_mol = document.getElementById("datos-geneticos").value;
    const historia_medica = document.getElementById("historia-medica").value;
    // Obtén otros valores del formulario

    


    const pacienteActualizado = {
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
        // Agrega otros campos actualizados aquí
    };

    // Realiza una solicitud PUT al servidor para actualizar los datos del paciente
    fetch(`/api/pacientes/${rut}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacienteActualizado),
    })
        .then(function (response) {
            if (response.status === 200) {
                mostrarMensajeConfirmacion("Paciente actualizado exitosamente.");
                limpiarCampos();
            } else {
                mostrarMensajeError("Error al actualizar paciente.");
            }
        })
        .catch(function (error) {
            console.error('Error al actualizar paciente:', error);
            mostrarMensajeError("Error al actualizar paciente.");
        });
}
////////////////////////////////////////////////////////////////////////////////////////



//BOTON BORRAR
////////////////////////////////////////////////////////////////////////////////////////
// Agrega un evento de clic al botón "Borrar Paciente"
const botonBorrar = document.getElementById("boton-borrar");
botonBorrar.addEventListener("click", borrarPaciente);

// Función para borrar un paciente
function borrarPaciente() {
    const rut = document.getElementById("rut").value;

    // Realiza una solicitud DELETE al servidor para eliminar al paciente
    fetch(`/api/pacientes/${rut}`, {
        method: 'DELETE',
    })
        .then(function (response) {
            if (response.status === 200) {
                mostrarMensajeConfirmacion("Paciente eliminado exitosamente.");
                limpiarCampos();
            } else {
                mostrarMensajeError("Error al borrar paciente.");
            }
        })
        .catch(function (error) {
            console.error('Error al borrar paciente:', error);
            mostrarMensajeError("Error al borrar paciente.");
        });
}
////////////////////////////////////////////////////////////////////////////////////////

// Función para mostrar un mensaje de confirmación
function mostrarMensajeConfirmacion(mensaje) {
    alert(mensaje);
}

// Función para mostrar un mensaje de error
function mostrarMensajeError(mensaje) {
    alert(mensaje);
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("rut").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellido-paterno").value = "";
    document.getElementById("apellido-materno").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("fecha-nacimiento").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("cancer").value = "";
    document.getElementById("diagnostico-inicial").value = "";
    document.getElementById("radiografias").value = "";
    document.getElementById("condiciones-fisicas").value = "";
    document.getElementById("condiciones-ambientales").value = "";
    document.getElementById("datos-geneticos").value = "";
    document.getElementById("historia-medica").value = "";
    // Limpia otros campos del formulario

    // Deshabilita los botones de "Actualizar Paciente" y "Borrar Paciente"
    document.getElementById("boton-actualizar").disabled = true;
    document.getElementById("boton-borrar").disabled = true;
    
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



