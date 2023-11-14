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


//CHECKBOX FILTROS
////////////////////////////////////////////////////////////////////////////////////////
// Selecciona todos los checkboxes con la clase "habilitar-input"
const checkboxes = document.querySelectorAll(".habilitar-input");

// Agrega un evento de cambio a cada checkbox
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        // Obtiene el ID del campo de entrada objetivo desde el atributo "data-target"
        const targetId = checkbox.getAttribute("data-target");
        const campoDeEntrada = document.getElementById(targetId);

        // Habilita o deshabilita el campo de entrada según el estado del checkbox
        campoDeEntrada.disabled = !checkbox.checked;
    });
});
////////////////////////////////////////////////////////////////////////////////////////


//CARGA DE TABLA PACIENTES
////////////////////////////////////////////////////////////////////////////////////////
function cargarPacientes() {
    // Realizar una solicitud GET al servidor para obtener los datos de los pacientes
    fetch('/api/pacientes', { method: 'GET' })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Llenar la tabla con los datos obtenidos
        var tablaPacientes = document.getElementById('tabla-pacientes');
        tablaPacientes.innerHTML = ''; // Limpia cualquier contenido previo

        data.forEach(function (paciente) {
          // Crea una nueva fila en la tabla para cada paciente
          var fila = document.createElement('tr');
          // Agrega las celdas de datos

          // Arreglar formato de fecha de nacimiento
          const fechaNacimiento = paciente.fecha_de_nacimiento;;
          const fechaNacimientoObj = new Date(fechaNacimiento);
          
          fila.innerHTML = `
            <td>${paciente.rut}</td>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellido_paterno}</td>
            <td>${paciente.apellido_materno}</td>
            <td>${paciente.genero}</td>
            <td>${fechaNacimientoObj.toISOString().split('T')[0]}</td>
            <td>${paciente.correo_electronico}</td>
            <td>${paciente.telefono}</td>
            <td>${paciente.edad}</td>
            <td>${paciente.cancer}</td>
            <td>${paciente.diagnostico_inicial}</td>
            <td></td>
            <td>${paciente.condiciones_fisicas}</td>
            <td>${paciente.condiciones_ambientales}</td>
            <td>${paciente.datos_gen_mol}</td>
            <td>${paciente.historia_medica}</td>
          `;

          // Obtén la celda de imágenes (la celda número 11)
          var celdaImagenes = fila.getElementsByTagName('td')[11];

          // Crea un elemento de imagen para cada imagen de radiografía y agrégalo a la celda
          paciente.radiografias.split(',').forEach(function (imagen) {
            var imagenRadiografia = document.createElement('img');
            // Establece la ruta de la imagen
            imagenRadiografia.src = `/../imagenes/${imagen.trim()}`; // Asegúrate de eliminar espacios en blanco alrededor del nombre del archivo
            // Agrega la imagen a la celda
            celdaImagenes.appendChild(imagenRadiografia);
          });

          


          // Agrega la fila a la tabla
          tablaPacientes.appendChild(fila);
        });
      })
      .catch(function (error) {
        console.error('Error al cargar pacientes:', error);
      });
  };

  document.addEventListener("DOMContentLoaded", function () {
    cargarPacientes();
  });
  
////////////////////////////////////////////////////////////////////////////////////////




