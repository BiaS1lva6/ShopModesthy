import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null
  })

  // Adicionar função para verificar se é admin
  const isAdmin = () => {
    return user && user.role === "admin"
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem("user")
      setIsAuthenticated(false)
    }
  }, [user])

  const login = (userData) => {
    // Verificar se é admin baseado no email/senha
    if (userData.email === "admin@modestyruby.com") {
      const adminUser = {
        email: userData.email,
        name: "Administrador",
        role: "admin",
      }
      setUser(adminUser)
      return true
    } else {
      // Login normal do cliente
      const clientUser = {
        email: userData.email,
        name: userData.email.split("@")[0],
        role: "client",
      }
      setUser(clientUser)
      return true
    }
  }

  const register = (userData) => {
    // Em um app real, você faria uma chamada à API aqui
    // Simulando um registro bem-sucedido
    setUser(userData)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
