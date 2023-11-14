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
const formulario = document.getElementById("registrar-funcionario-form"); // Reemplaza "tu-formulario-id" con el ID de tu formulario

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




//BOTON REGISTRAR FUNCIONARIO
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona el botón "Registrar funcionario" por su ID
const botonRegistrarFuncionario = document.getElementById("boton-registrar");

// Agrega un evento de clic al botón "Registrar funcionario"
botonRegistrarFuncionario.addEventListener("click", function () {
    // Obtén los valores de los campos del formulario
    const rut = document.getElementById("rut").value;
    const nombre = document.getElementById("nombres").value;
    const apellido_paterno = document.getElementById("apellido-paterno").value;
    const apellido_materno = document.getElementById("apellido-materno").value;
    const genero = document.getElementById("genero").value;
    const fecha_de_nacimiento = document.getElementById("fecha-nacimiento").value;
    const correo_electronico = document.getElementById("mail").value;
    const telefono = document.getElementById("telefono").value;
    const edad = document.getElementById("edad").value;
    const contraseña = document.getElementById("contraseña").value;
    const area_profesion = document.getElementById("area/profesion").value;

    // Obtén los valores de los checkboxes
    const leer = document.getElementById("leer").checked;
    const registrar = document.getElementById("registrar").checked;
    const borrar = document.getElementById("borrar").checked;
    const actualizar = document.getElementById("actualizar").checked;

    // Crea un objeto con los datos del funcionario
    const funcionario = {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_de_nacimiento,
        correo_electronico,
        telefono,
        edad,
        contraseña,
        area_profesion,
        leer,
        registrar,
        borrar,
        actualizar
    };

    // Realiza una solicitud HTTP POST al servidor para registrar el funcionario
    fetch('/api/funcionario/registrar-funcionario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
    })
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta del servidor
            if (data.message) {
                alert(data.message);
                // Limpia los campos del formulario después de un registro exitoso
                document.getElementById("registrar-funcionario-form").reset();
            } else {
                alert('Hubo un error al registrar el funcionario.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
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

