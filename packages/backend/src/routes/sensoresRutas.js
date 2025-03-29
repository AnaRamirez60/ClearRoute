const express = require('express');
const router = express.Router();
const sensoresControlador = require('../controllers/sensoresControlador.js');

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', sensoresControlador.getAllSensores);
router.get('/:id', sensoresControlador.getSensorById);
router.post('/', sensoresControlador.createSensor);
router.put('/:id', sensoresControlador.updateSensor);
router.delete('/:id', sensoresControlador.deleteSensor);

module.exports = router;