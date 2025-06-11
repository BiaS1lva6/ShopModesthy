import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState({ nome: "", description: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Categorias", {
          method: "GET",
          headers: {
            accept: "text/plain",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias.");
        }

        const data = await response.json();
        setCategories(data); // Atualiza o estado com as categorias retornadas pela API
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.nome?.toLowerCase().includes(searchTerm?.toLowerCase()),
  );

  const handleToggleStatus = (categoryId) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === categoryId ? { ...category, active: !category.active } : category)),
    );
  };

  const handleDelete = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category.productCount > 0) {
      alert("Não é possível excluir uma categoria que possui produtos associados.");
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories((prev) => prev.filter((category) => category.id !== categoryId));
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7122/api/Categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar categoria.");
      }

      const createdCategory = await response.json();
      setCategories((prev) => [...prev, createdCategory]);
      setNewCategory({ nome: "", description: "" }); // Limpa o formulário
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      <h1>Lista de Categorias</h1>
      {isLoading && <p>Carregando categorias...</p>}
      {error && <p>Erro: {error}</p>}
      {categories.length === 0 && !isLoading && <p>Nenhuma categoria encontrada.</p>}

      {/* Formulário para criar nova categoria */}
      <form onSubmit={handleCreateCategory} className="mb-4">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome da Categoria</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={newCategory.nome}
            onChange={(e) => setNewCategory({ ...newCategory, nome: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            id="description"
            className="form-control"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Criar Categoria</button>
      </form>

      {/* Lista de categorias */}
      <ul className="list-group">
        {categories.map((category, index) => (
          <li key={category.id || index} className="list-group-item">
            <h5>{category.nome}</h5> {/* Exibe o nome da categoria */}
            <p>{category.description}</p>
            <small>Categoria: {category.productCount}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryList;
