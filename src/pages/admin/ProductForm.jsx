import { useEffect, useState } from "react";

const AdminProductForm = ({
  isEditing = false,
  initialData = {},
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    produtoId: initialData.produtoId || "",
    nome: initialData.nome || "",
    categoriaId: initialData.categoriaId || "",
    preco: initialData.preco || 0,
    estoque: initialData.estoque || 0,
    descricao: initialData.descricao || "",
    destaque: initialData.destaque || false,
    ordemExibicao: initialData.ordemExibicao || 0,
  });

  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias

  useEffect(() => {
    // Função para buscar as categorias da API
    const fetchCategorias = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Categorias", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();
        setCategorias(data); // Atualiza o estado com as categorias retornadas
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        alert("Não foi possível carregar as categorias. Tente novamente.");
      }
    };

    fetchCategorias();
  }, []); // Executa apenas uma vez ao montar o componente

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7122/api/Produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        body: JSON.stringify(formData), // Envia os dados do formulário
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar o produto");
      }

      alert("Produto salvo com sucesso!");
      if (onSubmitSuccess) {
        onSubmitSuccess(); // Callback para ações após o sucesso
      }
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      alert("Não foi possível salvar o produto. Tente novamente.");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">{isEditing ? "Editar Produto" : "Criar Produto"}</h1>
      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome do Produto *
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite o nome do produto"
            required
          />
        </div>

        {/* Categoria */}
        <div className="mb-3">
          <label htmlFor="categoriaId" className="form-label">
            Categoria *
          </label>
          <select
            className="form-select"
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Preço */}
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">
            Preço *
          </label>
          <input
            type="number"
            className="form-control"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Digite o preço do produto"
            required
          />
        </div>

        {/* Estoque */}
        <div className="mb-3">
          <label htmlFor="estoque" className="form-label">
            Estoque *
          </label>
          <input
            type="number"
            className="form-control"
            id="estoque"
            name="estoque"
            value={formData.estoque}
            onChange={handleChange}
            placeholder="Digite a quantidade em estoque"
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <textarea
            className="form-control"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Digite a descrição do produto"
          />
        </div>

        {/* Destaque */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="destaque"
            name="destaque"
            checked={formData.destaque}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="destaque">
            Destaque
          </label>
        </div>

        {/* Ordem de Exibição */}
        <div className="mb-3">
          <label htmlFor="ordemExibicao" className="form-label">
            Ordem de Exibição
          </label>
          <input
            type="number"
            className="form-control"
            id="ordemExibicao"
            name="ordemExibicao"
            value={formData.ordemExibicao}
            onChange={handleChange}
            placeholder="Digite a ordem de exibição"
          />
        </div>

        {/* Botão de Enviar */}
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Salvar Alterações" : "Criar Produto"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
