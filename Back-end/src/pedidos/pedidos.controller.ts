// Back-end/src/pedidos/pedidos.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { AceitarPedidoDto } from './dto/aceitar-pedido.dto'; // 1. Importe o novo DTO

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('seed')
  @HttpCode(HttpStatus.OK)
  seed() {
    return this.pedidosService.seed();
  }

  @Get('disponiveis')
  findAvailable() {
    return this.pedidosService.findAvailable();
  }

  // ↓↓↓↓↓↓ A CORREÇÃO ESTÁ AQUI ↓↓↓↓↓↓
  @Patch(':pedidoId/aceitar')
  accept(
    @Param('pedidoId', ParseUUIDPipe) pedidoId: string,
    @Body() aceitarPedidoDto: AceitarPedidoDto, // 2. Use o novo DTO validado
  ) {
    // 3. Acesse a propriedade correta do DTO (entregadorId)
    return this.pedidosService.accept(pedidoId, aceitarPedidoDto.entregadorId);
  }
  // ↑↑↑↑↑↑ FIM DA CORREÇÃO ↑↑↑↑↑↑

  @Get('entregador/:entregadorId')
  findHistoryByEntregador(
    @Param('entregadorId', ParseUUIDPipe) entregadorId: string,
  ) {
    return this.pedidosService.findHistoryByEntregador(entregadorId);
  }
}