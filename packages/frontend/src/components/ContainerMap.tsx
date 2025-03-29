'use client'

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { Container, ContainerStatus } from '@/types/types';

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
  // Añadir referencia para el control de rutas
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
    
    // Filtrar contenedores que no están en mantenimiento y ordenar por nivel de llenado (de más lleno a menos)
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
        })
      });
      
      routingControl.addTo(map);
      routingControlRef.current = routingControl;
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

  return (
    <div style={{ height: '500px', width: '100%', marginTop: '20px' }}>
      <div className="mb-4">
        <button
          onClick={() => setShowRoute(!showRoute)}
          className="bg-green-700 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {showRoute ? 'Ocultar Ruta' : 'Mostrar Ruta Óptima'}
        </button>
      </div>
      
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
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
      </MapContainer>
    </div>
  );
};

export default ContainerMap;