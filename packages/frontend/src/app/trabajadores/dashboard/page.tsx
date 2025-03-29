'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import dynamic from 'next/dynamic'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAuth } from '@/context/AuthContext'

// Importar el mapa de forma dinámica para evitar problemas de SSR
const ContainerMap = dynamic(
  () => import('@/components/ContainerMap'),
  { ssr: false } 
)

export default function WorkerDashboard() {

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
          </MaxWidthWrapper>
        </main>
      </div>
    </ProtectedRoute>
  )
}