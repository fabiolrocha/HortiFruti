import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login: React.FC = () => {
  // Estado para armazenar o username e password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hook de navegação do React Router
  const navigate = useNavigate();

  // Função que será chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Previni o recarregamento da página

    try {
      // Faz a requisição POST para /auth/login com os dados
      const response = await api.post('/auth/login', { username, password });

      // Armazena o token ou id no localStorage
      localStorage.setItem('entregadorId', response.data.entregadorId);

      // Redireciona para a página de pedidos
      navigate('/pedidos');
    } catch (error) {
      console.error('Erro no login', error);
      alert('Login falhou!');
    }
  };

  return (
    <div>
      <h1>Login do Entregador</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
