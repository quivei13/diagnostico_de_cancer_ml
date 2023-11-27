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



//BOTON CERRAR SESION
////////////////////////////////////////////////////////////////////////////////////////
// Obtén el botón "Cerrar Sesión" por su ID
const botonCerrarSesion = document.getElementById("cerrar-sesion");
// Agrega un controlador de eventos al botón
botonCerrarSesion.addEventListener("click", function () {
  // Borra la información de la sesión
  sessionStorage.removeItem("userId"); // Reemplaza "userId" con el nombre de tu clave de sesión
  // Redirecciona a la página "index.html"
  window.location.href = "index.html";
});
////////////////////////////////////////////////////////////////////////////////////////





// Obtén el elemento "rut" y el botón de búsqueda por su ID
const rutSelect = document.getElementById("rut");
const buscarPacienteBtn = document.getElementById("buscar-paciente-btn");

// Cargar opciones de "rut" desde el archivo resultados_prediccion.xlsx
fetch('../../resultados_prediccion.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        const binaryData = new Uint8Array(data);
        const dataString = String.fromCharCode.apply(null, binaryData);
        const workbook = XLSX.read(dataString, { type: 'binary' });
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        
        // Agregar opciones al elemento "rut"
        sheetData.forEach(row => {
            const option = document.createElement('option');
            option.value = row.rut;
            option.text = row.rut;
            rutSelect.add(option);
        });
    })
    .catch(error => console.error('Error al cargar opciones de "rut":', error));

// Agregar un controlador de eventos al botón de búsqueda
buscarPacienteBtn.addEventListener("click", function () {
    // Obtén el valor seleccionado del campo "rut"
    const selectedRut = rutSelect.value;

    // Realiza la solicitud al servidor para obtener los resultados del paciente
    fetch(`/api/pacientes/${selectedRut}`)
        .then(response => response.json())
        .then(data => {
            // Muestra los resultados en el contenedor
            const resultadosContainer = document.getElementById('resultados-container');
            resultadosContainer.innerHTML = '<h2>Resultados de Predicciones: (0 = Cancer de pulmon - 1 = Sin cancer) </h2>';

            // Itera sobre las propiedades y muestra los datos correspondientes
            for (const prop in data) {
                resultadosContainer.innerHTML += `<p>${prop}: ${data[prop]}</p>`;
            }
        })
        .catch(error => console.error('Error al cargar los resultados:', error));
});
