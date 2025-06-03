import { useState } from "react"

const AdminUserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      role: "client",
      status: "active",
      registeredAt: "2025-01-15",
      lastLogin: "2025-05-28",
      totalOrders: 5,
      totalSpent: 1299.95,
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      role: "client",
      status: "active",
      registeredAt: "2025-02-10",
      lastLogin: "2025-05-27",
      totalOrders: 3,
      totalSpent: 679.97,
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@email.com",
      role: "client",
      status: "active",
      registeredAt: "2025-03-05",
      lastLogin: "2025-05-26",
      totalOrders: 8,
      totalSpent: 2199.92,
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      role: "client",
      status: "inactive",
      registeredAt: "2025-01-20",
      lastLogin: "2025-04-15",
      totalOrders: 1,
      totalSpent: 219.99,
    },
    {
      id: 5,
      name: "Administrador",
      email: "admin@modestyruby.com",
      role: "admin",
      status: "active",
      registeredAt: "2025-01-01",
      lastLogin: "2025-05-28",
      totalOrders: 0,
      totalSpent: 0,
    },
  ])

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  })

  const roleOptions = [
    { value: "client", label: "Cliente" },
    { value: "admin", label: "Administrador" },
  ]

  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !filters.search ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase())

    const matchesRole = !filters.role || user.role === filters.role
    const matchesStatus = !filters.status || user.status === filters.status

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusToggle = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const handleRoleChange = (userId, newRole) => {
    if (
      window.confirm(
        `Tem certeza que deseja alterar o papel deste usuário para ${newRole === "admin" ? "Administrador" : "Cliente"}?`,
      )
    ) {
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "",
      status: "",
    })
  }

  const getRoleBadge = (role) => {
    return role === "admin" ? { label: "Administrador", color: "danger" } : { label: "Cliente", color: "primary" }
  }

  const getStatusBadge = (status) => {
    return status === "active" ? { label: "Ativo", color: "success" } : { label: "Inativo", color: "secondary" }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Usuários</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Exportar
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.length}</h4>
                  <p className="mb-0">Total de Usuários</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-people fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter((u) => u.status === "active").length}</h4>
                  <p className="mb-0">Usuários Ativos</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-person-check fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter((u) => u.role === "client").length}</h4>
                  <p className="mb-0">Clientes</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-person fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter((u) => u.role === "admin").length}</h4>
                  <p className="mb-0">Administradores</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-shield-check fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Buscar usuário</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome ou email..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Papel</label>
              <select className="form-select" name="role" value={filters.role} onChange={handleFilterChange}>
                <option value="">Todos</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
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
            <div className="col-md-2 mb-3 d-flex align-items-end">
              <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>
                <i className="bi bi-x-circle me-2"></i>
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Papel</th>
                  <th>Status</th>
                  <th>Cadastro</th>
                  <th>Último Login</th>
                  <th>Pedidos</th>
                  <th>Total Gasto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role)
                  const statusBadge = getStatusBadge(user.status)

                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-placeholder me-3">
                            <i className="bi bi-person-circle fs-4"></i>
                          </div>
                          <div>
                            <strong>{user.name}</strong>
                            <br />
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button
                            className={`btn btn-sm btn-${roleBadge.color} dropdown-toggle`}
                            type="button"
                            data-bs-toggle="dropdown"
                            disabled={user.email === "admin@modestyruby.com"}
                          >
                            {roleBadge.label}
                          </button>
                          <ul className="dropdown-menu">
                            {roleOptions.map((role) => (
                              <li key={role.value}>
                                <button className="dropdown-item" onClick={() => handleRoleChange(user.id, role.value)}>
                                  {role.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${statusBadge.color}`}>{statusBadge.label}</span>
                      </td>
                      <td>{new Date(user.registeredAt).toLocaleDateString("pt-BR")}</td>
                      <td>{new Date(user.lastLogin).toLocaleDateString("pt-BR")}</td>
                      <td>
                        <span className="badge bg-info">{user.totalOrders}</span>
                      </td>
                      <td>
                        <strong>R$ {user.totalSpent.toFixed(2)}</strong>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${user.status === "active" ? "btn-outline-warning" : "btn-outline-success"}`}
                            onClick={() => handleStatusToggle(user.id)}
                            disabled={user.email === "admin@modestyruby.com"}
                          >
                            <i className={`bi ${user.status === "active" ? "bi-pause" : "bi-play"}`}></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-people fs-1 text-muted"></i>
              <p className="mt-3">Nenhum usuário encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminUserList
