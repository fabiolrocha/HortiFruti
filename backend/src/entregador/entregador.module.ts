import { Module } from '@nestjs/common';
import { EntregadorController } from './entregador.controller';
import { EntregadorService } from './entregador.service';

@Module({
  controllers: [EntregadorController],
  providers: [EntregadorService]
})
export class EntregadorModule {}
