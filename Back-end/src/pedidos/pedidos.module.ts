// Back-end/src/pedidos/pedidos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity'; // Importe a entidade
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])], // Registre a entidade Pedido neste módulo
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}