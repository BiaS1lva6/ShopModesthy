import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

const AdminCategoryForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    active: true,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      // Simular carregamento de dados da categoria
      setFormData({
        name: "Conjuntos",
        slug: "conjuntos",
        description: "Conjuntos femininos elegantes e modernos",
        active: true,
      })
    }
  }, [id, isEditing])

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-")
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    // Limpar erro quando campo é editado
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
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
    console.log("Dados da categoria:", formData)

    // Simular sucesso
    alert(isEditing ? "Categoria atualizada com sucesso!" : "Categoria criada com sucesso!")
    navigate("/admin/categorias")
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? "Editar Categoria" : "Nova Categoria"}</h1>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/categorias")}>
          Voltar
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Informações da Categoria</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome da Categoria *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite o nome da categoria"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Slug *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="slug-da-categoria"
                  />
                  {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                  <div className="form-text">
                    O slug é usado na URL da categoria. É gerado automaticamente baseado no nome.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição *
                  </label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva a categoria..."
                  ></textarea>
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-4">
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
                      Categoria Ativa
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/categorias")}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? "Atualizar Categoria" : "Criar Categoria"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCategoryForm
