// Estudar posteriormente


import { Moto } from '../../moto/entities/moto.entity'; // Ajuste o caminho conforme sua estrutura de pastas
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('entregadores') // Nome da tabela no banco de dados
export class Entregador {
  @PrimaryGeneratedColumn('uuid') // Chave primária com UUID gerado automaticamente
  id: string;

  @Column({ length: 100 })
  nome_completo: string;

  @Column({ unique: true, length: 14 }) // CPF único (considerando máscara)
  cpf: string;

  @Column({ unique: true, length: 100 }) // Email único
  email: string;

  @Column() // Senha armazenada como texto simples
  senha: string;

  @Column({ length: 255, nullable: true}) // Endereço como "rua e número juntos"
  endereco?: string;

  @Column({ length: 20, nullable: true}) // Telefone
  telefone?: string;

  @CreateDateColumn() // Data de cadastro gerada automaticamente
  data_cadastro: Date;

  @UpdateDateColumn() // Data de atualização gerada automaticamente
  data_atualizacao: Date;

  // Relacionamento: Um Entregador pode ter várias Motos
  @OneToMany(() => Moto, (moto) => moto.entregador, { nullable: true })
  motos?: Moto[];

  // Relacionamento com Pedidos será adicionado futuramente
  // @OneToMany(() => Pedido, (pedido) => pedido.entregador)
  // pedidos_realizados: Pedido[];
}