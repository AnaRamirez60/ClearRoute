'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAuth } from '@/context/AuthContext'

// Importar el mapa de forma dinámica para evitar problemas de SSR
const ContainerMap = dynamic(
  () => import('@/components/ContainerMap'),
  { ssr: false } 
)

export default function WorkerDashboard() {
  const router = useRouter()

  const { user } = useAuth() 

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">        
        <main className="pt-8 pb-16">
          <MaxWidthWrapper>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
              <h1 className="mb-3 font-semibold text-5xl text-gray-900">
              Bienvenido, {user?.name || 'Usuario'}
              </h1>
            </div>
            
            {/* Mapa de contenedores */}
            <div className="mb-8">
              <p className="text-gray-600 mb-4">Visualiza la ubicación y estado de los contenedores</p>
              <ContainerMap />
            </div>
            
            {/* Sección de acciones disponibles */}
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
          </MaxWidthWrapper>
        </main>
      </div>
    </ProtectedRoute>
  )
}