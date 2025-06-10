import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useCart } from "../contexts/CartContext"
import GooglePay from "../img/logoGpay.png"
import Pix from "../img/logoPix.png"
import LogoG from "../img/LogoGoogle.avif"
import Visa from "../img/visa2.png"


const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    email: "",
    phone: "",
    cpf: "",
    // Endereço
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  })

  const [creditCardData, setCreditCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cpf: "",
    installments: "1",
    useCardAddress: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "cep") {
      // Formatar CEP (XXXXX-XXX)
      const formattedCep = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 9)

      setFormData((prev) => ({ ...prev, [name]: formattedCep }))

      // Se o CEP estiver completo (8 dígitos), você pode chamar sua API aqui
      if (formattedCep.replace(/\D/g, "").length === 8) {
        // Aqui você pode chamar sua própria API de CEP
        // Exemplo: checkCepWithYourApi(formattedCep)
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Função de exemplo para quando você implementar sua própria API de CEP
  const checkCepWithYourApi = async (cep) => {
    // Substitua este código pela chamada à sua API
    setIsLoadingCep(true)
    try {
      // const response = await yourApiCall(cep)
      // const data = await response.json()
      // Exemplo de como você preencheria os campos com os dados da sua API
      // setFormData(prev => ({
      //   ...prev,
      //   address: data.logradouro,
      //   neighborhood: data.bairro,
      //   city: data.cidade,
      //   state: data.estado
      // }))
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleCreditCardChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "cardNumber") {
      // Formatar número do cartão (XXXX XXXX XXXX XXXX)
      const formatted = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
      setCreditCardData((prev) => ({ ...prev, [name]: formatted }))
    } else if (name === "cpf") {
      // Formatar CPF (XXX.XXX.XXX-XX)
      const formatted = value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      setCreditCardData((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setCreditCardData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const validateStep1 = () => {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "cpf",
      "cep",
      "address",
      "number",
      "neighborhood",
      "city",
      "state",
    ]
    return requiredFields.every((field) => formData[field].trim() !== "")
  }

  const validateStep2 = () => {
    if (!paymentMethod) return false

    if (paymentMethod === "credit") {
      const requiredCardFields = ["cardNumber", "cardName", "expiryMonth", "expiryYear", "cvv", "cpf"]
      return requiredCardFields.every((field) => creditCardData[field].trim() !== "")
    }

    return true // PIX e Google Pay não precisam de validação adicional
  }

  const handleContinueToPayment = () => {
    if (!validateStep1()) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }
    setActiveStep(2)
  }

  const handleFinishOrder = async () => {
    if (!validateStep2()) {
      alert("Por favor, complete as informações de pagamento.")
      return
    }

    setIsProcessingOrder(true)

    try {
      // Simular processamento do pedido
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Gerar ID do pedido
      const newOrderId = Math.floor(Math.random() * 90000) + 10000

      // Simular dados do pedido para envio à API
      const orderData = {
        id: newOrderId,
        customer: formData,
        items: cart,
        paymentMethod: paymentMethod,
        paymentData: paymentMethod === "credit" ? creditCardData : null,
        total: getCartTotal() + 6.12, // incluindo frete
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // Aqui você faria a chamada real para sua API
      console.log("Dados do pedido:", orderData)

      // Limpar carrinho
      clearCart()

      // Definir pedido como concluído
      setOrderId(newOrderId)
      setOrderCompleted(true)
    } catch (error) {
      console.error("Erro ao processar pedido:", error)
      alert("Erro ao processar pedido. Tente novamente.")
    } finally {
      setIsProcessingOrder(false)
    }
  }

  const handleBackToShopping = () => {
    navigate("/")
  }

  const getCardBrand = (number) => {
    const cleanNumber = number.replace(/\D/g, "")
    if (cleanNumber.startsWith("4")) return "visa"
    if (cleanNumber.startsWith("5")) return "mastercard"
    if (cleanNumber.startsWith("3")) return "amex"
    return "generic"
  }

  // Se o pedido foi finalizado, mostrar tela de sucesso
  if (orderCompleted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow text-center">
              <div className="card-body p-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                </div>

                <h1 className="h3 text-success mb-3">Pedido Finalizado!</h1>

                <p className="lead mb-4">Seu pedido foi realizado com sucesso.</p>

                <div className="bg-light p-3 rounded mb-4">
                  <h5 className="mb-2">Número do Pedido</h5>
                  <h4 className="text-primary mb-0">#{orderId}</h4>
                </div>

                <p className="mb-4">
                  <strong>Acompanhe o seu pedido</strong>
                  <br />
                  Você receberá atualizações por e-mail sobre o status do seu pedido.
                </p>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg" onClick={handleBackToShopping}>
                    Continuar Comprando
                  </button>

                  <Link to="/minha-conta" className="btn btn-outline-primary">
                    Ver Meus Pedidos
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-top">
                  <p className="small text-muted mb-0">
                    Em caso de dúvidas, entre em contato conosco pelo WhatsApp ou e-mail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nome completo *"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="E-mail *"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Telefone *"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CPF *"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <h6 className="mb-3 mt-4">Endereço de Cobrança</h6>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="CEP *"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            maxLength="9"
                            required
                          />
                          {isLoadingCep && (
                            <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Buscando...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p className="small text-muted mt-2">
                          <a
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Não sei meu CEP
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Endereço *"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Número *"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Complemento"
                          name="complement"
                          value={formData.complement}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Bairro *"
                          name="neighborhood"
                          value={formData.neighborhood}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cidade *"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Estado *"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="payment-methods-sidebar">
                      <div
                        className={`payment-method-option ${paymentMethod === "credit" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("credit")}
                      >
                        CARTÃO DE CRÉDITO
                      </div>
                      <div
                        className={`payment-method-option ${paymentMethod === "pix" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("pix")}
                      >
                        PIX
                      </div>
                      <div
                        className={`payment-method-option ${paymentMethod === "googlepay" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("googlepay")}
                      >
                        GOOGLE PAY
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="payment-content">
                      {paymentMethod === "credit" && (
                        <div className="credit-card-form">
                          <div className="mb-3">
                            <label className="form-label">Número Do Cartão</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cardNumber"
                              value={creditCardData.cardNumber}
                              onChange={handleCreditCardChange}
                              placeholder="0000 0000 0000 0000"
                              maxLength="19"
                            />
                            <div className="card-brands mt-2">
                              <img
                                src={Visa}
                                alt="Visa"
                                className="card-brand"
                              />
                              <img
                                src="/placeholder.svg?height=24&width=38&text=AMEX"
                                alt="American Express"
                                className="card-brand"
                              />
                              <img
                                src="/placeholder.svg?height=24&width=38&text=MASTER"
                                alt="Mastercard"
                                className="card-brand"
                              />
                              <img
                                src="/placeholder.svg?height=24&width=38&text=ELO"
                                alt="Elo"
                                className="card-brand"
                              />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Em quantas parcelas deseja pagar?</label>
                            <select
                              className="form-select"
                              name="installments"
                              value={creditCardData.installments}
                              onChange={handleCreditCardChange}
                            >
                              <option value="1">1x de R$ {getCartTotal().toFixed(2)} sem juros</option>
                              <option value="2">2x de R$ {(getCartTotal() / 2).toFixed(2)} sem juros</option>
                              <option value="3">3x de R$ {(getCartTotal() / 3).toFixed(2)} sem juros</option>
                              <option value="6">6x de R$ {(getCartTotal() / 6).toFixed(2)} sem juros</option>
                              <option value="12">12x de R$ {(getCartTotal() / 12).toFixed(2)} sem juros</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Nome Impresso No Cartão</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cardName"
                              value={creditCardData.cardName}
                              onChange={handleCreditCardChange}
                              placeholder="Nome como está no cartão"
                            />
                          </div>

                          <div className="row mb-3">
                            <div className="col-6">
                              <label className="form-label">Validade</label>
                              <div className="row">
                                <div className="col-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="expiryMonth"
                                    value={creditCardData.expiryMonth}
                                    onChange={handleCreditCardChange}
                                    placeholder="Mês"
                                    maxLength="2"
                                  />
                                </div>
                                <div className="col-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="expiryYear"
                                    value={creditCardData.expiryYear}
                                    onChange={handleCreditCardChange}
                                    placeholder="Ano"
                                    maxLength="4"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <label className="form-label">Código De Segurança</label>
                              <input
                                type="text"
                                className="form-control"
                                name="cvv"
                                value={creditCardData.cvv}
                                onChange={handleCreditCardChange}
                                placeholder="CVV"
                                maxLength="4"
                              />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">CPF Do Titular</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cpf"
                              value={creditCardData.cpf}
                              onChange={handleCreditCardChange}
                              placeholder="000.000.000-00"
                              maxLength="14"
                            />
                          </div>

                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="useCardAddress"
                              name="useCardAddress"
                              checked={creditCardData.useCardAddress}
                              onChange={handleCreditCardChange}
                            />
                            <label className="form-check-label" htmlFor="useCardAddress">
                              O Endereço Da Fatura Do Cartão É Rua Edmur Frabetti, 122
                            </label>
                          </div>

                          <div className="text-center">
                            <a href="#" className="text-decoration-none">
                              Pagar usando dois cartões
                            </a>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "pix" && (
                        <div className="pix-payment text-center">
                          <img src={Pix} alt="PIX" className="pix-logo mb-4" />
                          <div className="pix-steps">
                            <div className="row">
                              <div className="col-6">
                                <div className="pix-step">
                                  <div className="step-number-pix">1</div>
                                  <p className="small">Aperte em Finalizar compra para gerar o código QR</p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="pix-step">
                                  <div className="step-number-pix">2</div>
                                  <p className="small">Confirma os dados e realize o pagamento pelo app do seu banco</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "googlepay" && (
                        <div className="googlepay-payment text-center">
                          <img src={GooglePay} alt="Google Pay" className="googlepay-logo mb-4" />
                          <p className="mb-4">Prossiga para efetuar o pagamento através do seu dispositivo.</p>
                          <button className="btn btn-dark btn-lg mb-3">
                            <img src={LogoG} alt="Google" className="me-2 logo-g " />
                            Compre com o G Pay
                          </button>
                          <p className="small text-muted">Parcelamento disponível</p>
                        </div>
                      )}
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
              <button className="btn btn-dark" onClick={handleContinueToPayment}>
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
                <span>Entrega</span>
                <span>R$ 6,12</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>R$ {(getCartTotal() + 6.12).toFixed(2)}</strong>
              </div>
              {activeStep === 2 && paymentMethod && (
                <button className="btn btn-finalizar w-100" onClick={handleFinishOrder} disabled={isProcessingOrder}>
                  {isProcessingOrder ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processando...
                    </>
                  ) : (
                    "FINALIZAR COMPRA"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
