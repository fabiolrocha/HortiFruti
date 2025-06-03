import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";
import Logo from "./images/Logo.png";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="logo">
            <img src={Logo} alt="Logo"/>
        </div>
        <nav className="menu">
          <ul>
            <li className="ativo">Início</li>
            <li>Renda Mensal</li>
            <li>Quilometragem Semanal</li>
            <li>Pedidos</li>
            <li>Histórico de Entregas</li>
          </ul>
        </nav>
        <button className="botaoMoto">Cadastrar Nova Motocicleta</button>
      </aside>

    {/* Área principal do dashboard 
    <main className="main">
        <div className="card">
          <span>💸</span>
          <p>Renda Mensal: R$ 4623,50</p>
        </div>
        <div className="card">
          <span>🚚</span>
          <p>Quilometragem Semanal: 1483km</p>
        </div>
        <div className="card">
          <span>🛒</span>
          <p>Pedidos em Espera: 4</p>
        </div>
        <div className="card">
          <span>📦</span>
          <p>Histórico de Entregas: 1216</p>
        </div>
      </main>

      <button className="logout">⮕</button>*/}
    </div>
  );
};

export default Dashboard;
