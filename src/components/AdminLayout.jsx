import { Outlet, Link, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import Logo from "../assets/logo.png"

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar header-bg">
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-brand">
            <img src={Logo} alt="Logo" className="logo" />
            Admin Panel
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin" className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}>
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-section-title">PRODUTOS</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/produtos" className={`nav-link ${isActive("/admin/produtos") ? "active" : ""}`}>
                <i className="bi bi-box-seam me-2"></i>
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/categorias" className={`nav-link ${isActive("/admin/categorias") ? "active" : ""}`}>
                <i className="bi bi-tags me-2"></i>
                Categorias
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-section-title">VENDAS</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/pedidos" className={`nav-link ${isActive("/admin/pedidos") ? "active" : ""}`}>
                <i className="bi bi-cart-check me-2"></i>
                Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/cupons" className={`nav-link ${isActive("/admin/cupons") ? "active" : ""}`}>
                <i className="bi bi-ticket-perforated me-2"></i>
                Cupons
              </Link>
            </li>

            <li className="nav-item">
              <div className="nav-section-title">SISTEMA</div>
            </li>
            <li className="nav-item">
              <Link to="/admin/usuarios" className={`nav-link ${isActive("/admin/usuarios") ? "active" : ""}`}>
                <i className="bi bi-people me-2"></i>
                Usuários
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
            <div>
              <button className="btn btn-link d-lg-none" id="sidebarToggle">
                <i className="bi bi-list"></i>
              </button>
            </div>

            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary me-3">
                <i className="bi bi-arrow-left me-1"></i>
                Ver Site
              </Link>

              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle me-2"></i>
                  {user?.name}
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
