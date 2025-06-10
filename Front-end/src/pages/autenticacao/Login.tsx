import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../style.css";

const Login: React.FC = () => {
  // Estado para armazenar o cpf e password
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
   const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Função que será chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previni o recarregamento da página

    if (!senha || !cpf ) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Faz a requisição POST para /auth/login com os dados
      const response = await api.post("/auth/login", { cpf, senha });

      const { id } = response.data;
      navigate(`/dashboard/${id}`);
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
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <br />
          <input
            className="inputLogin"
            type="password"
            placeholder="SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="botaoLogin">
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
