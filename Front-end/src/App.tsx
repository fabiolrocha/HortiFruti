import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PedidosDisponiveis from './pages/PedidosDisponiveis';
import PedidoDetalhe from './pages/PedidoDetalhe';
import EntregasConcluidas from './pages/EntregasConcluidas';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pedidos" element={<PedidosDisponiveis />} />
        <Route path="/pedido/:id" element={<PedidoDetalhe />} />
        <Route path="/entregas" element={<EntregasConcluidas />} />
      </Routes>
    </Router>
  );
};

export default App;