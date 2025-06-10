import { useState, useEffect } from "react"
import { Link } from "react-router"
import products from "../../data/products"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    // Simular dados estatísticos
    setStats({
      totalProducts: products.length,
      totalCategories: 4,
      totalOrders: 156,
      totalRevenue: 45890.5,
    })
  }, [])

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h1 className="h3 mb-2 mb-md-0">Painel Administrativo</h1>
        <span className="badge bg-primary fs-6">Administrador</span>
      </div>

      {/* Cards de Estatísticas */}
      <div className="row mb-4">
        <div className="col-6 col-md-3 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">{stats.totalProducts}</h4>
                  <p className="mb-0 small">Produtos</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-box-seam fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">{stats.totalCategories}</h4>
                  <p className="mb-0 small">Categorias</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-tags fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">{stats.totalOrders}</h4>
                  <p className="mb-0 small">Pedidos</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-cart-check fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">
                    R$ {stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </h4>
                  <p className="mb-0 small">Faturamento</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-currency-dollar fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu de Ações Rápidas */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Gerenciamento de Produtos</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/produtos" className="btn btn-outline-primary">
                  <i className="bi bi-box-seam me-2"></i>
                  Ver Todos os Produtos
                </Link>
                <Link to="/admin/produtos/novo" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Adicionar Novo Produto
                </Link>
                <Link to="/admin/categorias" className="btn btn-outline-secondary">
                  <i className="bi bi-tags me-2"></i>
                  Gerenciar Categorias
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Vendas e Promoções</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to="/admin/pedidos" className="btn btn-outline-info">
                  <i className="bi bi-cart-check me-2"></i>
                  Ver Pedidos
                </Link>
                <Link to="/admin/cupons" className="btn btn-outline-success">
                  <i className="bi bi-ticket-perforated me-2"></i>
                  Gerenciar Cupons
                </Link>
                <Link to="/admin/cupons/novo" className="btn btn-success">
                  <i className="bi bi-plus-circle me-2"></i>
                  Criar Novo Cupom
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Últimos Pedidos */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Últimos Pedidos</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="d-none d-md-table-header-group">
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Pedido">
                    <strong>#12345</strong>
                  </td>
                  <td data-label="Cliente">Maria Silva</td>
                  <td data-label="Data">28/05/2025</td>
                  <td data-label="Status">
                    <span className="badge bg-warning">Pendente</span>
                  </td>
                  <td data-label="Total">
                    <strong>R$ 229,99</strong>
                  </td>
                  <td data-label="Ações">
                    <button className="btn btn-sm btn-outline-primary">Ver</button>
                  </td>
                </tr>
                <tr>
                  <td data-label="Pedido">
                    <strong>#12344</strong>
                  </td>
                  <td data-label="Cliente">João Santos</td>
                  <td data-label="Data">28/05/2025</td>
                  <td data-label="Status">
                    <span className="badge bg-success">Confirmado</span>
                  </td>
                  <td data-label="Total">
                    <strong>R$ 179,99</strong>
                  </td>
                  <td data-label="Ações">
                    <button className="btn btn-sm btn-outline-primary">Ver</button>
                  </td>
                </tr>
                <tr>
                  <td data-label="Pedido">
                    <strong>#12343</strong>
                  </td>
                  <td data-label="Cliente">Ana Costa</td>
                  <td data-label="Data">27/05/2025</td>
                  <td data-label="Status">
                    <span className="badge bg-info">Enviado</span>
                  </td>
                  <td data-label="Total">
                    <strong>R$ 359,98</strong>
                  </td>
                  <td data-label="Ações">
                    <button className="btn btn-sm btn-outline-primary">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
