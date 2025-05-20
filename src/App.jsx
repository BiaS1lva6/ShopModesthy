
import { Routes, Route } from "react-router"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Conjuntos from "./pages/Conjuntos"
import Vestidos from "./pages/Vestidos"
import Coletes from "./pages/Coletes"
import SobreNos from "./pages/SobreNos"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import ProtectedRoute from "./components/ProtectedRoute"
import Checkout from "./pages/Checkout"
import SearchResults from "./pages/SearchResults"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserAccount from "./pages/UserAccount"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="conjuntos" element={<Conjuntos />} />
        <Route path="vestidos" element={<Vestidos />} />
        <Route path="coletes" element={<Coletes />} />
        <Route path="sobre-nos" element={<SobreNos />} />
        <Route path="produtos/:id" element={<ProductDetail />} />
        <Route path="carrinho" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="pesquisa" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Register />} />
        <Route
          path="minha-conta"
          element={
            <ProtectedRoute>
              <UserAccount />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App