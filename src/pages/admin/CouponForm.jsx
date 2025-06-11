import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

const AdminCouponForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minimumValue: "",
    validFrom: "",
    validTo: "",
    usageLimit: "",
    active: true,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      // Simular carregamento de dados do cupom
      setFormData({
        code: "DESCONTO10",
        description: "10% de desconto em toda loja",
        discountType: "percentage",
        discountValue: "10",
        minimumValue: "50",
        validFrom: "2025-05-01",
        validTo: "2025-06-30",
        usageLimit: "100",
        active: true,
      })
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Limpar erro quando campo é editado
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.code.trim()) {
      newErrors.code = "Código é obrigatório"
    } else if (formData.code.length < 3) {
      newErrors.code = "Código deve ter pelo menos 3 caracteres"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    if (!formData.discountValue || Number.parseFloat(formData.discountValue) <= 0) {
      newErrors.discountValue = "Valor do desconto deve ser maior que zero"
    }

    if (formData.discountType === "percentage" && Number.parseFloat(formData.discountValue) > 100) {
      newErrors.discountValue = "Percentual não pode ser maior que 100%"
    }

    if (!formData.minimumValue || Number.parseFloat(formData.minimumValue) < 0) {
      newErrors.minimumValue = "Valor mínimo deve ser maior ou igual a zero"
    }

    if (!formData.validFrom) {
      newErrors.validFrom = "Data de início é obrigatória"
    }

    if (!formData.validTo) {
      newErrors.validTo = "Data de fim é obrigatória"
    }

    if (formData.validFrom && formData.validTo && new Date(formData.validFrom) >= new Date(formData.validTo)) {
      newErrors.validTo = "Data de fim deve ser posterior à data de início"
    }

    if (!formData.usageLimit || Number.parseInt(formData.usageLimit) <= 0) {
      newErrors.usageLimit = "Limite de uso deve ser maior que zero"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('https://localhost:7122/api/CupomDescontos', {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.name, // Nome do cupom
          desconto: parseInt(formData.discount, 10), // Valor do desconto
          dataValidade: formData.validTo ? new Date(formData.validTo).toISOString() : null, // Data de validade no formato ISO 8601
          ativo: formData.active === true, // Status ativo (booleano)
          dataCriacao: new Date().toISOString(), // Data de criação no formato ISO 8601
          limiteUso: formData.usageLimit ? parseInt(formData.usageLimit, 10) : null, // Limite de uso
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o cupom');
      }

      const result = await response.json();
      console.log('Cupom criado:', result);

      alert('Cupom criado com sucesso!');
      navigate('/admin/cupons');
    } catch (error) {
      console.error('Erro ao criar o cupom:', error);
      alert('Erro ao criar o cupom. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? "Editar Cupom" : "Novo Cupom"}</h1>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/cupons")}>
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Informações do Cupom</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="code" className="form-label">
                      Código do Cupom *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.code ? "is-invalid" : ""}`}
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Ex: DESCONTO10"
                      style={{ textTransform: "uppercase" }}
                    />
                    {errors.code && <div className="invalid-feedback">{errors.code}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="discountType" className="form-label">
                      Tipo de Desconto *
                    </label>
                    <select
                      className="form-select"
                      id="discountType"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleChange}
                    >
                      <option value="percentage">Percentual (%)</option>
                      <option value="fixed">Valor Fixo (R$)</option>
                      <option value="shipping">Frete Grátis</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o cupom de desconto"
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="discountValue" className="form-label">
                      Valor do Desconto *{formData.discountType === "percentage" && " (%)"}
                      {formData.discountType === "fixed" && " (R$)"}
                    </label>
                    <div className="input-group">
                      {formData.discountType === "fixed" && <span className="input-group-text">R$</span>}
                      <input
                        type="number"
                        className={`form-control ${errors.discountValue ? "is-invalid" : ""}`}
                        id="discountValue"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        disabled={formData.discountType === "shipping"}
                      />
                      {formData.discountType === "percentage" && <span className="input-group-text">%</span>}
                      {errors.discountValue && <div className="invalid-feedback">{errors.discountValue}</div>}
                    </div>
                    {formData.discountType === "shipping" && (
                      <div className="form-text">Frete grátis não requer valor</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="minimumValue" className="form-label">
                      Valor Mínimo da Compra *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">R$</span>
                      <input
                        type="number"
                        className={`form-control ${errors.minimumValue ? "is-invalid" : ""}`}
                        id="minimumValue"
                        name="minimumValue"
                        value={formData.minimumValue}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                      />
                      {errors.minimumValue && <div className="invalid-feedback">{errors.minimumValue}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Período de Validade</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="validFrom" className="form-label">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.validFrom ? "is-invalid" : ""}`}
                    id="validFrom"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleChange}
                  />
                  {errors.validFrom && <div className="invalid-feedback">{errors.validFrom}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="validTo" className="form-label">
                    Data de Fim *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.validTo ? "is-invalid" : ""}`}
                    id="validTo"
                    name="validTo"
                    value={formData.validTo}
                    onChange={handleChange}
                  />
                  {errors.validTo && <div className="invalid-feedback">{errors.validTo}</div>}
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Limite de Uso</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="usageLimit" className="form-label">
                    Número Máximo de Usos *
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.usageLimit ? "is-invalid" : ""}`}
                    id="usageLimit"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    min="1"
                  />
                  {errors.usageLimit && <div className="invalid-feedback">{errors.usageLimit}</div>}
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="active">
                    Cupom Ativo
                  </label>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>
                {isEditing ? "Atualizar Cupom" : "Criar Cupom"}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/cupons")}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminCouponForm
