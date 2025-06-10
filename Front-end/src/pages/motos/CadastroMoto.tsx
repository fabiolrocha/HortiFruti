import React, { useState, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "../style.css";

const CadastroMoto: React.FC = () => {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano_fabricacao, setAno_fabicacao] = useState("");
  const [cor, setCor] = useState("");
  const navigate = useNavigate();
  const { entregadorId } = useParams<{ entregadorId: string }>();

 async function handleSubmit(e: FormEvent) {
    
    e.preventDefault();

    if (!modelo || !placa) {
      alert("Por favor, preencha o modelo e a placa.");
      return;
    }

    const data = {
      modelo,
      placa,
      cor,
      ano_fabricacao: ano_fabricacao ? Number(ano_fabricacao) : undefined,
    };

    try{
        await api.post(`/moto/entregador/${entregadorId}`, data);
        alert("Moto cadastrada com sucesso!");
        navigate(`/motos-cadastradas/${entregadorId}`);
    } catch (error: any){
        if (error.response && error.response.data && error.response.data.message) {
            alert(`Erro no cadastro: ${error.response.data.message}`);
    }else {
        alert('Ocorreu um erro inesperado ao cadastrar a moto.');
        console.error(error);
    }
}
  }

  return (
    <div className="containerCadastroMoto">
      <h1 className="tituloMoto">CADASTRO DE MOTOS</h1>
      <form onSubmit={handleSubmit}>
          <div className="opcoesMoto">
            
        <div className="modeloMoto">
          <input
            className="inputModelo"
            placeholder="Modelo da moto"
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            />
        </div>
        <div className="placaMoto">
          <input
            className="inputPlaca"
            placeholder="Placa da moto"
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
            />
        </div>
        <div className="corMoto">
          <input
            className="inputCor"
            placeholder="Cor da moto"
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            required
            />
        </div>
        <div className="anoMoto">
          <input
            className="inputAno"
            placeholder="Ano de fabricação"
            type="number"
            value={ano_fabricacao}
            onChange={(e) => setAno_fabicacao(e.target.value)}
            required
            />
        </div>
        <button type="submit" className="botaoCadastrar">CADASTRAR</button>
        <button type="submit" className="botaoMotosCadastradas" onClick={() => navigate(`/motos-cadastradas/${entregadorId}`)}>VER MOTOS CADASTRADAS</button>
            </div>
      </form>
    </div>
  );
};

export default CadastroMoto;
