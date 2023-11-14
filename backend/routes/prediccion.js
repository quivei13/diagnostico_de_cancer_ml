// routes/prediccion.js

const express = require('express');
const { PythonShell } = require('python-shell');
const path = require('path');
const router = express.Router();

// Ruta para manejar las solicitudes de predicción
router.post('/', (req, res) => {
  // Recibe los datos necesarios para la predicción desde el cuerpo de la solicitud (req.body)

  // Asegúrate de que tienes los datos requeridos para realizar la predicción

  // Aquí puedes realizar la predicción utilizando el modelo cargado previamente
  const datosParaPrediccion = req.body;

  const scriptPath = path.join(__dirname, 'cargar_modelo.py');
  const pythonPath = 'C:\\Users\\joaco\\AppData\\Local\\Programs\\Python\\Python311\\python.exe';

  const options = {
    pythonPath: pythonPath,
    args: [JSON.stringify(datosParaPrediccion)],
  };

  PythonShell.run(scriptPath, options, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al realizar la predicción' });
    } else {
      // 'results' contiene el resultado de la predicción
      const resultadoPrediccion = JSON.parse(results[0]);
      res.json({ prediccion: resultadoPrediccion });
    }
  });
});

module.exports = router;
