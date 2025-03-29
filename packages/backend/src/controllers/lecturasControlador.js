const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las lecturas
const getAllLecturas = async (req, res) => {
  try {
    const lecturas = await prisma.lecturas.findMany({
      include: {
        sensor: true, // Incluye la relación con Sensores
      },
    });
    res.status(200).json(lecturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las lecturas', detalle: error.message });
  }
};

// Obtener una lectura por ID
const getLecturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const lectura = await prisma.lecturas.findUnique({
      where: { id: BigInt(id) },
      include: {
        sensor: true, // Incluye la relación con Sensores
      },
    });
    if (!lectura) {
      return res.status(404).json({ error: 'Lectura no encontrada' });
    }
    res.status(200).json(lectura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lectura', detalle: error.message });
  }
};

// Crear una nueva lectura
const createLectura = async (req, res) => {
  const { cr_sensor_id, cr_fecha, cr_distancia } = req.body;
  try {
    const nuevaLectura = await prisma.lecturas.create({
      data: {
        cr_sensor_id: BigInt(cr_sensor_id),
        cr_fecha: new Date(cr_fecha),
        cr_distancia: parseFloat(cr_distancia),
      },
    });
    res.status(201).json(nuevaLectura);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la lectura', detalle: error.message });
  }
};

// Actualizar una lectura por ID
const updateLectura = async (req, res) => {
  const { id } = req.params;
  const { cr_sensor_id, cr_fecha, cr_distancia } = req.body;
  try {
    const lecturaActualizada = await prisma.lecturas.update({
      where: { id: BigInt(id) },
      data: {
        cr_sensor_id: BigInt(cr_sensor_id),
        cr_fecha: new Date(cr_fecha),
        cr_distancia: parseFloat(cr_distancia),
      },
    });
    res.status(200).json(lecturaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la lectura', detalle: error.message });
  }
};

// Eliminar una lectura por ID
const deleteLectura = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lecturas.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({ message: 'Lectura eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la lectura', detalle: error.message });
  }
};

module.exports = {
  getAllLecturas,
  getLecturaById,
  createLectura,
  updateLectura,
  deleteLectura,
};