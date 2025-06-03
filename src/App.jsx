import { Routes, Route } from "react-router"
import Layout from "./components/Layout"
import AdminLayout from "./components/AdminLayout"
import Home from "./pages/Home"
import Conjuntos from "./pages/Conjuntos"
import Vestidos from "./pages/Vestidos"
import Coletes from "./pages/Coletes"
import SobreNos from "./pages/SobreNos"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import SearchResults from "./pages/SearchResults"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import UserAccount from "./pages/UserAccount"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProductList from "./pages/admin/ProductList"
import AdminProductForm from "./pages/admin/ProductForm"
import AdminCouponList from "./pages/admin/CouponList"
import AdminCouponForm from "./pages/admin/CouponForm"
import AdminCategoryList from "./pages/admin/CategoryList"
import AdminCategoryForm from "./pages/admin/CategoryForm"
import AdminOrderList from "./pages/admin/OrderList"
import AdminUserList from "./pages/admin/UserList"

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
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
      </Route>

      {/* Rotas Administrativas */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        {/* Produtos */}
        <Route path="produtos" element={<AdminProductList />} />
        <Route path="produtos/novo" element={<AdminProductForm />} />
        <Route path="produtos/editar/:id" element={<AdminProductForm />} />

        {/* Categorias */}
        <Route path="categorias" element={<AdminCategoryList />} />
        <Route path="categorias/nova" element={<AdminCategoryForm />} />
        <Route path="categorias/editar/:id" element={<AdminCategoryForm />} />

        {/* Cupons */}
        <Route path="cupons" element={<AdminCouponList />} />
        <Route path="cupons/novo" element={<AdminCouponForm />} />
        <Route path="cupons/editar/:id" element={<AdminCouponForm />} />

        {/* Pedidos */}
        <Route path="pedidos" element={<AdminOrderList />} />

        {/* Usuários */}
        <Route path="usuarios" element={<AdminUserList />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
