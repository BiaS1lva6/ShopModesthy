import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { useCart } from "../contexts/CartContext"
import { getProductById } from "../data/products"

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("P")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize)
    }
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/produtos">Produtos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="product-image-container mb-3">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="img-fluid" />
          </div>
          <div className="row">
            {[...Array(4)].map((_, index) => (
              <div className="col-3" key={index}>
                <div className="product-thumbnail">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="h2 mb-3">{product.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <h3 className="product-price me-2">R$ {product.price.toFixed(2)}</h3>
            {product.originalPrice && (
              <span className="product-original-price text-decoration-line-through text-muted">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="mb-4">10x R${(product.price / 10).toFixed(2)} sem juros</p>

          <div className="mb-4">
            <h6 className="mb-2">Tamanho</h6>
            <div className="d-flex flex-wrap gap-2">
              {["P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-2">Quantidade</h6>
            <div className="quantity-selector d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center mx-2"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                min="1"
                style={{ width: "60px" }}
              />
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <button className="btn btn-adicionar-carrinho w-100 mb-3" onClick={handleAddToCart}>
            ADICIONAR AO CARRINHO
          </button>

          <div className="mt-4">
            <h6 className="mb-2">Descrição</h6>
            <p>
              Descrição detalhada do produto. Este é um produto de alta qualidade, feito com os melhores materiais e com
              atenção aos detalhes.
            </p>
          </div>

          <div className="mt-4">
            <h6 className="mb-2">Detalhes</h6>
            <ul className="list-unstyled">
              <li>Material: 100% Algodão</li>
              <li>Cor: Conforme imagem</li>
              <li>Lavagem: Lavar à mão</li>
              <li>Origem: Nacional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
