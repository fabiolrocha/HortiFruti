import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entregador } from './entities/entregador.entity';

interface CreateEntregadorData {
  nome_completo: string;
  cpf: string;
  email: string;
  senha: string;
  endereco?: string;
  telefone?: string;
}

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private readonly entregadorRepository: Repository<Entregador>,
  ) {}

  async create(data: CreateEntregadorData): Promise<Entregador> {
    const novoEntregador = this.entregadorRepository.create(data);
    return this.entregadorRepository.save(novoEntregador);
  }

  async findById(cpf: string): Promise<Entregador | null> {
    return this.entregadorRepository.findOne({
      where: { cpf },
    });
  }

  async findByCpf(cpf: string): Promise<Entregador | null> {
    return this.entregadorRepository.findOne({ where: { cpf } });
  }

  async findByEmail(email: string): Promise<Entregador | null> {
    return this.entregadorRepository.findOne({
      where: { email },
    });
  }

  async getEntregadorById(id: string): Promise<Entregador | null> {
    const entregador = await this.findById(id);
    if (!entregador) {
      throw new NotFoundException(`Entregador com ID ${id} não encontrado.`);
    }
    return entregador;
  }
}
