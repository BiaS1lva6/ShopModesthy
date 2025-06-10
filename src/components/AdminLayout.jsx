import { Outlet, Link, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"
import Logo from "../assets/logo.png"

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992)
      if (window.innerWidth >= 992) {
        setSidebarOpen(false) // Fechar sidebar em desktop
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fechar sidebar quando mudar de rota em mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="admin-layout">
      {/* Overlay para mobile */}
      {isMobile && sidebarOpen && <div className="admin-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "show" : ""} header-bg`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-brand">
            <img src={Logo} alt="Logo" className="logo" />
            <span className="sidebar-brand-text">Admin Panel</span>
          </Link>
          {isMobile && (
            <button className="btn btn-link text-white d-lg-none" onClick={closeSidebar}>
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin" className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}>
                <i className="bi bi-speedometer2 me-2"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-section-title">PRODUTOS</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/produtos" className={`nav-link ${isActive("/admin/produtos") ? "active" : ""}`}>
                <i className="bi bi-box-seam me-2"></i>
                <span className="nav-text">Produtos</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/categorias" className={`nav-link ${isActive("/admin/categorias") ? "active" : ""}`}>
                <i className="bi bi-tags me-2"></i>
                <span className="nav-text">Categorias</span>
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-section-title">VENDAS</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/pedidos" className={`nav-link ${isActive("/admin/pedidos") ? "active" : ""}`}>
                <i className="bi bi-cart-check me-2"></i>
                <span className="nav-text">Pedidos</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/cupons" className={`nav-link ${isActive("/admin/cupons") ? "active" : ""}`}>
                <i className="bi bi-ticket-perforated me-2"></i>
                <span className="nav-text">Cupons</span>
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-section-title">SISTEMA</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/usuarios" className={`nav-link ${isActive("/admin/usuarios") ? "active" : ""}`}>
                <i className="bi bi-people me-2"></i>
                <span className="nav-text">Usuários</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button className="btn btn-link d-lg-none me-2" onClick={toggleSidebar}>
                <i className="bi bi-list fs-5"></i>
              </button>
              <h6 className="mb-0 d-none d-md-block text-muted">Painel Administrativo</h6>
            </div>

            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary btn-sm me-2 me-md-3">
                <i className="bi bi-arrow-left me-1"></i>
                <span className="d-none d-md-inline">Ver Site</span>
              </Link>

              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1 me-md-2"></i>
                  <span className="d-none d-md-inline">{user?.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
