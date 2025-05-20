import { Link } from "react-router"
import Carousel from "../components/Carousel"
import ProductCard from "../components/ProductCard"
import products from "../data/products"

const Home = () => {
  const newArrivals = products.slice(0, 4)
  const featuredProducts = products.slice(4, 12)

  return (
    <div>
      <Carousel />

      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 text-center">
            <div className="mb-4">
              <i className="bi bi-truck fs-4"></i>
              <h6 className="mt-2">ENTREGA RÁPIDA PARA TODO BRASIL</h6>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mb-4">
              <i className="bi bi-shield-check fs-4"></i>
              <h6 className="mt-2">PAGAMENTO 100% SEGURO</h6>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mb-4">
              <i className="bi bi-arrow-repeat fs-4"></i>
              <h6 className="mt-2">TROCA GARANTIDA EM 7 DIAS</h6>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="mb-4">
              <i className="bi bi-headset fs-4"></i>
              <h6 className="mt-2">ATENDIMENTO PERSONALIZADO</h6>
            </div>
          </div>
        </div>

        <section className="mb-5">
          <h4 className="mb-4">NOVIDADES</h4>
          <div className="row">
            {newArrivals.map((product) => (
              <div className="col-6 col-md-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="mb-4">NOSSOS ITENS</h4>
          <div className="row">
            {featuredProducts.map((product) => (
              <div className="col-6 col-md-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/produtos" className="btn btn-ver-mais">
              VER MAIS
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
