import React from 'react';

type PedidoProps = {
  cliente: string;
  endereco: string;
  status: string;
};

const PedidoCard: React.FC<PedidoProps> = ({ cliente, endereco, status }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
      <p><strong>Cliente:</strong> {cliente}</p>
      <p><strong>Endereço:</strong> {endereco}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default PedidoCard;
