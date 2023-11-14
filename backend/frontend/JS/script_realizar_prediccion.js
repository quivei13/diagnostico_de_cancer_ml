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
  // Aquí debes realizar el cierre de sesión, por ejemplo, si estás utilizando cookies o sessionStorage, puedes borrar la información de sesión.
  
  // Luego, redirecciona a la página "index.html"
  window.location.href = "index.html";
});
////////////////////////////////////////////////////////////////////////////////////////


// ... (código anterior)

// Reemplaza la parte de Fetch API con el siguiente código
// Utiliza Fetch API para cargar los resultados desde el archivo excel
fetch('../resultados_prediccion.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        // Convierte el ArrayBuffer a una cadena binaria
        const binaryData = new Uint8Array(data);
        const dataString = String.fromCharCode.apply(null, binaryData);

        // Parsea los datos de Excel usando xlsx
        const workbook = XLSX.read(dataString, { type: 'binary' });

        // Obtén los datos de la primera hoja
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

        // Asegúrate de que haya al menos una fila en los resultados
        if (sheetData.length > 0) {
            // Asumimos que la primera fila contiene nombres de columnas
            const columnNames = sheetData[0];

            // Asumimos que la última fila contiene los resultados
            const lastRow = sheetData[sheetData.length - 1];

            // Muestra los resultados en el contenedor
            const resultadosContainer = document.getElementById('resultados-container');
            resultadosContainer.innerHTML = '<h2>Resultados de Predicciones:</h2>';

            // Itera sobre las columnas y muestra los datos correspondientes
            for (let i = 0; i < columnNames.length; i++) {
                resultadosContainer.innerHTML += `<p>${columnNames[i]}: ${lastRow[i]}</p>`;
            }
        } else {
            console.error('El archivo Excel no contiene datos.');
        }
    })
    .catch(error => console.error('Error al cargar los resultados:', error));

