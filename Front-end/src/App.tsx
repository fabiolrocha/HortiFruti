import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Autenticação
import Login from './pages/autenticacao/Login';
import Cadastro from './pages/autenticacao/Cadastro';

// Métricas
import HistoricoEntregas from './pages/metricas/HistoricoEntregas';
import RendaMensal from './pages/metricas/RendaMensal';

// Motos
import CadastroMoto from './pages/motos/CadastroMoto';
import MotosCadastradas from './pages/motos/MotosCadastradas';

// Pedidos
import PedidoDetalhes from './pages/pedidos/PedidoDetalhes';
import PedidosDisponiveis from './pages/pedidos/PedidosDisponiveis';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Métricas */}
        <Route path="/historico-entregas/:entregadorId" element={<HistoricoEntregas />} />
        <Route path="/renda-mensal/:entregadorId" element={<RendaMensal />} />

        {/* Motos */}
        <Route path="/cadastro-moto/:entregadorId" element={<CadastroMoto />} />
        <Route path="/motos-cadastradas/:entregadorId" element={<MotosCadastradas />} />

        {/* Pedidos */}
        <Route path="/dashboard/:entregadorId" element={<Dashboard />} />
        <Route path="/pedido/:id" element={<PedidoDetalhes />} />
        <Route path="/pedidos/disponiveis/:entregadorId" element={<PedidosDisponiveis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
