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