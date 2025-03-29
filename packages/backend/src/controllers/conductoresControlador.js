const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los conductores
exports.getAllConductores = async (req, res) => {
  try {
    const conductores = await prisma.conductores.findMany();
    res.status(200).json(conductores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un conductor por su ID
exports.getConductorById = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const conductor = await prisma.conductores.findUnique({ where: { id: idNum } });
    if (!conductor) {
      return res.status(404).json({ error: 'Conductor no encontrado' });
    }

    res.status(200).json(conductor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un nuevo conductor
exports.addConductor = async (req, res) => {
  try {
    const { cr_nombre, cr_correo, cr_contrasenia } = req.body;

    if (!cr_nombre || !cr_correo || !cr_contrasenia) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevoConductor = await prisma.Conductores.create({
      data: { cr_nombre, cr_correo, cr_contrasenia },
    });

    res.status(201).json(nuevoConductor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un conductor
exports.updateConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { cr_nombre, cr_correo, cr_contrasenia } = req.body;
    if (!cr_nombre || !cr_correo || !cr_contrasenia) {
      return res.status(400).json({ error: 'Faltan datos para actualizar' });
    }

    const conductorActualizado = await prisma.conductores.update({
      where: { id: idNum },
      data: { cr_nombre, cr_correo, cr_contrasenia },
    });

    res.status(200).json(conductorActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un conductor
exports.deleteConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await prisma.conductores.delete({ where: { id: idNum } });

    res.status(200).json({ message: 'Conductor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

