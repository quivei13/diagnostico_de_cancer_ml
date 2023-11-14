const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para la verificación de credenciales y el inicio de sesión
router.post('/inicio_de_sesion', (req, res, next) => {
    const { apellido_paterno, contraseña } = req.body;

    // Verifica si el apellido paterno existe en la tabla "funcionario"
    db.query('SELECT * FROM funcionario WHERE apellido_paterno = ? AND contraseña = ?', [apellido_paterno, contraseña], (err, funcionarioResults) => {
        if (err) {
            return next(err);
        }

        if (funcionarioResults.length > 0) {
            // Las credenciales son correctas, redirige a la página del funcionario
            res.json({ authenticated: true, role: 'funcionario', redirect: 'menu_principal.html' });
        } else {
            // Si no se encuentra en la tabla "funcionario", verifica en la tabla "administrador"
            db.query('SELECT * FROM administrador WHERE apellido_paterno = ? AND contraseña = ?', [apellido_paterno, contraseña], (err, adminResults) => {
                if (err) {
                    return next(err);
                }

                if (adminResults.length > 0) {
                    // Las credenciales son correctas, redirige a la página del administrador
                    res.json({ authenticated: true, role: 'administrador', redirect: 'menu_principal_administrador.html' });
                } else {
                    // Las credenciales son incorrectas, devuelve un objeto JSON con la autenticación en falso
                    res.json({ authenticated: false });
                }
            });
        }
    });
});

module.exports = router;
