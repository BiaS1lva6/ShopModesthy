import { useState } from "react"
import { Link } from "react-router"
import ProductCard from "../components/ProductCard"
import FilterSidebar from "../components/FilterSidebar"
import { getProductsByCategory } from "../data/products"

const Vestidos = () => {
  const [viewMode, setViewMode] = useState("grid")
  const products = getProductsByCategory("vestidos")

  const priceRanges = [
    "Até R$ 50,00",
    "R$ 50,00 - R$ 100,00",
    "R$ 100,00 - R$ 200,00",
    "R$ 200,00 - R$ 400,00",
    "Acima de R$ 400,00",
  ]

  const sizes = ["40", "34", "36", "38", "42", "44", "46", "G", "GG", "P", "M", "PP"]

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            VESTIDOS
          </li>
        </ol>
      </nav>

      <h1 className="mb-4">VESTIDOS</h1>

      <div className="row">
        <div className="col-lg-3">
          <FilterSidebar priceRanges={priceRanges} sizes={sizes} />
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <span className="me-2">Ordenar:</span>
              <select className="form-select form-select-sm" style={{ width: "auto" }}>
                <option>Mais Recentes</option>
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
              <button
                className={`btn btn-sm ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <i className="bi bi-list"></i>
              </button>
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <div className="col-6 col-md-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vestidos
