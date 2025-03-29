const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllContenedores = async (req, res) => {
  try{
    const contenedores = await prisma.contenedor.findMany();
    res.status(200).json(contenedores);
  } catch (error){
    res.status (500) .json({error: 'Error al obtener los contenedores'});
  }
};

exports.getContenedorById = async (req, res) => {
  try{
    const {id} = req.params;
    const contenedor = await prisma.contenedor.findUnique({
      where: {id: parseInt(id)},
    });

    if (!contenedor){
      return res.status(404).json({error: 'Contenedor no encontrado'});
    }
    res.status(200).json(contenedor);
  } catch (error){
    res.status(500).json({error: 'Error al obtener el contenedor'});
  }
};

exports.createContenedor = async (req, res) => {
  try{
    const {cr_ubicacion, cr_codigo_qr, cr_nivel_llenado, sensores, formularios, tareas} = req.body;
    const nuevoContenedor = await prisma.contenedor.create({
      data: {
        cr_ubicacion,
        cr_codigo_qr,
        cr_nivel_llenado,
        sensores,
        formularios,
        tareas,
      },
    });

    res.status(201).json(nuevoContenedor);
  } catch (error){
    res.status(500).json({error: 'Error al registrar contenedor'});
  }
};

exports.updateContenedor = async (req, res) => {
  try{
    const {id} = req.params;
    const {cr_ubicacion, cr_codigo_qr, cr_nivel_llenado, sensores, formularios, tareas} = req.body;
    const contenedorActualizado = await prisma.contenedor.update({
      where: {id: parseInt(id)},
      data: {
        cr_ubicacion,
        cr_codigo_qr,
        cr_nivel_llenado,
        sensores,
        formularios,
        tareas,
      },
    });

    res.status(200).json(contenedorActualizado);
  } catch (error){
    res.status(500).json({error: 'Error al actualizar contenedor'});
  }
}

exports.deleteContenedor = async (req, res) => {
  try{
    const {id} = req.params;
    await prisma.contenedor.delete({
      where: {id: parseInt(id)},
    });

    res.status(204).json();
  } catch (error){
    res.status(500).json({error: 'Error al eliminar contenedor'});
  }
}

