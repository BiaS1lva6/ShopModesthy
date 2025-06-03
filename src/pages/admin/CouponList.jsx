import { useState } from "react"
import { Link } from "react-router"

const AdminCouponList = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "DESCONTO10",
      description: "10% de desconto em toda loja",
      discountType: "percentage",
      discountValue: 10,
      minimumValue: 50,
      validFrom: "2025-05-01",
      validTo: "2025-06-30",
      usageLimit: 100,
      usedCount: 25,
      active: true,
    },
    {
      id: 2,
      code: "FRETEGRATIS",
      description: "Frete grátis para compras acima de R$ 100",
      discountType: "shipping",
      discountValue: 0,
      minimumValue: 100,
      validFrom: "2025-05-15",
      validTo: "2025-07-15",
      usageLimit: 200,
      usedCount: 45,
      active: true,
    },
    {
      id: 3,
      code: "PRIMEIRAVEZ",
      description: "R$ 20 de desconto na primeira compra",
      discountType: "fixed",
      discountValue: 20,
      minimumValue: 80,
      validFrom: "2025-01-01",
      validTo: "2025-12-31",
      usageLimit: 500,
      usedCount: 156,
      active: true,
    },
  ])

  const handleToggleStatus = (couponId) => {
    setCoupons((prev) =>
      prev.map((coupon) => (coupon.id === couponId ? { ...coupon, active: !coupon.active } : coupon)),
    )
  }

  const handleDelete = (couponId) => {
    if (window.confirm("Tem certeza que deseja excluir este cupom?")) {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId))
    }
  }

  const getDiscountDisplay = (coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`
    } else if (coupon.discountType === "fixed") {
      return `R$ ${coupon.discountValue.toFixed(2)}`
    } else {
      return "Frete Grátis"
    }
  }

  const getUsagePercentage = (coupon) => {
    return Math.round((coupon.usedCount / coupon.usageLimit) * 100)
  }

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
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Desconto</th>
                  <th>Valor Mínimo</th>
                  <th>Validade</th>
                  <th>Uso</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>
                      <strong className="font-monospace">{coupon.code}</strong>
                    </td>
                    <td>{coupon.description}</td>
                    <td>
                      <span className="badge bg-success">{getDiscountDisplay(coupon)}</span>
                    </td>
                    <td>R$ {coupon.minimumValue.toFixed(2)}</td>
                    <td>
                      <small>
                        {new Date(coupon.validFrom).toLocaleDateString("pt-BR")} até
                        <br />
                        {new Date(coupon.validTo).toLocaleDateString("pt-BR")}
                      </small>
                    </td>
                    <td>
                      <div>
                        <small>
                          {coupon.usedCount} / {coupon.usageLimit}
                        </small>
                        <div className="progress" style={{ height: "4px" }}>
                          <div className="progress-bar" style={{ width: `${getUsagePercentage(coupon)}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${coupon.active ? "btn-success" : "btn-danger"}`}
                        onClick={() => handleToggleStatus(coupon.id)}
                      >
                        {coupon.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <Link to={`/admin/cupons/editar/${coupon.id}`} className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(coupon.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {coupons.length === 0 && (
            <div className="text-center py-4">
              <p>Nenhum cupom encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCouponList
