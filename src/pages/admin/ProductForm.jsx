import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import products from "../../data/products"

const AdminProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    inStock: true,
    images: [""],
    sizes: ["P", "M", "G", "GG"],
  })

  const [errors, setErrors] = useState({})

  const categories = ["conjuntos", "vestidos", "coletes", "acessorios"]

  useEffect(() => {
    if (isEditing) {
      const product = products.find((p) => p.id === Number.parseInt(id))
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || "",
          description: "Descrição do produto aqui...",
          inStock: product.inStock,
          images: product.images || [product.image],
          sizes: ["P", "M", "G", "GG"],
        })
      }
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

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }))
  }

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, images: newImages }))
    }
  }

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória"
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Preço deve ser maior que zero"
    }

    if (formData.originalPrice && Number.parseFloat(formData.originalPrice) <= Number.parseFloat(formData.price)) {
      newErrors.originalPrice = "Preço original deve ser maior que o preço atual"
    }

    if (formData.sizes.length === 0) {
      newErrors.sizes = "Selecione pelo menos um tamanho"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Aqui você faria a chamada para sua API
    console.log("Dados do produto:", formData)

    // Simular sucesso
    alert(isEditing ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!")
    navigate("/admin/produtos")
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? "Editar Produto" : "Novo Produto"}</h1>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/produtos")}>
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Informações Básicas</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite o nome do produto"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoria *
                  </label>
                  <select
                    className={`form-select ${errors.category ? "is-invalid" : ""}`}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o produto..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Imagens do Produto</h5>
              </div>
              <div className="card-body">
                {formData.images.map((image, index) => (
                  <div key={index} className="mb-3">
                    <label className="form-label">
                      Imagem {index + 1} {index === 0 && "(Principal)"}
                    </label>
                    <div className="input-group">
                      <input
                        type="url"
                        className="form-control"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="URL da imagem"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeImageField(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-primary" onClick={addImageField}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Adicionar Imagem
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Preços</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Preço Atual *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <input
                      type="number"
                      className={`form-control ${errors.price ? "is-invalid" : ""}`}
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="originalPrice" className="form-label">
                    Preço Original
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <input
                      type="number"
                      className={`form-control ${errors.originalPrice ? "is-invalid" : ""}`}
                      id="originalPrice"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                    />
                    {errors.originalPrice && <div className="invalid-feedback">{errors.originalPrice}</div>}
                  </div>
                  <div className="form-text">Deixe vazio se não houver desconto</div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Tamanhos Disponíveis</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {["PP", "P", "M", "G", "GG", "34", "36", "38", "40", "42", "44", "46"].map((size) => (
                    <div key={size} className="col-6 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onChange={() => handleSizeToggle(size)}
                        />
                        <label className="form-check-label" htmlFor={`size-${size}`}>
                          {size}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.sizes && <div className="text-danger small">{errors.sizes}</div>}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Status</h5>
              </div>
              <div className="card-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    Produto Ativo
                  </label>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>
                {isEditing ? "Atualizar Produto" : "Criar Produto"}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/produtos")}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminProductForm
