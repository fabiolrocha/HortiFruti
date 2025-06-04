import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
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
          <li onClick={() => navigate("/dashboard")}>Início</li>
            <li onClick={() => navigate("./renda-mensal")}>Renda Mensal</li>
            <li onClick={() => navigate("/quilometragem-semanal")}>Quilometragem Semanal</li>
            <li onClick={() => navigate("/pedidos-solicitacoes")} className="ativo">Pedidos</li>
            <li onClick={() => navigate("/historico-entregas")}>Histórico de Entregas</li>
          </ul>
        </nav>
        <button className="botaoMoto" onClick={() => navigate("/cadastro-moto")}>Cadastrar Nova Motocicleta</button>
      </aside>

      <main className="mainPedidosDisponiveis">
          <div className="solicitacoesPedidosDisponiveis">
            <p>SOLICITAÇÕES</p>
            <img src={Loc} alt="loc" />
          </div>
          <div className="inicioPedidosDisponiveis">
            <div className="metricasPedidosDisponiveis">
              <h1>VIAGEM SOLICITADA</h1>
              <img src={Rotas} alt="Rotas" />
              <h1>Taguatinga Norte</h1>
              <button className="botaoConfirmarEntrega" onClick={() => navigate("/pedidos")}>
                ACEITAR
              </button>
            </div>
          </div>
          <div className="historicoPedidosDisponiveis">
            <p>ROTAS</p>
            <img src={Historico} alt="historico" />
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
