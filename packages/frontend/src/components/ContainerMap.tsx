'use client'

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { Container, ContainerStatus } from '@/types/types';
import ReportsSidebar from './ReportsSidebar';
import { Button } from '@/components/ui/button';
import { ClipboardList, Map } from 'lucide-react';

// Añadir estilos globales para Leaflet
const MapStyles = () => {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        .leaflet-container {
          z-index: 5 !important; /* Valor bajo para el mapa base */
        }
        .leaflet-pane {
          z-index: 5 !important; /* Valor bajo para los panes del mapa */
        }
        .leaflet-overlay-pane {
          z-index: 6 !important;
        }
        .leaflet-marker-pane {
          z-index: 7 !important;
        }
        .leaflet-tooltip-pane {
          z-index: 8 !important;
        }
        .leaflet-popup-pane {
          z-index: 9 !important;
        }
        .leaflet-control {
          z-index: 10 !important;
        }
        /* Estilos para otros componentes UI para asegurar que estén por encima */
        .ui-overlay {
          position: relative;
          z-index: 1000 !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);
  
  return null;
};

// Datos mock de contenedores
const mockContainers: Container[] = [
  { id: 1, lat: 20.5881, lng: -100.3899, type: 'Orgánico', status: 'Disponible', fillLevel: 45 },
  { id: 2, lat: 20.5921, lng: -100.3942, type: 'Plástico', status: 'Lleno', fillLevel: 90 },
  { id: 3, lat: 20.5841, lng: -100.3867, type: 'Papel', status: 'Disponible', fillLevel: 30 },
  { id: 4, lat: 20.5901, lng: -100.3823, type: 'Vidrio', status: 'Mantenimiento', fillLevel: 60 },
  { id: 5, lat: 20.5860, lng: -100.3950, type: 'Metal', status: 'Disponible', fillLevel: 15 },
];

// Función para determinar el color del marcador según el nivel de llenado
const getMarkerColor = (fillLevel: number, status: ContainerStatus): string => {
  if (status === 'Mantenimiento') return 'gray';
  if (fillLevel > 75) return 'red';
  if (fillLevel > 50) return 'orange';
  return 'green';
};

// Componente para renderizar la ruta
interface RoutingMachineProps {
  containers: Container[];
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ containers }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  
  useEffect(() => {
    if (!map) return;
    
    // Limpiar cualquier ruta previa
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      } catch (error) {
        console.error("Error al eliminar ruta anterior:", error);
      }
    }
    
    // Filtrar contenedores que no están en mantenimiento y ordenar por nivel de llenado
    const containersToVisit = containers
      .filter(c => c.status !== 'Mantenimiento')
      .sort((a, b) => b.fillLevel - a.fillLevel);
    
    // Si no hay contenedores para visitar, salir
    if (containersToVisit.length === 0) return;
    
    // Crear waypoints para la ruta
    const waypoints = containersToVisit.map(container => 
      L.latLng(container.lat, container.lng)
    );
    
    // Crear la instancia de routing
    try {
      const routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        showAlternatives: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: '#3388ff', weight: 6 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          profile: 'driving'
        }),
        // Evitar que el panel de instrucciones aparezca
        show: false,
        addWaypoints: false,
        collapsible: true,
      });
      
      routingControl.addTo(map);
      routingControlRef.current = routingControl;
      
      // Ocultar el panel de instrucciones si existe
      const container = routingControl.getContainer();
      if (container) {
        container.style.display = 'none';
      }
    } catch (error) {
      console.error("Error al crear la ruta:", error);
    }
    
    // Función de limpieza al desmontar el componente
    return () => {
      try {
        if (map && routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      } catch (error) {
        console.error("Error al limpiar la ruta:", error);
      }
    };
  }, [map, containers]);

  return null;
};

const ContainerMap: React.FC = () => {
  const [iconMap, setIconMap] = useState<Record<string, L.Icon>>({});
  const [showRoute, setShowRoute] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  
  // Inicializar iconos para los marcadores
  useEffect(() => {
    const icons: Record<string, L.Icon> = {};
    
    ['green', 'orange', 'red', 'gray'].forEach(color => {
      icons[color] = L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    });
    
    setIconMap(icons);
  }, []);

  // Ubicación inicial (centro de Querétaro)
  const position: [number, number] = [20.5881, -100.3899];

  // Si no hay iconos cargados todavía, mostrar un indicador de carga
  if (Object.keys(iconMap).length === 0) {
    return <div>Cargando mapa...</div>;
  }

  // Función para mostrar los reportes de un contenedor específico
  const handleContainerClick = (container: Container) => {
    setSelectedContainer(container);
    setIsSidebarOpen(true);
  };

  // Función para mostrar todos los reportes
  const handleShowAllReports = () => {
    setSelectedContainer(null);
    setIsSidebarOpen(true);
  };

  return (
    <div className="relative" style={{ height: '500px', width: '100%', marginTop: '20px' }}>
      {/* Estilos globales para Leaflet */}
      <MapStyles />
      
      {/* Botones de control (encima del mapa) */}
      <div className="absolute top-0 right-0 flex gap-2 m-2 z-10">
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={handleShowAllReports}
        >
          <ClipboardList className="h-4 w-4 mr-1" />
          Ver reportes
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={() => setShowRoute(!showRoute)}
        >
          <Map className="h-4 w-4 mr-1" />
          {showRoute ? 'Ocultar Ruta' : 'Mostrar Ruta'}
        </Button>
      </div>
      
      {/* Contenedor del mapa con z-index controlado */}
      <div className="map-container" style={{ height: '100%', width: '100%', position: 'relative', zIndex: 5 }}>
        <MapContainer 
          center={position} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false} // Desactivamos el control de zoom predeterminado
          attributionControl={false} // Desactivamos la atribución predeterminada
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {mockContainers.map(container => (
            <Marker 
              key={container.id} 
              position={[container.lat, container.lng]}
              icon={iconMap[getMarkerColor(container.fillLevel, container.status)]}
              eventHandlers={{
                click: () => handleContainerClick(container)
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{container.type}</h3>
                  <p><strong>Estado:</strong> {container.status}</p>
                  <p><strong>Nivel de llenado:</strong> {container.fillLevel}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        container.fillLevel > 75 ? 'bg-red-600' : 
                        container.fillLevel > 50 ? 'bg-orange-500' : 'bg-green-600'}`}
                      style={{ width: `${container.fillLevel}%` }}
                    ></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {showRoute && <RoutingMachine containers={mockContainers} />}
          
          {/* Añadimos de nuevo el control de zoom pero en una posición personalizada */}
          <div className="leaflet-control-container">
            <div className="leaflet-top leaflet-left">
              {/* Los controles se añadirán automáticamente aquí */}
            </div>
          </div>
        </MapContainer>
      </div>

      {/* Sidebar siempre por encima con z-index mucho mayor */}
      <div className="ui-overlay" style={{ zIndex: 2000, position: 'relative' }}>
        <ReportsSidebar 
          isOpen={isSidebarOpen} 
          onOpenChange={setIsSidebarOpen}
          container={selectedContainer}
        />
      </div>
    </div>
  );
};

export default ContainerMap;