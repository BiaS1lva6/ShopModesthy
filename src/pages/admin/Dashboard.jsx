import { useState, useEffect } from "react";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatsAndOrders = async () => {
      try {
        // Fetch total products
        const productsResponse = await fetch("https://localhost:7122/api/Produtos", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        if (!productsResponse.ok) throw new Error("Erro ao buscar produtos");
        const productsData = await productsResponse.json();

        // Fetch total categories
        const categoriesResponse = await fetch("https://localhost:7122/api/Categorias", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        if (!categoriesResponse.ok) throw new Error("Erro ao buscar categorias");
        const categoriesData = await categoriesResponse.json();

        // Fetch orders
        const ordersResponse = await fetch("https://localhost:7122/api/Pedidos", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        if (!ordersResponse.ok) throw new Error("Erro ao buscar pedidos");
        const ordersData = await ordersResponse.json();

        // Calculate total revenue
        const totalRevenue = ordersData.reduce((sum, order) => sum + order.valorTotal, 0);

        // Update stats and orders
        setStats({
          totalProducts: productsData.length,
          totalCategories: categoriesData.length,
          totalOrders: ordersData.length,
          totalRevenue: totalRevenue,
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao carregar dados. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatsAndOrders();
  }, []);

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h1 className="h3 mb-2 mb-md-0">Painel Administrativo</h1>
        <span className="badge bg-primary fs-6">Administrador</span>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {/* Cards de Estatísticas */}
          <div className="row mb-4">
            <div className="col-6 col-md-3 mb-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Produtos</h5>
                  <p className="card-text fs-4">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Categorias</h5>
                  <p className="card-text fs-4">{stats.totalCategories}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="card bg-warning text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Pedidos</h5>
                  <p className="card-text fs-4">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="card bg-danger text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">Receita Total</h5>
                  <p className="card-text fs-4">R$ {stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu de Ações Rápidas */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">Gerenciamento de Produtos</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/produtos" className="btn btn-outline-primary">
                      <i className="bi bi-box-seam me-2"></i>
                      Ver Todos os Produtos
                    </Link>
                    <Link to="/admin/produtos/novo" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Adicionar Novo Produto
                    </Link>
                    <Link to="/admin/categorias" className="btn btn-outline-secondary">
                      <i className="bi bi-tags me-2"></i>
                      Gerenciar Categorias
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">Vendas e Promoções</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/admin/pedidos" className="btn btn-outline-info">
                      <i className="bi bi-cart-check me-2"></i>
                      Ver Pedidos
                    </Link>
                    <Link to="/admin/cupons" className="btn btn-outline-success">
                      <i className="bi bi-ticket-perforated me-2"></i>
                      Gerenciar Cupons
                    </Link>
                    <Link to="/admin/cupons/novo" className="btn btn-success">
                      <i className="bi bi-plus-circle me-2"></i>
                      Criar Novo Cupom
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Últimos Pedidos */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Últimos Pedidos</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="d-none d-md-table-header-group">
                    <tr>
                      <th>Pedido</th>
                      <th>Cliente</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td data-label="Pedido">
                          <strong>#{order.id}</strong>
                        </td>
                        <td data-label="Cliente">{order.cliente || "N/A"}</td>
                        <td data-label="Data">{new Date(order.dataPedido).toLocaleDateString("pt-BR")}</td>
                        <td data-label="Status">
                          <span className={`badge bg-${order.status === "Pendente" ? "warning" : "success"}`}>
                            {order.status}
                          </span>
                        </td>
                        <td data-label="Total">
                          <strong>R$ {order.valorTotal.toFixed(2)}</strong>
                        </td>
                        <td data-label="Ações">
                          <button className="btn btn-sm btn-outline-primary">Ver</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
