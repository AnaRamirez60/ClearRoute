-- CreateTable
CREATE TABLE "Conductores" (
    "id" BIGSERIAL NOT NULL,
    "cr_nombre" TEXT NOT NULL,
    "cr_correo" VARCHAR(50) NOT NULL,
    "cr_contrasenia" VARCHAR(260) NOT NULL,

    CONSTRAINT "Conductores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contenedores" (
    "id" BIGSERIAL NOT NULL,
    "cr_ubicacion" TEXT NOT NULL,
    "cr_codigo_qr" TEXT NOT NULL,
    "cr_nivel_llenado" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Contenedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rutas" (
    "id" BIGSERIAL NOT NULL,
    "cr_conductor_id" BIGINT NOT NULL,
    "cr_fecha" TIMESTAMP(3) NOT NULL,
    "cr_detalles" TEXT,

    CONSTRAINT "Rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formularios" (
    "id" BIGSERIAL NOT NULL,
    "cr_contenedor_id" BIGINT NOT NULL,
    "cr_fecha" TIMESTAMP(3) NOT NULL,
    "cr_problema" TEXT,
    "cr_descripcion" TEXT,

    CONSTRAINT "Formularios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensores" (
    "id" BIGSERIAL NOT NULL,
    "cr_contenedor_id" BIGINT NOT NULL,

    CONSTRAINT "Sensores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecturas" (
    "id" BIGSERIAL NOT NULL,
    "cr_sensor_id" BIGINT NOT NULL,
    "cr_fecha" TIMESTAMP(3) NOT NULL,
    "cr_distancia" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Lecturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tareas" (
    "id" BIGSERIAL NOT NULL,
    "cr_ruta_id" BIGINT NOT NULL,
    "cr_contenedor_id" BIGINT NOT NULL,
    "cr_conductor_id" BIGINT,
    "cr_estado" BOOLEAN NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rutas" ADD CONSTRAINT "Rutas_cr_conductor_id_fkey" FOREIGN KEY ("cr_conductor_id") REFERENCES "Conductores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formularios" ADD CONSTRAINT "Formularios_cr_contenedor_id_fkey" FOREIGN KEY ("cr_contenedor_id") REFERENCES "Contenedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensores" ADD CONSTRAINT "Sensores_cr_contenedor_id_fkey" FOREIGN KEY ("cr_contenedor_id") REFERENCES "Contenedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturas" ADD CONSTRAINT "Lecturas_cr_sensor_id_fkey" FOREIGN KEY ("cr_sensor_id") REFERENCES "Sensores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_cr_ruta_id_fkey" FOREIGN KEY ("cr_ruta_id") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_cr_contenedor_id_fkey" FOREIGN KEY ("cr_contenedor_id") REFERENCES "Contenedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_cr_conductor_id_fkey" FOREIGN KEY ("cr_conductor_id") REFERENCES "Conductores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
