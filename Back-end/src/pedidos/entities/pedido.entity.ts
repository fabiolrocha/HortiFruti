// Back-end/src/pedidos/entities/pedido.entity.ts

import { Entregador } from '../../entregador/entities/entregador.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Enum para padronizar os status dos pedidos
export enum StatusPedido {
  DISPONIVEL = 'disponivel',
  ACEITO = 'aceito',
  COLETADO = 'coletado',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}

@Entity('pedidos') // Nome da tabela no banco de dados
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relacionamento: Muitos Pedidos podem pertencer a um Entregador.
  // 'nullable: true' significa que um pedido pode existir sem um entregador associado (ex: um pedido disponível).
  @ManyToOne(() => Entregador, (entregador) => entregador.pedidos, { nullable: true })
  @JoinColumn({ name: 'entregador_id' })
  entregador: Entregador;

  @Column({ type: 'uuid', nullable: true })
  entregador_id: string | null;

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.DISPONIVEL,
  })
  status: StatusPedido;

  // Campo para uma breve descrição do pedido ou do serviço.
  @Column({ length: 255 })
  descricao: string;

  // Valor que o entregador receberá pela entrega. Essencial para a Renda Mensal.
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor_entrega: number;

  // Distância do percurso. Essencial para a Quilometragem Semanal.
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  distancia_km: number;

  @Column()
  endereco_origem: string;

  @Column()
  endereco_destino: string;

  @CreateDateColumn()
  data_criacao: Date; // Quando o pedido foi criado no sistema.

  @UpdateDateColumn()
  data_atualizacao: Date; // Quando o status do pedido foi atualizado pela última vez.

  @Column({ type: 'timestamp', nullable: true })
  data_entrega: Date | null; // Data e hora exatas em que o pedido foi marcado como "Entregue".
}
