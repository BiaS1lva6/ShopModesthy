import { Link } from "react-router"
import { useCart } from "../contexts/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="product-card mb-4">
      <Link to={`/produtos/${product.id}`} className="text-decoration-none">
        <div className="product-image mb-3">
        <img  src={product.image} alt={product.name} className="product-image img-fluid" />
        
        </div>
        <h6 className="product-title text-uppercase mb-1">{product.name}</h6>
        <div className="d-flex align-items-center mb-2">
          <span className="product-price me-2">R$ {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="product-original-price text-decoration-line-through text-muted small">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="small text-muted mb-2">10x R${(product.price / 10).toFixed(2)}</div>
      </Link>
      <button className="btn btn-adicionar w-100" onClick={handleAddToCart}>
        ADICIONAR
      </button>
    </div>
  )
}

export default ProductCard