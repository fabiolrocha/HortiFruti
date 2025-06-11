// Back-end/src/pedidos/pedidos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, StatusPedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  // Método para listar todos os pedidos disponíveis
  async findAvailable(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { status: StatusPedido.DISPONIVEL },
    });
  }

  // Método para um entregador aceitar um pedido
  async accept(pedidoId: string, entregadorId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID "${pedidoId}" não encontrado.`);
    }

    // Futuramente, adicionar uma lógica para verificar se o pedido já foi aceito

    pedido.entregador_id = entregadorId;
    pedido.status = StatusPedido.ACEITO;

    return this.pedidoRepository.save(pedido);
  }

  // Método para listar o histórico de pedidos de um entregador
  async findHistoryByEntregador(entregadorId: string): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { entregador_id: entregadorId },
      order: { data_criacao: 'DESC' }, // Ordena pelos mais recentes primeiro
    });
  }

  // --- Método de auxílio para popular o banco com dados de teste ---
  // Este método não será exposto em uma rota pública,
  // podemos chamá-lo internamente ou de um script para criar dados falsos.
  async seed(): Promise<string> {
    const count = await this.pedidoRepository.count();
    if (count > 0) {
      return 'O banco de dados de pedidos já está populado.';
    }

    const pedidosSeed: Partial<Pedido>[] = [
      {
        descricao: 'Entrega de Cesta de Frutas - Cliente A',
        valor_entrega: 15.5,
        distancia_km: 7.2,
        endereco_origem: 'Rua das Maçãs, 123',
        endereco_destino: 'Avenida das Peras, 456',
        status: StatusPedido.DISPONIVEL,
      },
      {
        descricao: 'Entrega de Verduras - Cliente B',
        valor_entrega: 12.0,
        distancia_km: 5.1,
        endereco_origem: 'Rua das Maçãs, 123',
        endereco_destino: 'Rua dos Limões, 789',
        status: StatusPedido.DISPONIVEL,
      },
      {
        descricao: 'Caixa de Tomates - Cliente C',
        valor_entrega: 18.0,
        distancia_km: 10.5,
        endereco_origem: 'Rua das Maçãs, 123',
        endereco_destino: 'Alameda das Bananas, 101',
        status: StatusPedido.DISPONIVEL,
      },
      // Pedido já entregue para o dashboard
      {
        descricao: 'Cesta de Orgânicos - Cliente D',
        valor_entrega: 25.75,
        distancia_km: 15.3,
        endereco_origem: 'Rua das Maçãs, 123',
        endereco_destino: 'Praça das Uvas, 202',
        status: StatusPedido.ENTREGUE,
        // Em um caso real, o entregador_id seria o de um usuário existente
        entregador_id: null, // Deixamos nulo por enquanto
        data_entrega: new Date(),
      },
    ];

    await this.pedidoRepository.save(pedidosSeed);
    return `${pedidosSeed.length} pedidos de teste foram criados com sucesso.`;
  }
}