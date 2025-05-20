import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router"
import ProductCard from "../components/ProductCard"
import { searchProducts } from "../data/products"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [viewMode, setViewMode] = useState("grid")
  const query = searchParams.get("q") || ""

  useEffect(() => {
    if (query) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Resultados da pesquisa
          </li>
        </ol>
      </nav>

      <h1 className="mb-3">Resultados da pesquisa</h1>
      <p className="mb-4">
        {results.length} produtos encontrados para "{query}"
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <span className="me-2">Ordenar:</span>
          <select className="form-select form-select-sm" style={{ width: "auto" }}>
            <option>Relevância</option>
            <option>Menor Preço</option>
            <option>Maior Preço</option>
            <option>A-Z</option>
          </select>
        </div>
        <div>
          <button
            className={`btn btn-sm me-1 ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button className={`btn btn-sm ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="row">
          {results.map((product) => (
            <div className="col-6 col-md-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p>Nenhum produto encontrado para sua pesquisa.</p>
          <Link to="/" className="btn btn-dark">
            Voltar para a página inicial
          </Link>
        </div>
      )}
    </div>
  )
}

export default SearchResults
