const express = require('express');
const router = express.Router();
const lecturasControlador = require('../controllers/lecturasControlador.js');

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', lecturasControlador.getAllLecturas);
router.get('/:id', lecturasControlador.getLecturaById);
router.post('/', lecturasControlador.createLectura);
router.put('/:id', lecturasControlador.updateLectura);
router.delete('/:id', lecturasControlador.deleteLectura);

module.exports = router;