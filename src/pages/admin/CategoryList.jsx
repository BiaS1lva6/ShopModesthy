import { useState } from "react"
import { Link } from "react-router"

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Conjuntos",
      slug: "conjuntos",
      description: "Conjuntos femininos elegantes e modernos",
      productCount: 8,
      active: true,
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      name: "Vestidos",
      slug: "vestidos",
      description: "Vestidos para todas as ocasiões",
      productCount: 4,
      active: true,
      createdAt: "2025-01-15",
    },
    {
      id: 3,
      name: "Coletes",
      slug: "coletes",
      description: "Coletes sociais e casuais",
      productCount: 4,
      active: true,
      createdAt: "2025-01-15",
    },
    {
      id: 4,
      name: "Acessórios",
      slug: "acessorios",
      description: "Bolsas, cintos e outros acessórios",
      productCount: 0,
      active: false,
      createdAt: "2025-01-20",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleStatus = (categoryId) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === categoryId ? { ...category, active: !category.active } : category)),
    )
  }

  const handleDelete = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (category.productCount > 0) {
      alert("Não é possível excluir uma categoria que possui produtos associados.")
      return
    }

    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories((prev) => prev.filter((category) => category.id !== categoryId))
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Categorias</h1>
        <Link to="/admin/categorias/nova" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Nova Categoria
        </Link>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Buscar categoria</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome da categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="row">
        {filteredCategories.map((category) => (
          <div key={category.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title">{category.name}</h5>
                  <span className={`badge ${category.active ? "bg-success" : "bg-danger"}`}>
                    {category.active ? "Ativa" : "Inativa"}
                  </span>
                </div>

                <p className="card-text text-muted">{category.description}</p>

                <div className="mb-3">
                  <small className="text-muted">
                    <strong>Slug:</strong> {category.slug}
                  </small>
                  <br />
                  <small className="text-muted">
                    <strong>Produtos:</strong> {category.productCount}
                  </small>
                  <br />
                  <small className="text-muted">
                    <strong>Criada em:</strong> {new Date(category.createdAt).toLocaleDateString("pt-BR")}
                  </small>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group" role="group">
                    <Link to={`/admin/categorias/editar/${category.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(category.id)}
                      disabled={category.productCount > 0}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>

                  <button
                    className={`btn btn-sm ${category.active ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => handleToggleStatus(category.id)}
                  >
                    {category.active ? "Ativa" : "Ativar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-tags fs-1 text-muted"></i>
          <p className="mt-3">Nenhuma categoria encontrada.</p>
        </div>
      )}
    </div>
  )
}

export default AdminCategoryList
