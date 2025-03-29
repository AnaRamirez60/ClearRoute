const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las rutas
const getAllRutas = async (req, res) => {
  try {
    const rutas = await prisma.rutas.findMany({
      include: {
        conductor: true, // Incluye la relación con Conductores
        tareas: true, // Incluye la relación con Tareas
      },
    });
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutas', detalle: error.message });
  }
};

// Obtener una ruta por ID
const getRutaById = async (req, res) => {
  const { id } = req.params;
  try {
    const ruta = await prisma.rutas.findUnique({
      where: { id: BigInt(id) },
      include: {
        conductor: true,
        tareas: true,
      },
    });
    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la ruta', detalle: error.message });
  }
};

// Crear una nueva ruta
const createRuta = async (req, res) => {
  const { cr_conductor_id, cr_fecha, cr_detalles } = req.body;
  try {
    const nuevaRuta = await prisma.rutas.create({
      data: {
        cr_conductor_id: parseInt(cr_conductor_id),
        cr_fecha: new Date(cr_fecha),
        cr_detalles,
      },
    });
    res.status(201).json(nuevaRuta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ruta', detalle: error.message });
  }
};

// Actualizar una ruta por ID
const updateRuta = async (req, res) => {
  const { id } = req.params;
  const { cr_conductor_id, cr_fecha, cr_detalles } = req.body;
  try {
    const rutaActualizada = await prisma.rutas.update({
      where: { id: BigInt(id) },
      data: {
        cr_conductor_id: parseInt(cr_conductor_id),
        cr_fecha: new Date(cr_fecha),
        cr_detalles,
      },
    });
    res.status(200).json(rutaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ruta', detalle: error.message });
  }
};

// Eliminar una ruta por ID
const deleteRuta = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.rutas.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({ message: 'Ruta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la ruta', detalle: error.message });
  }
};

module.exports = {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
};