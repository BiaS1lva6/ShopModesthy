import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const UserAccount = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  // Dados simulados de pedidos
  const orders = [
    {
      id: "12345",
      date: "15/05/2025",
      status: "Entregue",
      total: 219.99,
      items: [{ name: "CONJUNTO COMPLETO SOCIAL GIRL PRETO", quantity: 1, price: 219.99 }],
    },
    {
      id: "12346",
      date: "02/04/2025",
      status: "Entregue",
      total: 359.98,
      items: [
        { name: "VESTIDO MIDI PRETO ELEGANCE", quantity: 1, price: 199.99 },
        { name: "COLETE SOCIAL FEMININO BRANCO", quantity: 1, price: 159.99 },
      ],
    },
  ]

  // Dados simulados do usuário
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "11 99999-9999",
    address: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar os dados do usuário
    setIsEditing(false)
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Minha Conta</h1>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="avatar-placeholder mb-3">
                  <i className="bi bi-person-circle fs-1"></i>
                </div>
                <h5 className="mb-1">{user?.name}</h5>
                <p className="text-muted small mb-0">{user?.email}</p>
              </div>

              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person me-2"></i>
                  Meus Dados
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="bi bi-bag me-2"></i>
                  Meus Pedidos
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "favorites" ? "active" : ""}`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <i className="bi bi-heart me-2"></i>
                  Favoritos
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "addresses" ? "active" : ""}`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <i className="bi bi-geo-alt me-2"></i>
                  Endereços
                </button>
                <button className="list-group-item list-group-item-action text-danger" onClick={logout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {activeTab === "profile" && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title mb-0">Meus Dados</h5>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancelar" : "Editar"}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label htmlFor="name" className="form-label">
                            Nome completo
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label">
                            E-mail
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label htmlFor="phone" className="form-label">
                            Telefone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="zipCode" className="form-label">
                            CEP
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                            name="zipCode"
                            value={userData.zipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Endereço
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label htmlFor="city" className="form-label">
                            Cidade
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="state" className="form-label">
                            Estado
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={userData.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-dark">
                          Salvar Alterações
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <h6 className="text-muted mb-1">Nome completo</h6>
                          <p>{userData.name}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-muted mb-1">E-mail</h6>
                          <p>{userData.email}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <h6 className="text-muted mb-1">Telefone</h6>
                          <p>{userData.phone}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-muted mb-1">CEP</h6>
                          <p>{userData.zipCode}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="text-muted mb-1">Endereço</h6>
                        <p>{userData.address}</p>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <h6 className="text-muted mb-1">Cidade</h6>
                          <p>{userData.city}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-muted mb-1">Estado</h6>
                          <p>{userData.state}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === "orders" && (
                <>
                  <h5 className="card-title mb-4">Meus Pedidos</h5>

                  {orders.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td>#{order.id}</td>
                              <td>{order.date}</td>
                              <td>
                                <span className="badge bg-success">{order.status}</span>
                              </td>
                              <td>R$ {order.total.toFixed(2)}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-dark">Detalhes</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-bag-x fs-1 text-muted"></i>
                      <p className="mt-3">Você ainda não realizou nenhum pedido.</p>
                    </div>
                  )}
                </>
              )}

              {activeTab === "favorites" && (
                <>
                  <h5 className="card-title mb-4">Meus Favoritos</h5>

                  <div className="text-center py-5">
                    <i className="bi bi-heart fs-1 text-muted"></i>
                    <p className="mt-3">Você ainda não adicionou nenhum produto aos favoritos.</p>
                    <a href="/" className="btn btn-outline-dark mt-2">
                      Explorar produtos
                    </a>
                  </div>
                </>
              )}

              {activeTab === "addresses" && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title mb-0">Meus Endereços</h5>
                    <button className="btn btn-sm btn-outline-dark">
                      <i className="bi bi-plus-lg me-1"></i>
                      Adicionar
                    </button>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-subtitle">Endereço Principal</h6>
                        <span className="badge bg-dark">Principal</span>
                      </div>
                      <p className="card-text mb-1">{userData.address}</p>
                      <p className="card-text mb-1">
                        {userData.city}, {userData.state} - {userData.zipCode}
                      </p>
                      <p className="card-text mb-3">Brasil</p>
                      <div className="d-flex">
                        <button className="btn btn-sm btn-outline-dark me-2">Editar</button>
                        <button className="btn btn-sm btn-outline-danger">Remover</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccount
