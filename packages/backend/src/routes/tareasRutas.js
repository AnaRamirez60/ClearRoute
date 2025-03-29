const express = require('express');
const router = express.Router();
const tareasControlador = require('../controllers/tareasControlador.js');

// Definir rutas y asociarlas con los métodos del controlador
router.get('/', tareasControlador.getAllTareas);
router.get('/:id', tareasControlador.getTareaById);
router.post('/', tareasControlador.createTarea);
router.put('/:id', tareasControlador.updateTarea);
router.delete('/:id', tareasControlador.deleteTarea);

module.exports = router;