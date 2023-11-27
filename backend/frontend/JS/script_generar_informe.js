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

