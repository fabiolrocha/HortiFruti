// Estudar posteriormente


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Certifique-se que está importado
import { Entregador } from './entities/entregador.entity'; // Importe a entidade
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entregador])], // Registra a entidade Entregador
  controllers: [EntregadorController], // Adiciona o controller
  providers: [EntregadorService], // Adiciona o service
  exports: [EntregadorService], // Pode ser útil exportar o service
})
export class EntregadorModule {}
