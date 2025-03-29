'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { AuthContextType, User } from '@/types/types'
import { MOCK_WORKERS } from '@/data/workers'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulando tiempo de respuesta de API
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const worker = MOCK_WORKERS.find(
      w => w.email === email && w.password === password
    )
    
    if (worker) {
      const userData: User = {
        id: worker.id,
        email: worker.email,
        name: worker.name,
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}