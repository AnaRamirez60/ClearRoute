const express = require('express');
const router = express.Router();
const rutasControlador = require('../controllers/rutasControlador.js');

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', rutasControlador.getAllRutas);
router.get('/:id', rutasControlador.getRutaById);
router.post('/', rutasControlador.createRuta);
router.put('/:id', rutasControlador.updateRuta);
router.delete('/:id', rutasControlador.deleteRuta);

module.exports = router;