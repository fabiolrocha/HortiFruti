// Front-end/src/pages/pedidos/PedidosDisponiveis.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import  api  from '../../services/api';
import '../style.css';

// 1. Definir um tipo para os dados do Pedido que vêm da API
interface Pedido {
  id: string;
  descricao: string;
  valor_entrega: number;
  distancia_km: number;
  endereco_origem: string;
  endereco_destino: string;
  status: string;
}

function PedidosDisponiveis() {
  // 2. Estados para armazenar a lista de pedidos e o estado de carregamento
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const { entregadorId } = useParams<{ entregadorId: string }>();
  const navigate = useNavigate();

  // Função para buscar os pedidos disponíveis
  const fetchPedidosDisponiveis = async () => {
    try {
      setLoading(true);
      const response = await api.get('/pedidos/disponiveis');
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos disponíveis:", error);
      alert('Não foi possível carregar os pedidos disponíveis.');
    } finally {
      setLoading(false);
    }
  };

  // 3. useEffect para chamar a função de busca quando a página carregar
  useEffect(() => {
    fetchPedidosDisponiveis();
  }, []); // O array vazio garante que isso rode apenas uma vez

  // 4. Função para lidar com a ação de aceitar um pedido
  const handleAceitarPedido = async (pedidoId: string) => {
    if (!entregadorId) {
      alert('Não foi possível identificar o entregador. Faça login novamente.');
      return;
    }

    try {
      // Chama a rota PATCH do backend
      await api.patch(`/pedidos/${pedidoId}/aceitar`, { entregadorId });
      alert('Pedido aceito com sucesso!');
      
      // Atualiza a lista de pedidos disponíveis, removendo o que foi aceito
      fetchPedidosDisponiveis();

      // Opcional: navegar para o histórico para ver o pedido aceito
      // navigate(`/historico-entregas/${entregadorId}`);
      
    } catch (error) {
      console.error("Erro ao aceitar pedido:", error);
      alert('Não foi possível aceitar o pedido.');
    }
  };

  if (loading) {
    return <div className="container-pedidos"><h2>Carregando pedidos...</h2></div>;
  }

  return (
    <div className="container-pedidos">
      <header className="header-pedidos">
        <h1>Pedidos Disponíveis</h1>
        <Link to={`/dashboard/${entregadorId}`} className="link-voltar">
          Voltar para o Dashboard
        </Link>
      </header>
      <main className="content-pedidos">
        {pedidos.length > 0 ? (
          <div className="lista-pedidos-disponiveis">
            {/* 5. Mapeia o array de pedidos para renderizar cada um */}
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="card-pedido">
                <h3>{pedido.descricao}</h3>
                <p><strong>De:</strong> {pedido.endereco_origem}</p>
                <p><strong>Para:</strong> {pedido.endereco_destino}</p>
                <div className="detalhes-pedido">
                  <span>Distância: {parseFloat(String(pedido.distancia_km)).toFixed(1)} km</span>
                  <span>Valor: R$ {parseFloat(String(pedido.valor_entrega)).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleAceitarPedido(pedido.id)} 
                  className="btn-aceitar"
                >
                  Aceitar Pedido
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="sem-pedidos">Não há pedidos disponíveis no momento.</p>
        )}
      </main>
    </div>
  );
}

export default PedidosDisponiveis;