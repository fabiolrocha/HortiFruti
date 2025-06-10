// Estudar posteriormente


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

@Entity('motos') // Nome da tabela no banco de dados
export class Moto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relacionamento: Muitas Motos pertencem a um Entregador
  @ManyToOne(() => Entregador, (entregador) => entregador.motos, { onDelete: 'CASCADE' }) // onDelete CASCADE para remover motos se o entregador for removido
  @JoinColumn({ name: 'entregador_id' }) // Define a coluna da chave estrangeira
  entregador: Entregador;

  @Column() // Coluna explícita para o ID do entregador para facilitar queries se necessário
  entregador_id: string;

  @Column({ length: 50 }) // Modelo da moto
  modelo: string;

  @Column({ unique: true, length: 10 }) // Placa única
  placa: string;

  @Column({ length: 30, nullable: true }) // Cor da moto (opcional)
  cor?: string;

  @Column({ nullable: true }) // URL/caminho para o documento (opcional)
  documento_url?: string;

  @Column({ nullable: true }) // Ano de fabricação (opcional)
  ano_fabricacao?: number;

  @CreateDateColumn()
  data_cadastro: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;
}