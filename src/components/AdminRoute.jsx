import { Navigate, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContext"

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
