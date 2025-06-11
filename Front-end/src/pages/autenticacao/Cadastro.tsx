import React, { useState, FormEvent } from "react";
import {Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../style.css";

const Cadastro: React.FC = () => {
  const [nome_completo, setnome_completo] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosCadastro = {
      nome_completo,
      senha,
      cpf,
      endereco,
      email,
    };

    if (!nome_completo || !senha || !cpf || !email) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await api.post("/auth/cadastro", dadosCadastro);

      alert("Cadastro realizado com sucesso!");

      navigate("../login");
    } catch (error) {
      console.error("Erro no cadastro", error);
      alert("Cadastro falhou!");
    }
  };

  return (
    <div className="containerCadastro">
      <h1 className="cadastreInformacoes">CADASTRE SUAS INFORMAÇÕES</h1>

      <form className="formularioCadastro" onSubmit={handleSubmit}>
        <div className="containerInformacoesCadastro">
          <div className="informacoesCadastro">
            <input
              className="inputCadastro"
              type="text"
              placeholder="NOME COMPLETO"
              value={nome_completo}
              onChange={(e) => setnome_completo(e.target.value)}
              required
            />
            <input
              className="inputCadastro"
              type="password"
              placeholder="SENHA"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <input
              className="inputCadastro"
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <input
              className="inputCadastro"
              type="text"
              placeholder="ENDEREÇO COMPLETO"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
            <input
              className="inputCadastro"
              type="text"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="informacoesCadastro">
            <div className="upload">ADICIONE A FRENTE DA CNH</div>
            <div className="upload">ADICIONE A TRÁS DA CNH</div>
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type="submit" className="botaoCadastrar">
            CADASTRAR
          </button>
        </div>
      </form>

      <button className="botaoVoltar" onClick={() => navigate("../login")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Cadastro;
