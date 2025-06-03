import { Link, useNavigate } from "react-router"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import Logo from "../assets/logo.png"

const Header = ({ openRegisterModal }) => {
  const { itemCount } = useCart()
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate("/")
  }

  return (
    <header className="header-bg py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="me-5">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <nav className="d-none d-md-flex">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/conjuntos" className="nav-link text-dark">
                  CONJUNTOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vestidos" className="nav-link text-dark">
                  VESTIDOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/coletes" className="nav-link text-dark">
                  COLETES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sobre-nos" className="nav-link text-dark">
                  SOBRE NÓS
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="d-flex align-items-center">
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="form-control search-input"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn search-btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <button className="btn" onClick={toggleUserMenu}>
                <i className="bi bi-person"></i>
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  {isAuthenticated ? (
                    <>
                      <div className="user-menu-header">
                        <p className="mb-0">Olá, {user.name}</p>
                        <p className="small text-muted mb-0">{user.email}</p>
                      </div>
                      <div className="user-menu-body">
                        {isAdmin() && (
                          <Link to="/admin" className="user-menu-item">
                            <i className="bi bi-gear me-2"></i>
                            Painel Admin
                          </Link>
                        )}
                        <Link to="/minha-conta" className="user-menu-item">
                          <i className="bi bi-person me-2"></i>
                          Minha Conta
                        </Link>
                        <button className="user-menu-item text-danger" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Sair
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="user-menu-body">
                      <Link to="/login" className="user-menu-item">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Entrar
                      </Link>
                      <Link to="/cadastro" className="user-menu-item">
                        <i className="bi bi-person-plus me-2"></i>
                        Cadastrar
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link to="/carrinho" className="btn position-relative">
              <i className="bi bi-cart"></i>
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
