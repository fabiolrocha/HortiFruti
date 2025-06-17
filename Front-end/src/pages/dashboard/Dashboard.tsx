import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../style.css";
import Logo from "../images/Logo.png";

interface Metricas {
  rendaMensal: number;
  quilometragemSemanal: number;
  pedidosEmEspera: number;
  historicoEntregas: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { entregadorId } = useParams<{ entregadorId: string }>();

  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!entregadorId) {
      setLoading(false);
      return;
    }

    async function fetchMetricas() {
      try {
        const response = await api.get(`/pedidos/metricas/${entregadorId}`);
        setMetricas(response.data);
      } catch (error) {
        console.error("Erro ao buscar métricas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetricas();
  }, [entregadorId]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className="menu">
          <ul>
            <li
              className="ativo"
              onClick={() => navigate(`/dashboard/${entregadorId}`)}
            >
              Início
            </li>
            <li onClick={() => navigate(`/renda-mensal/${entregadorId}`)}>
              Renda Mensal
            </li>
            <li
              onClick={() => navigate(`/quilometragem-semanal/${entregadorId}`)}
            >
              Quilometragem Semanal
            </li>
            <li
              onClick={() => navigate(`/pedidos/disponiveis/${entregadorId}`)}
            >
              Pedidos
            </li>
            <li onClick={() => navigate(`/historico-entregas/${entregadorId}`)}>
              Histórico de Entregas
            </li>
          </ul>
        </nav>
        <button
          className="botaoMoto"
          onClick={() => navigate(`/cadastro-moto/${entregadorId}`)}
        >
          Cadastrar Nova Motocicleta
        </button>
      </aside>

      <main className="mainDashboard">
        <div className="metricasDashboard">
          <span>💸</span>
          <p>Renda Mensal: R$ {metricas? metricas.rendaMensal.toFixed(2) : '0.00'}</p>
        </div>
        <div className="metricasDashboard">
          <span>🚚</span>
          <p>Quilometragem Semanal: {metricas ? metricas.quilometragemSemanal.toFixed(2) : '0.0'}km</p>
        </div>
        <div className="metricasDashboard">
          <span>🛒</span>
          <p>Pedidos em Espera: {metricas?.pedidosEmEspera || 0}</p>
        </div>
        <div className="metricasDashboard">
          <span>📦</span>
          <p>Histórico de Entregas: {metricas?.historicoEntregas || 0}</p>
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
