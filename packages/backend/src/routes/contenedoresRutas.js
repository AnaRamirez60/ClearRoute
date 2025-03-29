const express = require('express');
const router = express.Router();
const contenedoresControlador = require('../controllers/contenedoresControlador.js'); // Ajusta la ruta según tu estructura

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', contenedoresControlador.getAllContenedores);
router.get('/:id', contenedoresControlador.getContenedorById);
router.post('/', contenedoresControlador.createContenedor);
router.put('/:id', contenedoresControlador.updateContenedor);
router.delete('/:id', contenedoresControlador.deleteContenedor);

module.exports = router;

