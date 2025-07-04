import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../services/api';
import '../style.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  dados: number[];
}

function RendaMensal() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const { entregadorId } = useParams<{ entregadorId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRendaData() {
      if (!entregadorId) return;
      try {
        const response = await api.get(`/pedidos/grafico/renda-mensal/${entregadorId}`);
        setChartData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de renda:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRendaData();
  }, [entregadorId]);

  const data = {
    labels: chartData?.labels || [],
    datasets: [{
      label: 'Renda Diária (R$)',
      data: chartData?.dados || [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  if (loading) return <div className="container-grafico"><h2>Carregando gráfico...</h2></div>;

  return (
    <div className="containerGrafico">
      <header className="tituloGrafico">
        <h1>Renda Mensal</h1>
        <button onClick={() => navigate(`/dashboard/${entregadorId}`)} className="botaoVoltar">
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
      </header>
      <main className="content-grafico">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </main>
    </div>
  );
}

export default RendaMensal;