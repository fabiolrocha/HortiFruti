
import { Entregador } from '../../entregador/entities/entregador.entity'; // Ajuste o caminho
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('motos')
export class Moto {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ManyToOne(() => Entregador, (entregador) => entregador.motos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entregador_id' })
  entregador: Entregador;

  @Column()
  entregador_id: string;

  @Column({ length: 50 })
  modelo: string;

  @Column({ unique: true, length: 10 })
  placa: string;

  @Column({ length: 30, nullable: true })
  cor?: string;

  @Column({ nullable: true })
  documento_url?: string;

  @Column({ nullable: true })
  ano_fabricacao?: number;

  @CreateDateColumn()
  data_cadastro: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}