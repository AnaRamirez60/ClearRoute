const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los formularios
exports.getAllFormularios = async (req, res) => {
  try {
    const formularios = await prisma.formularios.findMany({
      include: {
        contenedor: true, // Incluye la relación con Contenedores
      },
    });
    res.status(200).json(formularios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los formularios', detalle: error.message });
  }
};

// Obtener un formulario por ID
exports.getFormularioById = async (req, res) => {
  const { id } = req.params;
  try {
    const formulario = await prisma.formularios.findUnique({
      where: { id: BigInt(id) },
      include: {
        contenedor: true, // Incluye la relación con Contenedores
      },
    });
    if (!formulario) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }
    res.status(200).json(formulario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el formulario', detalle: error.message });
  }
};

// Crear un nuevo formulario
exports.createFormulario = async (req, res) => {
  const { cr_contenedor_id, cr_fecha, cr_problema, cr_descripcion } = req.body;
  try {
    const nuevoFormulario = await prisma.formularios.create({
      data: {
        cr_contenedor_id: BigInt(cr_contenedor_id),
        cr_fecha: new Date(cr_fecha),
        cr_problema,
        cr_descripcion,
      },
    });
    res.status(201).json(nuevoFormulario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el formulario', detalle: error.message });
  }
};

// Actualizar un formulario por ID
exports.updateFormulario = async (req, res) => {
  const { id } = req.params;
  const { cr_contenedor_id, cr_fecha, cr_problema, cr_descripcion } = req.body;
  try {
    const formularioActualizado = await prisma.formularios.update({
      where: { id: BigInt(id) },
      data: {
        cr_contenedor_id: BigInt(cr_contenedor_id),
        cr_fecha: new Date(cr_fecha),
        cr_problema,
        cr_descripcion,
      },
    });
    res.status(200).json(formularioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el formulario', detalle: error.message });
  }
};

// Eliminar un formulario por ID
exports.deleteFormulario = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.formularios.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({ message: 'Formulario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el formulario', detalle: error.message });
  }
};


