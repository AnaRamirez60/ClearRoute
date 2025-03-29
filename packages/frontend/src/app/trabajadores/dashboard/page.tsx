'use client'

import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Importar el mapa de forma dinámica para evitar problemas de SSR
const ContainerMap = dynamic(
  () => import('@/components/ContainerMap'),
  { ssr: false } // Esto es importante para componentes que acceden a window/navigator
)

export default function WorkerDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/trabajadores/login')
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Trabajadores</h1>
            <div className="flex items-center">
              <span className="mr-4">Hola, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {/* Mapa de contenedores */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Mapa de Contenedores</h2>
                <p className="text-gray-600 mb-4">Visualiza la ubicación y estado de los contenedores</p>
                <ContainerMap />
              </div>
              
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 mt-6">
                <h2 className="text-xl font-bold mb-4">Acciones disponibles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg"
                    onClick={() => router.push('/escaner')}
                  >
                    <h3 className="font-bold text-lg mb-2">Escanear código QR</h3>
                    <p className="text-gray-600">Escanea un código QR para acceder a un cuestionario</p>
                  </div>
                  
                  <div 
                    className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg"
                    onClick={() => router.push('/trabajadores/reportes')}
                  >
                    <h3 className="font-bold text-lg mb-2">Ver reportes</h3>
                    <p className="text-gray-600">Accede a los reportes de respuestas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}