const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que la ruta del archivo db.js sea correcta

// Ruta para registrar respuestas a preguntas de negocio
router.post('/registrar-respuesta', (req, res) => {
    const { pregunta, respuesta } = req.body;

    // Insertar la respuesta en la tabla 'reseñas'
    db.query("INSERT INTO reseñas (pregunta, respuesta) VALUES (?, ?)", [pregunta, respuesta], (err, result) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            res.status(500).json({ error: "Error al registrar la respuesta" });
        } else {
            console.log("Respuesta registrada en la base de datos.");
            res.status(201).json({ message: "Respuesta registrada con éxito" });
        }
    });
});

module.exports = router;





