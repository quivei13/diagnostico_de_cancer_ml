// routes/pacientes.js

const express = require('express');
const router = express.Router();
const db = require('../db');


// Ruta para obtener todos los pacientes
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM paciente', (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});

// Ruta para registrar un nuevo paciente
router.post('/registrar-paciente', (req, res, next) => {
  const { rut, nombre, apellido_paterno, apellido_materno, genero, fecha_de_nacimiento, correo_electronico, telefono, edad, cancer, diagnostico_inicial, radiografias, condiciones_fisicas, condiciones_ambientales, datos_gen_mol, historia_medica } = req.body;

  // Verifica que los campos requeridos estén presentes

  if (!rut || !nombre || !apellido_paterno || !apellido_materno || !genero || !fecha_de_nacimiento || !correo_electronico || !telefono || !edad || !cancer || !diagnostico_inicial || !radiografias || !condiciones_fisicas || !condiciones_ambientales || !datos_gen_mol || !historia_medica) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.query('INSERT INTO paciente (rut, nombre, apellido_paterno, apellido_materno, genero, fecha_de_nacimiento, correo_electronico, telefono, edad, cancer, diagnostico_inicial, radiografias, condiciones_fisicas, condiciones_ambientales, datos_gen_mol, historia_medica) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rut, nombre, apellido_paterno, apellido_materno, genero, fecha_de_nacimiento, correo_electronico, telefono, edad, cancer, diagnostico_inicial, radiografias, condiciones_fisicas, condiciones_ambientales, datos_gen_mol, historia_medica], (err, results) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ message: 'Paciente registrado exitosamente' });
  });
});

// Otras rutas y controladores relacionados con pacientes aquí

// Ruta para obtener un paciente por RUT
router.get('/get/:rut', (req, res, next) => {
  const pacienteRUT = req.params.rut;

  db.query('SELECT * FROM paciente WHERE rut = ?', [pacienteRUT], (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(results[0]);
  });
});

// Ruta para actualizar un paciente por RUT
router.put('/:rut', (req, res, next) => {
  const pacienteRUT = req.params.rut;
  const { rut, nombre, apellido_paterno, apellido_materno, genero, fecha_de_nacimiento, correo_electronico, telefono, edad, cancer, diagnostico_inicial, radiografias, condiciones_fisicas, condiciones_ambientales, datos_gen_mol, historia_medica } = req.body;

  // Verifica que los campos requeridos estén presentes

  if (!rut || !nombre || !apellido_paterno || !apellido_materno || !genero || !fecha_de_nacimiento || !correo_electronico || !telefono || !edad || !cancer || !diagnostico_inicial || !radiografias || !condiciones_fisicas || !condiciones_ambientales || !datos_gen_mol || !historia_medica) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  db.query('UPDATE paciente SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, genero = ?, fecha_de_nacimiento = ?, correo_electronico = ?, telefono = ?, edad = ?, cancer = ?, diagnostico_inicial = ?, radiografias = ?, condiciones_fisicas = ?, condiciones_ambientales = ?, datos_gen_mol = ?, historia_medica = ? WHERE rut = ?', [nombre, apellido_paterno, apellido_materno, genero, fecha_de_nacimiento, correo_electronico, telefono, edad, cancer, diagnostico_inicial, radiografias, condiciones_fisicas, condiciones_ambientales, datos_gen_mol, historia_medica, pacienteRUT], (err, results) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Paciente actualizado exitosamente' });
  });
});


// Ruta para borrar un paciente por RUT
router.delete('/:rut', (req, res, next) => {
  const pacienteRUT = req.params.rut;

  db.query('DELETE FROM paciente WHERE rut = ?', [pacienteRUT], (err, results) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Paciente eliminado exitosamente' });
  });
});




// Ruta para buscar pacientes por filtros
router.get('/search', (req, res, next) => {
  const { rut, nombre, apellido_paterno, apellido_materno, cancer, fecha_de_nacimiento } = req.query;

  // Construye la consulta SQL dinámica en función de los filtros proporcionados
  let sql = 'SELECT * FROM paciente WHERE 1'; // Comenzamos con un WHERE 1 para que sea más fácil agregar condiciones

  if (rut) {
    sql += ` AND rut = '${rut}'`;
  }

  if (nombre) {
    sql += ` AND nombre LIKE '%${nombre}%'`;
  }

  if (apellido_paterno) {
    sql += ` AND apellido_paterno LIKE '%${apellido_paterno}%'`;
  }

  if (apellido_materno) {
    sql += ` AND apellido_materno LIKE '%${apellido_materno}%'`;
  }

  if (cancer) {
    sql += ` AND cancer = '${cancer}'`;
  }

  if (fecha_de_nacimiento) {
    sql += ` AND fecha_de_nacimiento = '${fecha_de_nacimiento}'`;
  }

  db.query(sql, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
});






module.exports = router;
