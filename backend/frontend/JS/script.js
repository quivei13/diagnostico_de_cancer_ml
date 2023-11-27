

//INICIO DE SESION DB
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    // Código del formulario de inicio de sesión
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Obtiene los valores de los campos de apellido paterno y contraseña
        const apellidoPaterno = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // Realiza una solicitud al servidor para verificar las credenciales
        fetch("/api/login/inicio_de_sesion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apellido_paterno: apellidoPaterno, contraseña: password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.authenticated) {
              alert("Inicio de sesión exitoso");
              // Redirige a la página correspondiente según el rol
              if (data.role === 'funcionario') {
                window.location.href = data.redirect;
              } else if (data.role === 'administrador') {
                window.location.href = data.redirect;
              }
            } else {
              alert("Credenciales incorrectas. Inténtalo de nuevo.");
            }
          })
          .catch((error) => {
            console.error("Error al iniciar sesión:", error);
          });
      });
    }
    // Resto del código...
  });
  

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




document.addEventListener("DOMContentLoaded", function () {
    // Obtén el elemento donde mostrarás los permisos
    const permisosUsuarioElement = document.getElementById("permisos-usuario");
    // Realiza una solicitud al servidor para obtener los permisos del usuario
    fetch("/api/funcionario/permisos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // Muestra los permisos en la interfaz de usuario
        //permisosUsuarioElement.innerText = `Permisos: Leer(${data.leer}), Registrar(${data.registrar}), Borrar(${data.borrar}), Actualizar(${data.actualizar})`;
    })
    .catch((error) => {
        console.error("Error al obtener los permisos:", error);
    });
    // Resto del código...
});


function obtenerUsuarioId(username) {
    // Aquí puedes realizar cualquier procesamiento adicional necesario para obtener el ID del usuario
    return username;
  }

