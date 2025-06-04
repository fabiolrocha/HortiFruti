import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../style.css";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [motocicleta, setMotocicleta] = useState(false);
  const [bicicleta, setBicicleta] = useState(false);
  const [placaMoto, setPlacaMoto] = useState("");
  const [modeloMoto, setModeloMoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosCadastro = {
      nome,
      senha,
      cpf,
      endereco,
      numero,
      motocicleta,
      bicicleta,
      placaMoto,
      modeloMoto,
    };

    try {
      const response = await api.post("/auth/cadastro", dadosCadastro);

      localStorage.setItem("entregadorId", response.data.entregadorId);

      navigate("../dashboard");
    } catch (error) {
      console.error("Erro no cadastro", error);
      alert("Cadastro falhou!");
    }
  };

  return (
    <div className="containerCadastro">
      <h1 className="cadastreInformacoes">Cadastre Suas Informações</h1>

      <form className="formularioCadastro" onSubmit={handleSubmit}>
        <div className="containerInformacoesCadastro">
          <div className="informacoesCadastro">
            <input
              className="inputCadastro"
              type="text"
              placeholder="NOME COMPLETO"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              placeholder="NÚMERO"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            <div className="checkboxes">
              <label>
                <input
                  type="checkbox"
                  checked={motocicleta}
                  onChange={(e) => setMotocicleta(e.target.checked)}
                />{" "}
                MOTOCICLETA
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={bicicleta}
                  onChange={(e) => setBicicleta(e.target.checked)}
                />{" "}
                BICICLETA
              </label>
            </div>
          </div>
          <div className="informacoesCadastro">
            <input
              className="inputCadastro"
              type="text"
              placeholder="PLACA DA MOTOCICLETA"
              value={placaMoto}
              onChange={(e) => setPlacaMoto(e.target.value)}
              required={motocicleta}
            />
            <input
              className="inputCadastro"
              type="text"
              placeholder="MODELO DA MOTOCICLETA"
              value={modeloMoto}
              onChange={(e) => setModeloMoto(e.target.value)}
              required={motocicleta}
            />
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
