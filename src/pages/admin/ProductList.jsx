import { useState, useEffect } from "react";
import { Link } from "react-router";

const AdminProductList = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Produtos", {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      });

        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();
        setProductList(data); // Atualiza o estado com os produtos retornados
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao buscar produtos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.categoria?.nome === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as Categorias</option>
                {[...new Set(productList.map((product) => product.categoria?.nome))].map((category) => (
                  <option key={category} value={category}>
                    {category}
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
          {isLoading ? (
            <p className="text-center">Carregando produtos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Destaque</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.produtoId}>
                      <td>{product.nome}</td>
                      <td>{product.categoria?.nome || "Sem Categoria"}</td>
                      <td>R$ {product.preco.toFixed(2)}</td>
                      <td>{product.estoque}</td>
                      <td>{product.destaque ? "Sim" : "Não"}</td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/admin/produtos/editar/${product.produtoId}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => alert("Excluir produto não implementado")}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-4">
              <p>Nenhum produto encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;