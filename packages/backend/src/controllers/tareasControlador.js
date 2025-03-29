const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las tareas
const getAllTareas = async (req, res) => {
  try {
    const tareas = await prisma.tareas.findMany({
      include: {
        ruta: true, // Incluye la relación con Rutas
        contenedor: true, // Incluye la relación con Contenedores
        conductor: true, // Incluye la relación con Conductores
      },
    });
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas', detalle: error.message });
  }
};

// Obtener una tarea por ID
const getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await prisma.tareas.findUnique({
      where: { id: BigInt(id) },
      include: {
        ruta: true,
        contenedor: true,
        conductor: true,
      },
    });
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea', detalle: error.message });
  }
};

// Crear una nueva tarea
const createTarea = async (req, res) => {
  const { cr_ruta_id, cr_contenedor_id, cr_conductor_id, cr_estado } = req.body;
  try {
    const nuevaTarea = await prisma.tareas.create({
      data: {
        cr_ruta_id: BigInt(cr_ruta_id),
        cr_contenedor_id: BigInt(cr_contenedor_id),
        cr_conductor_id: cr_conductor_id ? parseInt(cr_conductor_id) : null,
        cr_estado: Boolean(cr_estado),
      },
    });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea', detalle: error.message });
  }
};

// Actualizar una tarea por ID
const updateTarea = async (req, res) => {
  const { id } = req.params;
  const { cr_ruta_id, cr_contenedor_id, cr_conductor_id, cr_estado } = req.body;
  try {
    const tareaActualizada = await prisma.tareas.update({
      where: { id: BigInt(id) },
      data: {
        cr_ruta_id: BigInt(cr_ruta_id),
        cr_contenedor_id: BigInt(cr_contenedor_id),
        cr_conductor_id: cr_conductor_id ? parseInt(cr_conductor_id) : null,
        cr_estado: Boolean(cr_estado),
      },
    });
    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea', detalle: error.message });
  }
};

// Eliminar una tarea por ID
const deleteTarea = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tareas.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea', detalle: error.message });
  }
};

module.exports = {
  getAllTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
};