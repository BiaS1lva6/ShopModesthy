import { Link } from "react-router"

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Página não encontrada</h1>
      <p className="mb-4">A página que você está procurando não existe ou foi removida.</p>
      <Link to="/" className="btn btn-dark">
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default NotFound
