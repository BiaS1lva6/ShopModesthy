import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import ProductCard from "../components/ProductCard"
import products from "../data/products"

const Products = () => {
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    // Get unique categories
    const uniqueCategories = [...new Set(products.map((product) => product.category))]
    setCategories(uniqueCategories)

    // Check if category is in URL params
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }

    // Filter products
    filterProducts(categoryParam || selectedCategory, priceRange, sortBy)
  }, [searchParams])

  const filterProducts = (category, price, sort) => {
    let filtered = [...products]

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price >= price[0] && product.price <= price[1])

    // Sort products
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // In a real app, you would sort by date
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - no specific sort
        break
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    filterProducts(category, priceRange, sortBy)
  }

  const handlePriceChange = (e) => {
    const newRange = [...priceRange]
    newRange[e.target.dataset.index] = Number(e.target.value)
    setPriceRange(newRange)
    filterProducts(selectedCategory, newRange, sortBy)
  }

  const handleSortChange = (e) => {
    const sort = e.target.value
    setSortBy(sort)
    filterProducts(selectedCategory, priceRange, sort)
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Nossos Produtos</h1>

      <div className="row">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Categorias</h5>
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${!selectedCategory ? "active text-white" : ""}`}
                  onClick={() => handleCategoryChange("")}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`list-group-item list-group-item-action ${selectedCategory === category ? "active text-white" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Preço</h5>
              <div className="mb-3">
                <label htmlFor="minPrice" className="form-label">
                  Min: R$ {priceRange[0]}
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="minPrice"
                  min="0"
                  max="200"
                  step="10"
                  value={priceRange[0]}
                  data-index="0"
                  onChange={handlePriceChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maxPrice" className="form-label">
                  Max: R$ {priceRange[1]}
                </label>
                <input
                  type="range"
                  className="form-range"
                  id="maxPrice"
                  min="0"
                  max="200"
                  step="10"
                  value={priceRange[1]}
                  data-index="1"
                  onChange={handlePriceChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0 text-muted">Mostrando {filteredProducts.length} produtos</p>
            <div className="d-flex align-items-center">
              <label htmlFor="sort" className="me-2 text-nowrap">
                Ordenar por:
              </label>
              <select id="sort" className="form-select form-select-sm" value={sortBy} onChange={handleSortChange}>
                <option value="featured">Destaque</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating">Avaliações</option>
                <option value="newest">Mais Recentes</option>
              </select>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search fs-1 text-muted mb-3"></i>
                <h4>Nenhum produto encontrado</h4>
                <p className="text-muted">Tente ajustar seus filtros para encontrar o que procura.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
