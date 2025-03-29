const express = require('express');
const router = express.Router();
const conductoresControlador = require('../controllers/conductoresControlador.js'); // Ajusta la ruta según tu estructura

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', conductoresControlador.getAllConductores);
router.get('/:id', conductoresControlador.getConductorById);
router.post('/', conductoresControlador.addConductor);
router.put('/:id', conductoresControlador.updateConductor);
router.delete('/:id', conductoresControlador.deleteConductor);

module.exports = router;

