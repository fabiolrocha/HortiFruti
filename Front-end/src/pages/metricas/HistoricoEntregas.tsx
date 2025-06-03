import React, { useEffect, useState } from 'react';
import api from '../../services/api';

type Pedido = {
  id: number;
  cliente: string;
  endereco: string;
  status: string;
};

const EntregasConcluidas: React.FC = () => {
  const [entregas, setEntregas] = useState<Pedido[]>([]);

  useEffect(() => {
    api.get('/pedidos')
      .then((response) => {
        // Filtra só os pedidos com status 'entregue'
        const concluidos = response.data.filter((pedido: Pedido) => pedido.status === 'entregue');
        setEntregas(concluidos);
      })
      .catch((error) => console.error('Erro ao buscar entregas', error));
  }, []);

  return (
    <div>
      <h1>Entregas Concluídas</h1>
      {entregas.length === 0 ? (
        <p>Nenhuma entrega concluída ainda.</p>
      ) : (
        entregas.map((pedido) => (
          <div key={pedido.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <p><strong>Endereço:</strong> {pedido.endereco}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EntregasConcluidas;
