import { Moto } from '../../moto/entities/moto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity'; // 1. Importe a entidade Pedido
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('entregadores')
export class Entregador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome_completo: string;

  @Column({ unique: true, length: 14 })
  cpf: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  senha: string;

  @Column({ length: 255, nullable: true })
  endereco?: string;

  @Column({ length: 20, nullable: true })
  telefone?: string;

  @CreateDateColumn()
  data_cadastro: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;

  @OneToMany(() => Moto, (moto) => moto.entregador, { nullable: true })
  motos?: Moto[];

  @OneToMany(() => Pedido, (pedido) => pedido.entregador, { nullable: true })
  pedidos: Pedido[];
}