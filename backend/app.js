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
app.use(express.static(path.join(__dirname, 'backend')));


// Rutas
const pacientesRouter = require('./routes/pacientes'); // Crea este archivo y define tus rutas
const experienciaRouter = require('./routes/experiencia'); // Nueva ruta para la experiencia
const funcionarioRouter = require('./routes/funcionario');
const inicioSesionRouter = require('./routes/login');


app.use('/api/pacientes', pacientesRouter);
app.use('/api/experiencia', experienciaRouter); // Monta las rutas de experiencia en '/api/experiencia'
app.use('/api/funcionario', funcionarioRouter);
app.use('/api/login', inicioSesionRouter);



// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});




const { exec } = require('child_process');

// Ruta completa al script de Python
const scriptPath = path.join(__dirname, 'modelo.py');

// Comando para ejecutar el script de Python
const command = `${pythonPath} ${scriptPath}`;

// Ejecutar el comando
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el script de Python: ${error.message}`);
        return;
    }
    console.log('Script de modelo.py ejecutado correctamente.');
    console.log(`Salida del script: ${stdout}`);
    console.error(`Errores del script: ${stderr}`);
});








