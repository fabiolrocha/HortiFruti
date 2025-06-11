import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../style.css";
import Logo from "../images/Logo.png";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { entregadorId } = useParams<{ entregadorId: string }>();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className="menu">
          <ul>
            <li className="ativo" onClick={() => navigate(`/dashboard/${entregadorId}`)}>Início</li>
            <li onClick={() => navigate(`/renda-mensal/${entregadorId}`)}>Renda Mensal</li>
            <li onClick={() => navigate(`/quilometragem-semanal/${entregadorId}`)}>Quilometragem Semanal</li>
            <li onClick={() => navigate(`/pedidos/disponiveis/${entregadorId}`)}>Pedidos</li>
            <li onClick={() => navigate(`/historico-entregas/${entregadorId}`)}>Histórico de Entregas</li>
          </ul>
        </nav>
        <button className="botaoMoto" onClick={() => navigate(`/cadastro-moto/${entregadorId}`)}>Cadastrar Nova Motocicleta</button>
      </aside>

      <main className="mainDashboard">
        <div className="metricasDashboard">
          <span>💸</span>
          <p>Renda Mensal: R$ 4623,50</p>
        </div>
        <div className="metricasDashboard">
          <span>🚚</span>
          <p>Quilometragem Semanal: 1483km</p>
        </div>
        <div className="metricasDashboard">
          <span>🛒</span>
          <p>Pedidos em Espera: 4</p>
        </div>
        <div className="metricasDashboard">
          <span>📦</span>
          <p>Histórico de Entregas: 1216</p>
        </div>
      </main>

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

export default Dashboard;
