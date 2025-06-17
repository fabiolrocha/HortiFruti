import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Pedido, StatusPedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  // Buscar todos os pedidos que ainda estão disponíveis
  async findDisponiveis(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { status: StatusPedido.DISPONIVEL },
      order: { data_criacao: 'ASC' },
    });
  }

  // Buscar o histórico de um entregador
  async findHistoricoDoEntregador(entregadorId: string): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: {
        entregador_id: entregadorId,
        status: StatusPedido.ENTREGUE,
      },
      order: { data_entrega: 'DESC' },
    });
  }

  // Marcar um pedido como ENTREGUE e enviar ao historico do entregador
  async marcarComoEntregue(
    pedidoId: string,
    entregadorId: string,
  ): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (!pedido) {
      throw new NotFoundException(
        `Pedido com ID "${pedidoId}" não encontrado.`,
      );
    }

    if (pedido.status !== StatusPedido.DISPONIVEL) {
      throw new ConflictException(`Este pedido não está mais disponível.`);
    }

    pedido.entregador_id = entregadorId;
    pedido.status = StatusPedido.ENTREGUE;
    pedido.data_entrega = new Date();

    return this.pedidoRepository.save(pedido);
  }

  // Método para obter as métricas do entregador que ficam no Dashboard
  async getMetricas(entregadorId: string) {
    // --- Renda Mensal ---
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    const pedidosMes = await this.pedidoRepository.find({
      where: {
        entregador_id: entregadorId,
        status: StatusPedido.ENTREGUE,
        data_entrega: Between(primeiroDiaMes, ultimoDiaMes),
      },
    });

    const rendaMensal = pedidosMes.reduce(
      (soma, pedido) => soma + Number(pedido.valor_entrega),
      0,
    );

    // --- Quilometragem Semanal ---
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);

    const pedidosSemana = await this.pedidoRepository.find({
      where: {
        entregador_id: entregadorId,
        status: StatusPedido.ENTREGUE,
        data_entrega: Between(umaSemanaAtras, hoje),
      },
    });

    const quilometragemSemanal = pedidosSemana.reduce(
      (soma, pedido) => soma + Number(pedido.distancia_km),
      0,
    );

    // --- Pedidos em Espera ---
    const pedidosEmEspera = await this.pedidoRepository.count({
      where: {
        status: StatusPedido.DISPONIVEL,
      },
    });

    // --- Histórico de Entregas ---
    const historicoEntregas = await this.pedidoRepository.count({
      where: {
        entregador_id: entregadorId,
        status: StatusPedido.ENTREGUE,
      },
    });

    return {
      rendaMensal,
      quilometragemSemanal,
      pedidosEmEspera,
      historicoEntregas,
    };
  }

  // Método para buscar o os dados de renda mensal para o grafico
  async getDadosGraficoRendaMensal(entregadorId: string) {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    const diasNoMes = ultimoDiaMes.getDate();

    const pedidosMes = await this.pedidoRepository.find({
      where: {
        entregador_id: entregadorId,
        status: StatusPedido.ENTREGUE,
        data_entrega: Between(primeiroDiaMes, ultimoDiaMes),
      },
    });

    const dadosRenda = Array(diasNoMes).fill(0);
    const labels = Array.from({ length: diasNoMes }, (_, i) => `${i + 1}`);

    pedidosMes.forEach((pedido) => {
      if (pedido.data_entrega) {
        const diaDaEntrega = pedido.data_entrega.getDate() - 1;
        dadosRenda[diaDaEntrega] += Number(pedido.valor_entrega);
      }
    });

    return { labels, dados: dadosRenda };
  }

  // Método para buscar o os dados de quilometragem semana para o grafico
  async getDadosGraficoQuilometragemSemanal(entregadorId: string) {
    const hoje = new Date();
    const labels: string[] = [];
    const dadosKm = Array(7).fill(0);

    for (let i = 6; i >= 0; i--) {
      const dia = new Date();
      dia.setDate(hoje.getDate() - i);

      labels.push(
        dia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      );

      const inicioDoDia = new Date(dia.setHours(0, 0, 0, 0));
      const fimDoDia = new Date(dia.setHours(23, 59, 59, 999));

      const pedidosDia = await this.pedidoRepository.find({
        where: {
          entregador_id: entregadorId,
          status: StatusPedido.ENTREGUE,
          data_entrega: Between(inicioDoDia, fimDoDia),
        },
      });

      const kmDoDia = pedidosDia.reduce(
        (soma, pedido) => soma + Number(pedido.distancia_km),
        0,
      );
      dadosKm[6 - i] = kmDoDia;
    }

    return { labels: labels.reverse(), dados: dadosKm.reverse() };
  }

  // O método de seed para criar dados de teste
  async seed(entregadorId: string): Promise<string> {
    await this.pedidoRepository.delete({ entregador_id: entregadorId });
    await this.pedidoRepository.delete({ status: StatusPedido.DISPONIVEL });

    // --- Pedidos já Entregues ---
    const pedidosEntreguesSeed: Partial<Pedido>[] = [];
    const hoje = new Date();

    for (let i = 0; i < 15; i++) {
      const dataAleatoria = new Date();
      dataAleatoria.setDate(hoje.getDate() - Math.floor(Math.random() * 60));

      pedidosEntreguesSeed.push({
        descricao: `Entrega Concluída de Teste #${i + 1}`,
        valor_entrega: parseFloat((Math.random() * (30 - 10) + 10).toFixed(2)),
        distancia_km: parseFloat((Math.random() * (20 - 2) + 2).toFixed(2)),
        endereco_origem: 'Centro de Distribuição',
        endereco_destino: `Endereço Cliente de Teste ${i + 1}`,
        status: StatusPedido.ENTREGUE,
        entregador_id: entregadorId,
        data_entrega: dataAleatoria,
      });
    }

    // --- Pedidos Disponíveis ---
    const pedidosDisponiveisSeed: Partial<Pedido>[] = [
      {
        descricao: 'Caixa de Maçãs Gala (Pública)',
        valor_entrega: 14.5,
        distancia_km: 6.8,
        endereco_origem: 'Depósito A',
        endereco_destino: 'Mercado Central',
      },
      {
        descricao: 'Sacos de Batata Asterix (Pública)',
        valor_entrega: 22.0,
        distancia_km: 12.3,
        endereco_origem: 'Depósito A',
        endereco_destino: 'Restaurante Sabor',
      },
      {
        descricao: 'Bandejas de Morango (Pública)',
        valor_entrega: 18.75,
        distancia_km: 9.1,
        endereco_origem: 'Fazenda Feliz',
        endereco_destino: 'Confeitaria Doce',
      },
      {
        descricao: 'Engradado de Ovos (Pública)',
        valor_entrega: 11.2,
        distancia_km: 4.5,
        endereco_origem: 'Granja da Serra',
        endereco_destino: 'Padaria Pão Quente',
      },
      {
        descricao: 'Alfaces e Rúculas (Pública)',
        valor_entrega: 9.8,
        distancia_km: 3.2,
        endereco_origem: 'Horta Fresca',
        endereco_destino: 'Saladaria Leve',
      },
      {
        descricao: 'Garrafas de Suco Natural (Pública)',
        valor_entrega: 25.0,
        distancia_km: 15.0,
        endereco_origem: 'Fábrica de Sucos',
        endereco_destino: 'Empório Saúde',
      },
      {
        descricao: 'Queijo Minas Frescal (Pública)',
        valor_entrega: 16.4,
        distancia_km: 8.5,
        endereco_origem: 'Laticínio da Vila',
        endereco_destino: 'Delicatessen Bom Gosto',
      },
    ];

    await this.pedidoRepository.save([
      ...pedidosEntreguesSeed,
      ...pedidosDisponiveisSeed,
    ]);

    const total = pedidosEntreguesSeed.length + pedidosDisponiveisSeed.length;
    return `${total} pedidos de teste foram criados com sucesso. ${pedidosEntreguesSeed.length} foram atribuídos a você.`;
  }
}
