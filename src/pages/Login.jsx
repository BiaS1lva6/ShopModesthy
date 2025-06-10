import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obter o redirecionamento da URL, se existir
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({}); // Limpa os erros anteriores

  if (!validateForm()) {
    setIsLoading(false);
    return;
  }

  try {
    // Faz a chamada ao endpoint para validar o login
    const response = await fetch("https://localhost:7122/api/Usuarios", {
      method: "GET",
      headers: {
        accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao conectar ao servidor.");
    }

    const users = await response.json(); // Assume que o endpoint retorna uma lista de usuários

    // Verifica se o email e senha existem na lista de usuários
    const user = users.find(
      (u) => u.email === formData.email && u.senha === formData.password
    );

    if (user) {
      // Usa o AuthContext para armazenar o usuário
      const isLoggedIn = login(user);

      if (isLoggedIn) {
        // Redireciona com base no tipo de usuário
        if (user.tipoUsuario === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    } else {
      setErrors({
        general: "Credenciais inválidas. Por favor, tente novamente.",
      });
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <h1 className="h4 text-center mb-4">Login</h1>

              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Seu e-mail"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Lembrar-me
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none">
                    Esqueceu sua senha?
                  </a>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-2">Ainda não tem uma conta?</p>
                <Link to="/cadastro" className="btn btn-outline-dark">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
