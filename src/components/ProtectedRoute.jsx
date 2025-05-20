import { Navigate, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redireciona para o login, mas salva a localização atual
    // para poder voltar após o login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute