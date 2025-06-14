import { Link } from "react-router";
import { useState } from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de inscrição na newsletter
    setEmail("");
  };

  return (
    <footer className="footer-bg py-5 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-lg-1 mb-4 mb-lg-0">
            <Link to="/">
              <img src={Logo} alt="Logo" className="img-fluid footer-logo" />
            </Link>
            <p className="small mb-3">
              Sua loja de roupas com as melhores tendências da moda.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 mb-4 mb-lg-0">
            <h6 className="mb-3">INFORMAÇÕES</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/sobre-nos" className="footer-link">
                  Sobre Nós
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="footer-link">
                  Política de Privacidade
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="footer-link">
                  Termos e Condições
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="footer-link">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4 mb-lg-0">
            <h6 className="mb-3">MINHA CONTA</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/carrinho" className="footer-link">
                  Carrinho
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="footer-link">
                  Lista de Desejos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="footer-link">
                  Rastrear Pedido
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="mb-3">PAGAMENTO</h6>
            <div className="row g-2 mb-4">
              <div className="col-3">
                <i className="bi bi-credit-card-2-front-fill fs-3"></i>
              </div>
              <div className="col-3">
                <i className="bi bi-paypal fs-3"></i>
              </div>
              <div className="col-3">
                <i className="bi bi-wallet2 fs-3"></i>
              </div>
              <div className="col-3">
                <i className="bi bi-bank fs-3"></i>
              </div>
            </div>

            <h6 className="mb-3">NEWSLETTER</h6>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-dark" type="submit">
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="small mb-0">© 2025 Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
