"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

// Datos mock para simular respuestas del servidor
const MOCK_REPORTS = [
  { id: 1, title: "Contenedor dañado", description: "La tapa no cierra correctamente", imageUrl: "/mock-images/container1.jpg" },
  { id: 2, title: "Basura fuera del contenedor", description: null, imageUrl: "/mock-images/container2.jpg" },
  { id: 3, title: "Contenedor lleno", description: "Necesita vaciarse urgentemente", imageUrl: null }
];

export default function Home() {
  // Estado del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mockReport, setMockReport] = useState<typeof MOCK_REPORTS[0] | null>(null);

  // Manejar cambios en la imagen seleccionada
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      
      // Crear una URL para previsualizar la imagen
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Eliminar imagen seleccionada
  const handleRemoveImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // Enviar el formulario (simulado)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Por favor ingresa un título");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular una llamada a API con un tiempo de espera
    setTimeout(() => {
      // Seleccionar un reporte mock aleatorio como respuesta
      const randomReport = MOCK_REPORTS[Math.floor(Math.random() * MOCK_REPORTS.length)];
      
      // Combinar datos del formulario con respuesta mock
      const submittedReport = {
        ...randomReport,
        title: title, // Usar el título ingresado por el usuario
        description: description || randomReport.description || "", // Asegurar que no sea null
        // Si el usuario subió una imagen, usamos la URL de previsualización,
        // si no, usamos la del reporte mock
        imageUrl: imagePreview || randomReport.imageUrl || null // Asegurar que sea null si no hay imagen
      };
      
      setMockReport(submittedReport);
      setSubmitted(true);
      setIsSubmitting(false);
      toast.success("¡Reporte enviado con éxito!");
    }, 1500);
  };

  // Reiniciar el formulario
  const handleReset = () => {
    setTitle("");
    setDescription("");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
    setSubmitted(false);
    setMockReport(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white text-black">
      <header className="w-full max-w-2xl flex justify-center items-center py-6">
        <h1 className="text-3xl font-bold text-emerald-600">Clear<span className="text-black">Route</span></h1>
      </header>

      <main className="w-full max-w-md">
        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Nuevo Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block font-medium">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Ej: Contenedor dañado"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="block font-medium">
                    Imagen (Opcional)
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="relative">
                        <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Vista previa"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block font-medium">
                    Descripción (Opcional)
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el problema..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Reporte"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-600">¡Reporte Enviado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockReport && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Título:</h3>
                    <p>{mockReport.title}</p>
                  </div>
                  
                  {mockReport.description && (
                    <div>
                      <h3 className="font-semibold">Descripción:</h3>
                      <p>{mockReport.description}</p>
                    </div>
                  )}
                  
                  {mockReport.imageUrl && (
                    <div>
                      <h3 className="font-semibold">Imagen:</h3>
                      <div className="relative h-48 w-full rounded-md overflow-hidden">
                        <Image
                          src={mockReport.imageUrl}
                          alt="Imagen del reporte"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleReset} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Crear Nuevo Reporte
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 ClearRoute - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}