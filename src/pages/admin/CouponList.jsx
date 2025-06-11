import { useState, useEffect } from "react";
import { Link } from "react-router";

const AdminCouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/CupomDescontos", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar cupons");
        }

        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Erro ao carregar cupons:", error);
        alert("Erro ao carregar cupons. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (couponId) => {
    if (window.confirm("Tem certeza que deseja excluir este cupom?")) {
      try {
        const response = await fetch(`https://localhost:7122/api/CupomDescontos/${couponId}`, {
          method: 'DELETE',
          headers: {
            'accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir o cupom");
        }

        // Atualiza a lista de cupons localmente após a exclusão
        setCoupons((prev) => prev.filter((coupon) => coupon.cupomId !== couponId));
        alert("Cupom excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir o cupom:", error);
        alert("Erro ao excluir o cupom. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gerenciar Cupons</h1>
        <Link to="/admin/cupons/novo" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Novo Cupom
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <p className="text-center">Carregando cupons...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Desconto</th>
                    <th>Limite de Uso</th>
                    <th>Validade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.cupomId}>
                      <td>{coupon.nome}</td>
                      <td>{coupon.desconto}%</td>
                      <td>
                        {coupon.limiteUso ? coupon.limiteUso : "Sem limite"}
                      </td>
                      <td>
                        {coupon.dataValidade
                          ? new Date(coupon.dataValidade).toLocaleDateString("pt-BR")
                          : "Sem validade"}
                      </td>
                      <td>
                        <div className="btn-group">
                          <Link
                            to={`/admin/cupons/editar/${coupon.cupomId}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(coupon.cupomId)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {coupons.length === 0 && !isLoading && (
            <div className="text-center py-4">
              <p>Nenhum cupom encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCouponList;
