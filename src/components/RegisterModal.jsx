import { useState } from "react"

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementar lógica de cadastro
    console.log("Cadastro:", formData)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="register-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Cadastrar</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Cadastrar
          </button>

          <div className="text-center mt-3">
            <span>Já tem uma conta? </span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Entre
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal