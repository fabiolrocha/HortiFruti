import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import  api from '../../services/api';
import '../style.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  dados: number[];
}

function QuilometragemSemanal() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const { entregadorId } = useParams<{ entregadorId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!entregadorId) return;
    api.get(`/pedidos/grafico/quilometragem/${entregadorId}`)
      .then(response => setChartData(response.data))
      .catch(error => console.error("Erro ao buscar dados de KM:", error));
  }, [entregadorId]);

  const data = {
    labels: chartData?.labels || [],
    datasets: [{
      label: 'Quilometragem (km)',
      data: chartData?.dados || [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };

  return (
    <div className="containerGrafico">
      <header className="tituloGrafico">
        <h1>Quilometragem Semanal</h1>
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
        {chartData ? <Line data={data} /> : <p>Carregando...</p>}
      </main>
    </div>
  );
}

export default QuilometragemSemanal;