import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Autenticação
import Login from './pages/autenticacao/Login';
import Cadastro from './pages/autenticacao/Cadastro';

// Métricas
import HistoricoEntregas from './pages/metricas/HistoricoEntregas';
import RendaMensal from './pages/metricas/RendaMensal';
import QuilometragemSemanal from './pages/metricas/QuilometragemSemanal';

// Motos
import CadastroMoto from './pages/motos/CadastroMoto';
import MotosCadastradas from './pages/motos/MotosCadastradas';

// Pedidos
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
        <Route path="/quilometragem-semanal/:entregadorId" element={<QuilometragemSemanal />} />

        {/* Motos */}
        <Route path="/cadastro-moto/:entregadorId" element={<CadastroMoto />} />
        <Route path="/motos-cadastradas/:entregadorId" element={<MotosCadastradas />} />

        {/* Pedidos */}
        <Route path="/dashboard/:entregadorId" element={<Dashboard />} />
        <Route path="/pedidos/disponiveis/:entregadorId" element={<PedidosDisponiveis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
