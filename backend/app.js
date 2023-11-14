// app.js

const express = require('express');
const path = require('path'); // Importa el módulo 'path'
const app = express();
const port = process.env.PORT || 3000; // Puedes cambiar el puerto según tus preferencias
// Definir la ruta a Python
const pythonPath = 'C:\\Users\\joaco\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';
// Configuración de PythonShell
const options = {
    pythonPath: pythonPath,
};



// Configura middleware para manejar solicitudes JSON
app.use(express.json());

// Configura Express para servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));


// Rutas
const pacientesRouter = require('./routes/pacientes'); // Crea este archivo y define tus rutas
const experienciaRouter = require('./routes/experiencia'); // Nueva ruta para la experiencia
const funcionarioRouter = require('./routes/funcionario');
const inicioSesionRouter = require('./routes/login');
const prediccionRouter = require('./routes/prediccion');

app.use('/api/pacientes', pacientesRouter);
app.use('/api/experiencia', experienciaRouter); // Monta las rutas de experiencia en '/api/experiencia'
app.use('/api/funcionario', funcionarioRouter);
app.use('/api/login', inicioSesionRouter);
app.use('/api/prediccion', prediccionRouter);


// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});




// Cargar modelo de ML y ejecutar script al iniciar la aplicación
const { PythonShell } = require('python-shell');

// Ruta completa al script de Python
const scriptPath = path.join(__dirname, 'modelo.py');


PythonShell.run(scriptPath, options, (err, results) => {
    if (err) {
        console.error(err);
        // Manejar errores al cargar el modelo o ejecutar el script
    } else {
        console.log('Script de modelo.py ejecutado correctamente.');
        // Puedes realizar más acciones después de ejecutar el script si es necesario
    }
});

