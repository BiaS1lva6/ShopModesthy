import { useState, useEffect } from "react";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Pedidos", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }

        const data = await response.json();
        setOrders(data); // Atualiza o estado com os pedidos retornados
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        alert("Erro ao buscar pedidos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Pedidos</h1>
      </div>

      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <p className="text-center">Carregando pedidos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Número do Pedido</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Pagamento</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.numeroPedido}</td>
                      <td>{order.usuario?.nomeUsuario || "N/A"}</td>
                      <td>{order.usuario?.email || "N/A"}</td>
                      <td>{new Date(order.dataPedido).toLocaleDateString("pt-BR")}</td>
                      <td>{order.statusPedido?.descricao || "Pendente"}</td>
                      <td>{order.formaPagamento?.descricao || "N/A"}</td>
                      <td>R$ {order.valorTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {orders.length === 0 && !isLoading && (
            <div className="text-center py-4">
              <p>Nenhum pedido encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;