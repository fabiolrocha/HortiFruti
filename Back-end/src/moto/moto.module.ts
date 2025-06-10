// Estudar posteriormente

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moto } from './entities/moto.entity';
import { MotoService } from './moto.service';
import { MotoController } from './moto.controller';
import { Entregador } from 'src/entregador/entities/entregador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moto, Entregador])], // Registra a entidade Moto neste módulo
  providers: [MotoService], // Adicionar quando criar o service
  controllers: [MotoController], // Adicionar quando criar o controller
  exports: [TypeOrmModule], // Exporta TypeOrmModule para outros módulos que precisem da entidade Moto
})
export class MotoModule {}
