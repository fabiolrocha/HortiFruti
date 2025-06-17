import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  api  from '../../services/api';
import '../style.css';

interface Pedido {
  id: string;
  descricao: string;
  valor_entrega: number;
  status: string;
  data_entrega: string;
}

function HistoricoEntregas() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const {entregadorId} = useParams<{entregadorId:string}>();
const navigate = useNavigate();

useEffect(() =>{
  async function fetchHistorico() {
  if (!entregadorId) {
    setLoading(false);
    return;
  }

  try {
    const responde = await api.get(`/pedidos/historico/${entregadorId}`);
    setPedidos(responde.data);
  } catch (error) {
    console.error('Erro ao buscar o histórico de entregas:', error);
    alert('Não foi possivel carregar o hitórico de entregas')
  } finally {
    setLoading(false);
  }
}

fetchHistorico();
}, [entregadorId]);

if (loading){
  return <div>Carregando...</div>;
}

return (
  <div className="containerHistorico">
      <header className="tituloHistorico">
        <h1>HISTÓRICO DE ENTREGAS</h1>
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
      <main className="contentHistorico">
        {pedidos.length > 0 ? (
          <table className="tabelaHistorico">
            <thead className="cabecalhoHistorico">
              <tr>
                <th>Descrição do Pedido</th>
                <th>Data</th>
                <th>Valor da Entrega</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="corpoHistorico">
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.descricao}</td>
                  <td>{new Date(pedido.data_entrega).toLocaleDateString('pt-BR')}</td>
                  <td>R$ {parseFloat(String(pedido.valor_entrega)).toFixed(2)}</td>
                  <td>
                    <span className={`status-pill status-${pedido.status}`}>
                      Concluido
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="semHistorico">Nenhum pedido encontrado no seu histórico.</p>
        )}
      </main>
    </div>
);
}
export default HistoricoEntregas;
