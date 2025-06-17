import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moto } from './entities/moto.entity';
import { MotoService } from './moto.service';
import { MotoController } from './moto.controller';
import { Entregador } from 'src/entregador/entities/entregador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moto, Entregador])],
  providers: [MotoService],
  controllers: [MotoController], 
  exports: [TypeOrmModule],
})
export class MotoModule {}
