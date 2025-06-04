import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../style.css";

const Login: React.FC = () => {
  // Estado para armazenar o username e password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Função que será chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previni o recarregamento da página

    try {
      // Faz a requisição POST para /auth/login com os dados
      const response = await api.post("/auth/login", { username, password });

      // Armazena o token ou id no localStorage
      localStorage.setItem("entregadorId", response.data.entregadorId);

      // Redireciona para a página de pedidos
      navigate("../dashboard");
    } catch (error) {
      console.error("Erro no login", error);
      alert("Login falhou!");
    }
  };

  return (
    <div className="containerLogin">
      <h1 className="tituloPrincipal">FreshFood</h1>
      <div className="containerInputs">
        <form onSubmit={handleSubmit}>
          <input
            className="inputLogin"
            type="text"
            placeholder="CPF"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            className="inputLogin"
            type="password"
            placeholder="SENHA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="botaoLogin" onClick={() => navigate("/dashboard")}>
            LOGIN
          </button>
          <button
            type="submit"
            className="botaoRegistrar"
            onClick={() => navigate("../cadastro")}
          >
            REGISTRE-SE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
