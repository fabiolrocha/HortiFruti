import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import "../style.css";
import { useNavigate } from "react-router-dom";

interface Moto {
  id: string;
  modelo: string;
  placa: string;
  cor?: string;
  ano_fabricacao?: number;
}
const MotosCadastradas: React.FC = () => {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const { entregadorId } = useParams<{ entregadorId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMotos() {
      if (!entregadorId) {
        setLoading(false);
        return;
      }

      try {
        const reponse = await api.get(`/moto/entregador/${entregadorId}`);
        setMotos(reponse.data);
      } catch (error) {
        console.error("Erro ao buscar as motos:", error);
        alert("Não foi possível carregar a lista de motos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchMotos();
  }, [entregadorId]);

  if (loading) {
    return <div className="loading">Carregando motos...</div>;
  }

  return (
    <div className="containerMotosCadastradas">
        <h1 className="tituloMoto">Minhas Motos Cadastradas</h1>
      <main >
        {motos.length > 0 ? (
          <ul className="listaMotos">
            {motos.map((moto) => (
              <li key={moto.id} className="motoCadastrada">
                <h3>{moto.modelo}</h3>
                <p>
                  <strong>Placa:</strong> {moto.placa}
                </p>
                {moto.cor && (
                  <p>
                    <strong>Cor:</strong> {moto.cor}
                  </p>
                )}
                {moto.ano_fabricacao && (
                  <p>
                    <strong>Ano:</strong> {moto.ano_fabricacao}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          // Mensagem para caso não haja motos cadastradas
          <p className="semMotosCadastradas">
            Você ainda não tem nenhuma moto cadastrada.
          </p>
        )}
      </main>
        <button
          className="voltarDashboard"
          onClick={() => navigate(`/dashboard/${entregadorId}`)}
        >
          VOLTAR AO DASHBOARD
        </button>
        <button
          className="botaoCadastrarNovaMoto"
          onClick={() => navigate(`/cadastro-moto/${entregadorId}`)}
        >
          CADASTRAR UMA MOTO
        </button>
    </div>
  );
};

export default MotosCadastradas;
