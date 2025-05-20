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
    // Em um app real, você faria uma chamada à API aqui
    // Simulando um login bem-sucedido
    setUser(userData)
    return true
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
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}