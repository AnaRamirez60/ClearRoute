"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [problema, setProblema] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  const handleFileChange = (event) => {
    setFoto(event.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 font-sans bg-white text-black">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 border-b bg-green-600 text-white">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">Clear Routes</h1>
        </div>
        <a href="/trabajador" className="hover:underline">
          ¿Eres trabajador de recolección?
        </a>
      </header>

      {/* Main */}
      <main className="w-full max-w-2xl flex flex-col gap-6 mt-10 pb-20">
        <h2 className="text-3xl font-semibold text-center">Bienvenido a Clear Routes</h2>
        <p className="text-center text-gray-600">
          Esta plataforma te permite reportar problemas con los botes de basura. Escanea el código QR del contenedor y describe el problema.
        </p>

        <label className="block font-medium">Código del basurero</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block font-medium">Problema</label>
        <select
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona un problema</option>
          <option value="roto">Contenedor roto</option>
          <option value="lleno">Contenedor lleno</option>
          <option value="falta">Falta contenedor</option>
        </select>

        <label className="block font-medium">Descripción (Opcional)</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>

        <label className="block font-medium">Subir Foto</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700">Enviar Reporte</button>
      </main>

      {/* Información sobre el proyecto */}
      <section className="mt-10 w-full max-w-2xl text-center pb-20">
        <h3 className="text-xl font-semibold">¿Qué es Clear Routes?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <div>
            <h4 className="font-medium">¿Para qué?</h4>
            <p className="text-gray-600">Facilita el reporte de problemas con contenedores de basura.</p>
          </div>
          <div>
            <h4 className="font-medium">¿Cómo funciona?</h4>
            <p className="text-gray-600">Escanea un código QR y completa un breve formulario.</p>
          </div>
          <div>
            <h4 className="font-medium">Beneficios</h4>
            <p className="text-gray-600">Mejora la gestión de residuos y mantiene la ciudad limpia.</p>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="mt-10 w-full max-w-2xl pb-20">
        <h3 className="text-xl font-semibold">Preguntas Frecuentes</h3>
        <details className="mt-2 border p-2 rounded">
          <summary className="cursor-pointer font-medium">¿Cómo escaneo el código QR?</summary>
          <p className="text-gray-600 mt-2">Usa la cámara de tu teléfono o una aplicación de escaneo.</p>
        </details>
        <details className="mt-2 border p-2 rounded">
          <summary className="cursor-pointer font-medium">¿Qué pasa después de enviar un reporte?</summary>
          <p className="text-gray-600 mt-2">El reporte será revisado por las autoridades responsables.</p>
        </details>
      </section>

      {/* Footer */}
      <footer className="mt-10 w-full text-center p-6 border-t bg-green-600 text-white">
        <p>Contacto: support@clearroutes.com</p>
        <p>&copy; 2025 Clear Routes. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
