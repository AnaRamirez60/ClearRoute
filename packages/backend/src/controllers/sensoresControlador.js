const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los sensores
const getAllSensores = async (req, res) => {
  try {
    const sensores = await prisma.sensores.findMany({
      include: {
        contenedor: true, // Incluye la relación con Contenedores
        lecturas: true, // Incluye la relación con Lecturas
      },
    });
    res.status(200).json(sensores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los sensores', detalle: error.message });
  }
};

// Obtener un sensor por ID
const getSensorById = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await prisma.sensores.findUnique({
      where: { id: BigInt(id) },
      include: {
        contenedor: true,
        lecturas: true,
      },
    });
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el sensor', detalle: error.message });
  }
};

// Crear un nuevo sensor
const createSensor = async (req, res) => {
  const { cr_contenedor_id } = req.body;
  try {
    const nuevoSensor = await prisma.sensores.create({
      data: {
        cr_contenedor_id: BigInt(cr_contenedor_id),
      },
    });
    res.status(201).json(nuevoSensor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el sensor', detalle: error.message });
  }
};

// Actualizar un sensor por ID
const updateSensor = async (req, res) => {
  const { id } = req.params;
  const { cr_contenedor_id } = req.body;
  try {
    const sensorActualizado = await prisma.sensores.update({
      where: { id: BigInt(id) },
      data: {
        cr_contenedor_id: BigInt(cr_contenedor_id),
      },
    });
    res.status(200).json(sensorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el sensor', detalle: error.message });
  }
};

// Eliminar un sensor por ID
const deleteSensor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sensores.delete({
      where: { id: BigInt(id) },
    });
    res.status(200).json({ message: 'Sensor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el sensor', detalle: error.message });
  }
};

module.exports = {
  getAllSensores,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
};