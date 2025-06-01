import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

type Pedido = {
  id: number;
  cliente: string;
  endereco: string;
  status: string;
};

const PedidosDisponiveis: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  // Carrega os pedidos ao abrir a página
  useEffect(() => {
    api.get('/pedidos')
      .then((response) => setPedidos(response.data))
      .catch((error) => console.error('Erro ao buscar pedidos', error));
  }, []);

  const irParaDetalhes = (id: number) => {
    navigate(`/pedido/${id}`);
  };

  return (
    <div>
      <h1>Pedidos Disponíveis</h1>
      {pedidos.map((pedido) => (
        <div key={pedido.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
          <p><strong>Cliente:</strong> {pedido.cliente}</p>
          <p><strong>Endereço:</strong> {pedido.endereco}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
          <button onClick={() => irParaDetalhes(pedido.id)}>Detalhes</button>
        </div>
      ))}
    </div>
  );
};

export default PedidosDisponiveis;
