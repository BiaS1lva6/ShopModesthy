import { useState } from "react"
import { Link } from "react-router"

const AdminOrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: 12345,
      customerName: "Maria Silva",
      customerEmail: "maria@email.com",
      date: "2025-05-28",
      status: "pending",
      paymentMethod: "credit_card",
      total: 229.99,
      items: [{ name: "CONJUNTO BLUSA + MACACÃO TODO-PRETO", quantity: 1, price: 229.99 }],
      shippingAddress: "Rua das Flores, 123 - São Paulo, SP",
    },
    {
      id: 12344,
      customerName: "João Santos",
      customerEmail: "joao@email.com",
      date: "2025-05-28",
      status: "confirmed",
      paymentMethod: "pix",
      total: 179.99,
      items: [{ name: "CONJUNTO SHORT + COLETE BRANCO", quantity: 1, price: 179.99 }],
      shippingAddress: "Av. Paulista, 456 - São Paulo, SP",
    },
    {
      id: 12343,
      customerName: "Ana Costa",
      customerEmail: "ana@email.com",
      date: "2025-05-27",
      status: "shipped",
      paymentMethod: "credit_card",
      total: 359.98,
      items: [
        { name: "VESTIDO MIDI PRETO ELEGANCE", quantity: 1, price: 199.99 },
        { name: "COLETE SOCIAL FEMININO BRANCO", quantity: 1, price: 159.99 },
      ],
      shippingAddress: "Rua do Comércio, 789 - Rio de Janeiro, RJ",
    },
    {
      id: 12342,
      customerName: "Carlos Oliveira",
      customerEmail: "carlos@email.com",
      date: "2025-05-26",
      status: "delivered",
      paymentMethod: "credit_card",
      total: 219.99,
      items: [{ name: "CONJUNTO COMPLETO SOCIAL GIRL PRETO", quantity: 1, price: 219.99 }],
      shippingAddress: "Rua das Palmeiras, 321 - Belo Horizonte, MG",
    },
    {
      id: 12341,
      customerName: "Fernanda Lima",
      customerEmail: "fernanda@email.com",
      date: "2025-05-25",
      status: "cancelled",
      paymentMethod: "pix",
      total: 159.99,
      items: [{ name: "VESTIDO CURTO FLORAL PRIMAVERA", quantity: 1, price: 159.99 }],
      shippingAddress: "Av. Brasil, 654 - Salvador, BA",
    },
  ])

  const [filters, setFilters] = useState({
    status: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  })

  const statusOptions = [
    { value: "pending", label: "Pendente", color: "warning" },
    { value: "confirmed", label: "Confirmado", color: "info" },
    { value: "shipped", label: "Enviado", color: "primary" },
    { value: "delivered", label: "Entregue", color: "success" },
    { value: "cancelled", label: "Cancelado", color: "danger" },
  ]

  const paymentMethodOptions = [
    { value: "credit_card", label: "Cartão de Crédito" },
    { value: "pix", label: "PIX" },
    { value: "google_pay", label: "Google Pay" },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = statusOptions.find((s) => s.value === status)
    return statusConfig
      ? { label: statusConfig.label, color: statusConfig.color }
      : { label: status, color: "secondary" }
  }

  const getPaymentMethodLabel = (method) => {
    const paymentConfig = paymentMethodOptions.find((p) => p.value === method)
    return paymentConfig ? paymentConfig.label : method
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = !filters.status || order.status === filters.status
    const matchesPayment = !filters.paymentMethod || order.paymentMethod === filters.paymentMethod
    const matchesSearch =
      !filters.search ||
      order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.id.toString().includes(filters.search)

    const matchesDateFrom = !filters.dateFrom || new Date(order.date) >= new Date(filters.dateFrom)
    const matchesDateTo = !filters.dateTo || new Date(order.date) <= new Date(filters.dateTo)

    return matchesStatus && matchesPayment && matchesSearch && matchesDateFrom && matchesDateTo
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      paymentMethod: "",
      dateFrom: "",
      dateTo: "",
      search: "",
    })
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Pedidos</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Exportar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome, email ou ID..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">Todos</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Pagamento</label>
              <select
                className="form-select"
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={handleFilterChange}
              >
                <option value="">Todos</option>
                {paymentMethodOptions.map((payment) => (
                  <option key={payment.value} value={payment.value}>
                    {payment.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Data Inicial</label>
              <input
                type="date"
                className="form-control"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Data Final</label>
              <input
                type="date"
                className="form-control"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-1 mb-3 d-flex align-items-end">
              <button className="btn btn-outline-secondary" onClick={clearFilters}>
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Pagamento</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status)
                  return (
                    <tr key={order.id}>
                      <td>
                        <strong>#{order.id}</strong>
                      </td>
                      <td>
                        <div>
                          <strong>{order.customerName}</strong>
                          <br />
                          <small className="text-muted">{order.customerEmail}</small>
                        </div>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString("pt-BR")}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className={`btn btn-sm btn-${statusBadge.color} dropdown-toggle`}
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            {statusBadge.label}
                          </button>
                          <ul className="dropdown-menu">
                            {statusOptions.map((status) => (
                              <li key={status.value}>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleStatusChange(order.id, status.value)}
                                >
                                  {status.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td>{getPaymentMethodLabel(order.paymentMethod)}</td>
                      <td>
                        <strong>R$ {order.total.toFixed(2)}</strong>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link to={`/admin/pedidos/${order.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="bi bi-printer"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-cart-x fs-1 text-muted"></i>
              <p className="mt-3">Nenhum pedido encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrderList
