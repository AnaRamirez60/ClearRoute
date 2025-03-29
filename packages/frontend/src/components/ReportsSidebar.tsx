'use client';

import React from 'react';
import { Container } from '@/types/types';
import Image from 'next/image';
import { CalendarIcon, AlertCircleIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';

// Definición del tipo de reporte
export interface Report {
  id: string;
  containerId: number;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

// Datos mock de reportes
export const mockReports: Report[] = [
  {
    id: '1',
    containerId: 1,
    title: 'Contenedor dañado',
    description: 'La tapa del contenedor está rota y no cierra correctamente.',
    imageUrl: 'https://images.unsplash.com/photo-1562077981-4d7eafd44932?q=80&w=600',
    createdAt: '2023-03-15T10:30:00',
    priority: 'high'
  },
  {
    id: '2',
    containerId: 1,
    title: 'Olores fuertes',
    description: 'Fuertes olores emanando del contenedor, posiblemente necesita limpieza.',
    createdAt: '2023-03-10T14:20:00',
    priority: 'medium'
  },
  {
    id: '3',
    containerId: 2,
    title: 'Contenedor lleno',
    description: 'El contenedor está completamente lleno y necesita ser vaciado con urgencia.',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600',
    createdAt: '2023-03-18T09:15:00',
    priority: 'high'
  },
  {
    id: '4',
    containerId: 3,
    title: 'Graffiti en contenedor',
    description: 'El contenedor ha sido vandalizado con graffiti en varios lados.',
    imageUrl: 'https://images.unsplash.com/photo-1567880905822-56f8e5febdf3?q=80&w=600',
    createdAt: '2023-03-05T16:45:00',
    priority: 'low'
  },
  {
    id: '5',
    containerId: 4,
    title: 'Problemas de acceso',
    description: 'Vehículos estacionados bloquean el acceso al contenedor.',
    createdAt: '2023-03-12T11:30:00',
    priority: 'medium'
  },
  {
    id: '6',
    containerId: 5,
    title: 'Sensor dañado',
    description: 'El sensor de nivel de llenado parece no funcionar correctamente.',
    createdAt: '2023-03-20T08:00:00',
    priority: 'medium'
  }
];

interface ReportCardProps {
  report: Report;
}

// Componente para mostrar un reporte individual
const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Mapeo de prioridades a colores y textos
  const priorityMap = {
    low: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Baja' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Media' },
    high: { bg: 'bg-red-100', text: 'text-red-800', label: 'Alta' }
  };

  const priorityStyle = priorityMap[report.priority];

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{report.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}>
            {priorityStyle.label}
          </span>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-500">
          <CalendarIcon size={14} className="mr-1" /> 
          {formatDate(report.createdAt)}
        </CardDescription>
      </CardHeader>
      
      {report.description && (
        <CardContent>
          <p className="text-sm text-gray-700">{report.description}</p>
        </CardContent>
      )}
      
      {report.imageUrl && (
        <CardContent className="pt-0">
          <div className="rounded-md overflow-hidden h-48 relative">
            <Image 
              src={report.imageUrl} 
              alt={report.title} 
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      )}
      
      <CardFooter className="text-xs text-gray-500 pt-2">
        ID: {report.id} • Contenedor: {report.containerId}
      </CardFooter>
    </Card>
  );
};

interface ReportsSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  container?: Container | null;
}

const ReportsSidebar: React.FC<ReportsSidebarProps> = ({ 
  isOpen, 
  onOpenChange,
  container
}) => {
  // Filtrar reportes basados en el contenedor seleccionado o mostrar todos
  const filteredReports = container 
    ? mockReports.filter(report => report.containerId === container.id)
    : mockReports;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto z-50 bg-white">
        <SheetHeader>
          <SheetTitle>
            {container 
              ? `Reportes del contenedor #${container.id} (${container.type})`
              : 'Todos los reportes'}
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-4">
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-52 text-gray-500 text-center">
              <AlertCircleIcon size={40} className="mb-2 opacity-50" />
              <p>No hay reportes disponibles para este contenedor</p>
            </div>
          ) : (
            <ScrollArea className="h-[80vh] pr-4">
              {filteredReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReportsSidebar;