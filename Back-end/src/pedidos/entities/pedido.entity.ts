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


export enum StatusPedido {
  DISPONIVEL = 'disponivel',
  ENTREGUE = 'entregue',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ length: 255 })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor_entrega: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  distancia_km: number;

  @Column()
  endereco_origem: string;

  @Column()
  endereco_destino: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
  
  @Column({ type: 'timestamp', nullable: true })
  data_entrega: Date | null;
}
