import { useState } from "react"
import { Link } from "react-router"
import { useCart } from "../contexts/CartContext"

const Checkout = () => {
  const { cart, getCartTotal } = useCart()
  const [activeStep, setActiveStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState(null)

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">CHECKOUT</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="btn btn-dark">
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">CHECKOUT</h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className={`step-number ${activeStep >= 1 ? "active" : ""}`}>1</div>
                <h5 className="mb-0 ms-2">INFORMAÇÕES DO CLIENTE</h5>
              </div>

              {activeStep === 1 && (
                <>
                  <div className="mb-4">
                    <h6 className="mb-3">Já Tenho Cadastro</h6>
                    <p className="small mb-3">Informe seu e-mail e senha para realizar o login.</p>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="email" className="form-control" placeholder="E-mail" />
                      </div>
                      <div className="col-md-6">
                        <input type="password" className="form-control" placeholder="Senha" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="mb-3">Minha Primeira Compra</h6>
                    <p className="small mb-3">Preencha os campos abaixo para concluir sua compra.</p>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="text" className="form-control" placeholder="Nome completo *" required />
                      </div>
                      <div className="col-md-6">
                        <input type="email" className="form-control" placeholder="E-mail *" required />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="tel" className="form-control" placeholder="Telefone *" required />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="CPF *" required />
                      </div>
                    </div>

                    <h6 className="mb-3 mt-4">Endereço de Cobrança</h6>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="text" className="form-control" placeholder="CEP *" required />
                      </div>
                      <div className="col-md-6">
                        <p className="small text-muted mt-2">Não sei meu CEP</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Endereço *" required />
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="text" className="form-control" placeholder="Número *" required />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Complemento" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input type="text" className="form-control" placeholder="Bairro *" required />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Cidade *" required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Estado *" required />
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="termsCheck" />
                      <label className="form-check-label small" htmlFor="termsCheck">
                        Aceito os termos e condições e a política de privacidade.
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className={`step-number ${activeStep >= 2 ? "active" : ""}`}>2</div>
                <h5 className="mb-0 ms-2">FORMA DE PAGAMENTO</h5>
              </div>

              {activeStep === 2 && (
                <div>
                  <p className="mb-3">Escolha a forma de pagamento:</p>
                  <div className="row">
                    <div className="col-3">
                      <div
                        className={`payment-option ${paymentMethod === "credit" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("credit")}
                      >
                        <img
                          src="../img/master.png"
                          alt="Cartão de Crédito"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div
                        className={`payment-option ${paymentMethod === "boleto" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("boleto")}
                      >
                        <img
                          src="../img/boleto2.png"
                          alt="Boleto Bancário"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div
                        className={`payment-option ${paymentMethod === "pix" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("pix")}
                      >
                        <img
                          src="../img/pix4.png"
                          alt="PIX"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <div
                        className={`payment-option ${paymentMethod === "bank" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <img src="../img/visa2.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/carrinho" className="btn btn-outline-secondary">
              Voltar ao carrinho
            </Link>
            {activeStep === 1 ? (
              <button className="btn btn-dark" onClick={() => setActiveStep(2)}>
                Continuar
              </button>
            ) : (
              <button className="btn btn-dark" onClick={() => setActiveStep(1)}>
                Voltar
              </button>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumo do Pedido</h5>
              {cart.map((item) => (
                <div className="d-flex justify-content-between mb-2" key={`${item.id}-${item.size}`}>
                  <div>
                    <p className="mb-0">
                      {item.name} x {item.quantity}
                    </p>
                  </div>
                  <p className="mb-0">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Descontos</span>
                <span>R$ 0.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Frete</span>
                <span>R$ 0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>R$ {getCartTotal().toFixed(2)}</strong>
              </div>
              {activeStep === 2 && <button className="btn btn-dark w-100 mt-3">FINALIZAR PEDIDO</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
