export type User = {
    id: string
    email: string
    name: string
  }
  
  export type Worker = {
    id: string
    email: string
    password: string
    name: string
  }
  
  export type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
  }

  // Tipos de contenedores disponibles
export type ContainerType = 'Orgánico' | 'Plástico' | 'Papel' | 'Vidrio' | 'Metal';

// Estados posibles de un contenedor
export type ContainerStatus = 'Disponible' | 'Lleno' | 'Mantenimiento';

// Interfaz principal del contenedor
export interface Container {
  id: number;
  lat: number;
  lng: number;
  type: ContainerType;
  status: ContainerStatus;
  fillLevel: number; // 0-100
  address?: string;
  lastCollectedAt?: string;
  capacityKg?: number;
}