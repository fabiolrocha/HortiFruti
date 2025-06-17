import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import  api  from '../../services/api';
import '../style.css';

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
  
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const { entregadorId } = useParams<{ entregadorId: string }>();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchPedidosDisponiveis();
  }, []);

  const handleAceitarPedido = async (pedidoId: string) => {
    if (!entregadorId) {
      alert('Não foi possível identificar o entregador. Faça login novamente.');
      return;
    }

    try {
      await api.patch(`/pedidos/${pedidoId}/disponiveis`, { entregadorId });
      alert('Pedido entregue com sucesso!');
      

      fetchPedidosDisponiveis();
      
    } catch (error) {
      console.error("Erro ao aceitar pedido:", error);
      alert('Não foi possível aceitar o pedido.');
    }
  };

  if (loading) {
    return <div className="container-pedidos"><h2>Carregando pedidos...</h2></div>;
  }

  return (
    <div className="containerPedidos">
      <header className="tituloPedidos">
        <h1>PEDIDOS DISPONÍVEIS</h1>
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
      <main className="pedidosDisponiveis">
        {pedidos.length > 0 ? (
          <div className="listaPedidosDisponiveis">
            {pedidos.slice(0, 3).map((pedido) => (
              <div key={pedido.id} className="cardPedido">
                <h3>{pedido.descricao}</h3>
                <p><strong>De:</strong> {pedido.endereco_origem}</p>
                <p><strong>Para:</strong> {pedido.endereco_destino}</p>
                <div className="detalhesPedido">
                  <span>Distância: {parseFloat(String(pedido.distancia_km)).toFixed(1)} KM</span>
                </div>
                <div className="detalhesPedido">
                  <span>Valor: R$ {parseFloat(String(pedido.valor_entrega)).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleAceitarPedido(pedido.id)} 
                  className="botaoAceitarPedido"
                >
                  CONCLUIR PEDIDO
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="semPedidos">Não há pedidos disponíveis no momento.</p>
        )}
      </main>
    </div>
  );
}

export default PedidosDisponiveis;