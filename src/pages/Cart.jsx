import { Link } from "react-router"
import { useCart } from "../contexts/CartContext"
import { useState } from "react"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [cep, setCep] = useState("")

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    // Implementar lógica de aplicação de cupom
  }

  const handleCalculateShipping = (e) => {
    e.preventDefault()
    // Implementar lógica de cálculo de frete
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">CARRINHO</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="btn btn-dark">
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">CARRINHO</h1>

      <div className="table-responsive mb-4">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Produto</th>
              <th className="text-center">Valor unit.</th>
              <th className="text-center">Quantidade</th>
              <th className="text-center">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={`${item.id}-${item.size}`}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="cart-item-image me-3"
                      width="80"
                      height="80"
                    />
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="small mb-0">Tamanho: {item.size}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center">R$ {item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control form-control-sm text-center mx-2"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, item.size, Number.parseInt(e.target.value) || 1)}
                      min="1"
                      style={{ width: "50px" }}
                    />
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-center">R$ {(item.price * item.quantity).toFixed(2)}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-link text-danger"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">CUPOM DE DESCONTO</h5>
              <p className="small mb-3">Caso possua um cupom de desconto, digite-o abaixo para obter o desconto.</p>
              <form onSubmit={handleApplyCoupon} className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Código do cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="btn btn-dark">
                  Aplicar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">RESUMO DO PEDIDO</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Descontos</span>
                <span>R$ 0.00</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <span className="me-2">Frete</span>
                  <form onSubmit={handleCalculateShipping} className="d-flex">
                    <input
                      type="text"
                      className="form-control form-control-sm me-1"
                      placeholder="CEP"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      style={{ width: "100px" }}
                    />
                    <button type="submit" className="btn btn-sm btn-dark">
                      OK
                    </button>
                  </form>
                </div>
                <span>R$ 0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>R$ {getCartTotal().toFixed(2)}</strong>
              </div>
              <Link to="/checkout" className="btn btn-dark w-100">
                FINALIZAR COMPRA
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          Continuar comprando
        </Link>
      </div>
    </div>
  )
}

export default Cart
