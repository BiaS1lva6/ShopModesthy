import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import products from "../../data/products";

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  // Simulação de categorias (substitua pelo que vem da API, se necessário)
  const categories = [
    { id: "1", nome: "Conjuntos" },
    { id: "2", nome: "Vestidos" },
    { id: "3", nome: "Coletes" },
    { id: "4", nome: "Acessórios" },
  ];

  useEffect(() => {
    if (isEditing) {
      const product = products.find((p) => p.id === Number.parseInt(id));
      if (product) {
        setFormData({
          name: product.name,
          categoryId: product.categoryId || "",
          price: product.price.toString(),
          description: product.description || "",
          inStock: product.inStock,
        });
      }
    }
  }, [id, isEditing, products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!formData.name) formErrors.name = "O nome do produto é obrigatório.";
    if (!formData.categoryId) formErrors.categoryId = "A categoria é obrigatória.";
    if (!formData.price) formErrors.price = "O preço é obrigatório.";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      const response = await fetch("https://localhost:7122/api/Produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        body: JSON.stringify({
          nome: formData.name,
          categoriaId: formData.categoryId, // Certifique-se de que é um GUID válido
          preco: parseFloat(formData.price),
          estoque: formData.inStock,
          descricao: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o produto");
      }

      alert("Produto criado com sucesso!");
      navigate("/admin/produtos");
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      alert("Erro ao criar o produto. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="container py-4">
      <h1>{isEditing ? "Editar Produto" : "Novo Produto"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome do Produto *
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Categoria *
          </label>
          <select
            className={`form-select ${errors.categoryId ? "is-invalid" : ""}`}
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
          {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Preço *
          </label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Digite o preço do produto"
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrição
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descrição do produto"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inStock">
            Em Estoque
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Salvar Alterações" : "Criar Produto"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;