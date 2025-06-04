import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import "../style.css";
import Logo from "../images/Logo.png";
import Rotas from "../images/rotas.png";
import Loc from "../images/loc.png";
import Historico from "../images/historico.png";


const PedidosDisponiveis: React.FC = () => {
  const navigate = useNavigate();

   return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav className="menu">
          <ul>
            <li>Início</li>
            <li>Renda Mensal</li>
            <li>Quilometragem Semanal</li>
            <li className="ativo">Pedidos</li>
            <li>Histórico de Entregas</li>
          </ul>
        </nav>
        <button className="botaoMoto">Cadastrar Nova Motocicleta</button>
      </aside>

      <main>
        <div className='solicitacoesPedidosDisponiveis'>
          <p>SOLICITAÇÕES</p>
          <img src={Loc} alt="loc" />
        </div>
        <div className='historicoPedidosDisponiveis'>
          <p>ROTAS</p>
          <img src={Historico} alt="historico" />
        </div>
        <div className="inicioPedidosDisponiveis">
        <div>
          <h1>Pedidos</h1>
        </div>
        <div className="metricasPedidosDisponiveis">
          <div className='containerPedidosDisponiveis'>
              <img src={Rotas} alt="Rotas" />
              <h1>ROTA 1</h1>
              <button className="botaoConfirmarEntrega">CONFIRMAR ENTREGA</button>
              <p>RESTAM 3 ROTAS</p>

          </div>
        </div>
        </div>
      </main>

      <button className="botaoVoltar" onClick={() => navigate("../login")}>
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
    </div>
  );
};

export default PedidosDisponiveis;