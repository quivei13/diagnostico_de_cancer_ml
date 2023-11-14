//INICIO DE SESION
////////////////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("login-form");
    
//     // NO TOCAR
//     // codigo del formulario de inicio de sesion 
//     if (form) { // Verifica si el formulario existe en esta página
//         form.addEventListener("submit", function (e) {
//             e.preventDefault();

//             // Aquí puedes agregar la lógica de autenticación
//             const username = document.getElementById("username").value;
//             const password = document.getElementById("password").value;

//             // Ejemplo de autenticación básica
//             if (username === "usuario" && password === "contraseña") {
//                 alert("Inicio de sesión exitoso");
//                 // Redireccionar a la página principal
//                 window.location.href = "menu_principal.html";
//             } else if (username === "administrador" && password === "contraseña") {
//                 alert("Inicio de sesión exitoso");
//                 // Redireccionar a la página principal
//                 window.location.href = "menu_principal_administrador.html";
//             } else {
//                 alert("Credenciales incorrectas. Inténtalo de nuevo.");
//             }
//         });
//     }
// });
////////////////////////////////////////////////////////////////////////////////////////

//INICIO DE SESION DB
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    
    // Código del formulario de inicio de sesión
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Obtiene el valor del campo de apellido paterno y materno
            const apellidoPaterno = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            
            
            // Realiza una solicitud al servidor para verificar las credenciales
            // En esta solicitud, verifica si el apellido paterno existe en la tabla "funcionario"
            // o en la tabla "administrador" y compara la contraseña

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
});
  

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



