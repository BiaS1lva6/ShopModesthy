import { useState, useEffect } from "react";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  });

  const roleOptions = [
    { value: "client", label: "Cliente" },
    { value: "admin", label: "Administrador" },
  ];

  const statusOptions = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Usuarios", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }

        const data = await response.json();
        setUsers(data); // Atualiza o estado com os usuários retornados
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert("Erro ao buscar usuários. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !filters.search ||
      user.nomeUsuario.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesRole = !filters.role || user.tipoUsuario === filters.role;
    const matchesStatus = !filters.status || user.ativo === (filters.status === "active");

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "",
      status: "",
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Usuários</h1>
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

      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <p className="text-center">Carregando usuários...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Status</th>
                    <th>Registrado em</th>
                    <th>Último Login</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.usuarioId}>
                      <td>{user.nomeUsuario}</td>
                      <td>{user.email}</td>
                      <td>{user.tipoUsuario}</td>
                      <td>{user.ativo ? "Ativo" : "Inativo"}</td>
                      <td>{new Date(user.dataCriacao).toLocaleDateString("pt-BR")}</td>
                      <td>
                        {user.ultimoLogin
                          ? new Date(user.ultimoLogin).toLocaleDateString("pt-BR")
                          : "Nunca"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-4">
              <p>Nenhum usuário encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
