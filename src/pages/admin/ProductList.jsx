import { useState } from "react"
import { Link } from "react-router"
import products from "../../data/products"

const AdminProductList = () => {
  const [productList, setProductList] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = [...new Set(products.map((product) => product.category))]

  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProductList((prev) => prev.filter((product) => product.id !== productId))
    }
  }

  const toggleStatus = (productId) => {
    setProductList((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, inStock: !product.inStock } : product)),
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Produtos</h1>
        <Link to="/admin/produtos/novo" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Novo Produto
        </Link>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label">Buscar produto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome do produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Categoria</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image || "/placeholder.svg?height=50&width=50"}
                        alt={product.name}
                        width="50"
                        height="50"
                        className="rounded"
                      />
                    </td>
                    <td>
                      <div>
                        <strong>{product.name}</strong>
                        <br />
                        <small className="text-muted">ID: {product.id}</small>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div>
                        <strong>R$ {product.price.toFixed(2)}</strong>
                        {product.originalPrice && (
                          <div>
                            <small className="text-muted text-decoration-line-through">
                              R$ {product.originalPrice.toFixed(2)}
                            </small>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${product.inStock ? "btn-success" : "btn-danger"}`}
                        onClick={() => toggleStatus(product.id)}
                      >
                        {product.inStock ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link to={`/admin/produtos/editar/${product.id}`} className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-4">
              <p>Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProductList
