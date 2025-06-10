import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoExpiredSessionError, Repository } from 'typeorm';
import { Moto } from './entities/moto.entity';
import { Entregador } from '../entregador/entities/entregador.entity';
import { CadastrarMotoDto } from './dto/cadastrar-moto.dto';

@Injectable()
export class MotoService {
    constructor(
        @InjectRepository(Moto)
        private readonly motoRepository: Repository<Moto>,
        @InjectRepository(Entregador)
        private readonly entregadorRepository: Repository<Entregador>,
    ) {}

    async create(
        cadastrarMotoDto: CadastrarMotoDto,
        entregadorId: string, 
    ): Promise<Moto> {
        const entregador = await this.entregadorRepository.findOneBy({
            id: entregadorId,
        });

        if (!entregador) {
            throw new NotFoundException(`Entregador com ID "${entregadorId}" não encontrado`);
        }

        const novaMoto = this.motoRepository.create({
            ...cadastrarMotoDto,
            entregador: entregador,
        });

        return this.motoRepository.save(novaMoto);
    }

    async buscarMotosPorEntregador(entregadorId: string): Promise<Moto[]> {
        return this.motoRepository.find({
            where: { 
                entregador_id: entregadorId,
            },
        });
    }
}