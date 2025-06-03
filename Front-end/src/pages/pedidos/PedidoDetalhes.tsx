import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

type Pedido = {
  id: number;
  cliente: string;
  endereco: string;
  status: string;
  itens: string[];
};

const PedidoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Pega o ID da URL
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const navigate = useNavigate();

  // Carrega os detalhes do pedido ao abrir a página
  useEffect(() => {
    api.get(`/pedidos/${id}`)
      .then((response) => setPedido(response.data))
      .catch((error) => console.error('Erro ao buscar detalhes do pedido', error));
  }, [id]);

  const marcarComoEntregue = () => {
    api.patch(`/pedidos/${id}/status`, { status: 'entregue' })
      .then(() => {
        alert('Pedido marcado como entregue!');
        navigate('/pedidos');  // volta pra lista de pedidos
      })
      .catch((error) => console.error('Erro ao atualizar pedido', error));
  };

  if (!pedido) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <p><strong>Endereço:</strong> {pedido.endereco}</p>
      <p><strong>Status:</strong> {pedido.status}</p>
      <p><strong>Itens:</strong></p>
      <ul>
        {pedido.itens.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      {pedido.status !== 'entregue' && (
        <button onClick={marcarComoEntregue}>Marcar como Entregue</button>
      )}
    </div>
  );
};

export default PedidoDetalhe;
