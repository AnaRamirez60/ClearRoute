'use client'

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Datos mock de contenedores
const mockContainers = [
    { id: 1, lat: 20.5881, lng: -100.3899, type: 'Orgánico', status: 'Disponible', fillLevel: 45 },
    { id: 2, lat: 20.5921, lng: -100.3942, type: 'Plástico', status: 'Lleno', fillLevel: 90 },
    { id: 3, lat: 20.5841, lng: -100.3867, type: 'Papel', status: 'Disponible', fillLevel: 30 },
    { id: 4, lat: 20.5901, lng: -100.3823, type: 'Vidrio', status: 'Mantenimiento', fillLevel: 60 },
    { id: 5, lat: 20.5860, lng: -100.3950, type: 'Metal', status: 'Disponible', fillLevel: 15 },
  ];

// Función para determinar el color del marcador según el nivel de llenado
const getMarkerColor = (fillLevel: number, status: string) => {
  if (status === 'Mantenimiento') return 'gray';
  if (fillLevel > 75) return 'red';
  if (fillLevel > 50) return 'orange';
  return 'green';
};

const ContainerMap = () => {
  const [iconMap, setIconMap] = useState<Record<string, L.Icon>>({});

  // Inicializar iconos para los marcadores
  useEffect(() => {
    const icons: Record<string, L.Icon> = {};
    
    // Crear un icono para cada color posible
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

  // Ubicación inicial (centro de Ciudad de México)
  const position: [number, number] = [20.5881, -100.3899];

  // Si no hay iconos cargados todavía, mostrar un indicador de carga
  if (Object.keys(iconMap).length === 0) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div style={{ height: '500px', width: '100%', marginTop: '20px' }}>
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
      </MapContainer>
    </div>
  );
};

export default ContainerMap;