//BOTON BUSCAR POR RUT
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  cargarPacientes();

  // Obtén el formulario y agrega un controlador de eventos
  const buscarPacienteForm = document.getElementById("buscar-paciente-form");

  buscarPacienteForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue la página

    // Obtén el valor del campo de entrada del Rut
    const rutInput = document.getElementById("rut");
    const rut = rutInput.value;

    // Realiza una solicitud GET al servidor para buscar pacientes por Rut
    fetch(`/api/pacientes/get/${rut}`, { method: 'GET' })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Limpia la tabla antes de agregar los resultados de la búsqueda
        const tablaPacientes = document.getElementById('tabla-pacientes');
        tablaPacientes.innerHTML = '';

        // Arreglar formato de fecha de nacimiento
        const fechaNacimiento = data.fecha_de_nacimiento;
        const fechaNacimientoObj = new Date(fechaNacimiento);

        if (data) {
          // Crea una fila para mostrar el paciente encontrado
          var fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${data.rut}</td>
            <td>${data.nombre}</td>
            <td>${data.apellido_paterno}</td>
            <td>${data.apellido_materno}</td>
            <td>${data.genero}</td>
            <td>${fechaNacimientoObj.toISOString().split('T')[0]}</td>
            <td>${data.correo_electronico}</td>
            <td>${data.telefono}</td>
            <td>${data.edad}</td>
            <td>${data.cancer}</td>
            <td>${data.diagnostico_inicial}</td>
            <td></td>
            <td>${data.condiciones_fisicas}</td>
            <td>${data.condiciones_ambientales}</td>
            <td>${data.datos_gen_mol}</td>
            <td>${data.historia_medica}</td>
          `;

          // Obtén la celda de imágenes
          var celdaImagenes = fila.getElementsByTagName('td')[11];

          // Crea elementos de imagen para cada imagen de radiografía y agrégalos a la celda
          data.radiografias.split(',').forEach(function (imagen) {
            var imagenRadiografia = document.createElement('img');
            imagenRadiografia.src = `/../imagenes/${imagen.trim()}`;
            celdaImagenes.appendChild(imagenRadiografia);
          });

          // Agrega la fila a la tabla
          tablaPacientes.appendChild(fila);
        } else {
          // Si no se encuentra ningún paciente, muestra un mensaje
          tablaPacientes.innerHTML = '<tr><td colspan="15">Paciente no encontrado</td></tr>';
        }
      })
      .catch(function (error) {
        console.error('Error al buscar paciente:', error);
      });
  });
});




//BOTON BUSCAR POR FILTROS
////////////////////////////////////////////////////////////////////////////////////////
// Obtén el formulario y agrega un controlador de eventos
const buscarPacienteForm = document.getElementById("form-filtros");
const botonBuscarFiltros = document.getElementById("boton-buscar-filtros"); // Nuevo ID

buscarPacienteForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que se recargue la página

  // Obtén los valores de los campos de búsqueda
  const rutInput = document.getElementById("rut").value;
  const nombresInput = document.getElementById("filtro-nombres").value;
  const apellidoPaternoInput = document.getElementById("filtro-apellido-paterno").value;
  const apellidoMaternoInput = document.getElementById("filtro-apellido-materno").value;
  const cancerInput = document.getElementById("filtro-cancer-identificado").value;
  const fechaNacimientoInput = document.getElementById("filtro-fecha-nacimiento").value;

  // Realiza una solicitud GET al servidor para buscar pacientes según los filtros
  fetch(`/api/pacientes/search?rut=${rutInput}&nombre=${nombresInput}&apellido_paterno=${apellidoPaternoInput}&apellido_materno=${apellidoMaternoInput}&cancer=${cancerInput}&fecha_de_nacimiento=${fechaNacimientoInput}`, { method: 'GET' })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Limpia la tabla antes de agregar los resultados de la búsqueda
      const tablaPacientes = document.getElementById('tabla-pacientes');
      tablaPacientes.innerHTML = '';

      if (data.length > 0) {
        data.forEach(function (paciente) {
          // Crea una nueva fila en la tabla para cada paciente
          var fila = document.createElement('tr');
          // Agrega las celdas de datos

          // Arreglar formato de fecha de nacimiento
          const fechaNacimiento = paciente.fecha_de_nacimiento;
          const fechaNacimientoObj = new Date(fechaNacimiento);

          fila.innerHTML = `
              <td>${paciente.rut}</td>
              <td>${paciente.nombre}</td>
              <td>${paciente.apellido_paterno}</td>
              <td>${paciente.apellido_materno}</td>
              <td>${paciente.genero}</td>
              <td>${fechaNacimientoObj.toISOString().split('T')[0]}</td>
              <td>${paciente.correo_electronico}</td>
              <td>${paciente.telefono}</td>
              <td>${paciente.edad}</td>
              <td>${paciente.cancer}</td>
              <td>${paciente.diagnostico_inicial}</td>
              <td></td>
              <td>${paciente.condiciones_fisicas}</td>
              <td>${paciente.condiciones_ambientales}</td>
              <td>${paciente.datos_gen_mol}</td>
              <td>${paciente.historia_medica}</td>
          `;

          // Obtén la celda de imágenes (la celda número 11)
          var celdaImagenes = fila.getElementsByTagName('td')[11];

          // Crea un elemento de imagen para cada imagen de radiografía y agrégalo a la celda
          paciente.radiografias.split(',').forEach(function (imagen) {
            var imagenRadiografia = document.createElement('img');
            imagenRadiografia.src = `/../imagenes/${imagen.trim()}`;
            celdaImagenes.appendChild(imagenRadiografia);
          });

          // Agrega la fila a la tabla
          tablaPacientes.appendChild(fila);
        });
      } else {
        // Si no se encuentra ningún paciente, muestra un mensaje
        tablaPacientes.innerHTML = '<tr><td colspan="15">No se encontraron pacientes</td></tr>';
      }
    })
    .catch(function (error) {
      console.error('Error al buscar pacientes:', error);
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


