const express = require('express');
const router = express.Router();
const formulariosControlador = require('../controllers/formulariosControlador.js');

// Antes (incorrecto):
// router.get('/', obtenerFormularios);

// Después (corregido):
router.get('/', formulariosControlador.getAllFormularios);
router.get('/:id', formulariosControlador.getFormularioById);
router.post('/', formulariosControlador.createFormulario);
router.put('/:id', formulariosControlador.updateFormulario);
router.delete('/:id', formulariosControlador.deleteFormulario);

module.exports = router;
