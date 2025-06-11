import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0); // Estado para armazenar o valor do frete
  const [discount, setDiscount] = useState(0); // Estado para armazenar o desconto aplicado

  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:7122/api/CupomDescontos/GetByName?nome=${couponCode}`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Cupom inválido ou expirado.");
      }

      // Leia o corpo da resposta como JSON
      const data = await response.json();
      console.log("Response data:", data);

      // Calcula o desconto como percentual
      const discountPercentage = data.desconto; // Exemplo: 15 para 15%
      const cartTotal = getCartTotal();
      const discountValue = (cartTotal * discountPercentage) / 100;

      alert(
        `Cupom aplicado! Desconto de ${discountPercentage}%: R$ ${discountValue.toFixed(
          2
        )}`
      );

      // Atualiza o estado do desconto
      setDiscount(discountValue);
    } catch (error) {
      console.error("Erro ao aplicar o cupom:", error);
      alert("Não foi possível aplicar o cupom. Tente novamente.");
    }
  };

  const handleCalculateShipping = async (e) => {
    e.preventDefault();

    const valorTotal = getCartTotal() - discount; // Subtotal menos o desconto aplicado

    // Monta o objeto de requisição para a API
    const freteRequest = {
      valorTotal,
    };

    console.log("Frete Request:", freteRequest);

    try {
      // Faz a chamada para a API de frete
      const response = await fetch(
        "https://localhost:7122/api/Fretes/CalcularFrete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
          },
          body: JSON.stringify(freteRequest),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Erro ao calcular frete");
      }

      // Processa a resposta da API
      const data = await response.json();
      console.log("Response data:", data);

      // Atualiza o estado com os dados do frete retornados pela API
      setFrete(data.valor); // Atualiza o valor do frete
    } catch (error) {
      console.error("Erro ao calcular frete:", error.message);
      alert(`Erro ao calcular frete: ${error.message}`);
    }
  };

  // Verifica se o carrinho está vazio
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">CARRINHO</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="btn btn-dark">
          Continuar Comprando
        </Link>
      </div>
    );
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
                      className="cart-item-image me-3 img-fluid"
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
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-center">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleApplyCoupon} className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Código do cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="submit" className="btn btn-dark">
              Aplicar Cupom
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleCalculateShipping} className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <button type="submit" className="btn btn-dark">
              Calcular Frete
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">RESUMO DO PEDIDO</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>R$ {getCartTotal().toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Descontos</span>
            <span>R$ {discount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Frete</span>
            <span>R$ {(frete || 0).toFixed(2)}</span>{" "}
            {/* Exibe o valor do frete */}
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <strong>Total</strong>
            <strong>
              R$ {(getCartTotal() - discount + (frete || 0)).toFixed(2)}
            </strong>{" "}
            {/* Soma o frete ao total */}
          </div>
          <Link to="/checkout" className="btn btn-dark w-100">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
