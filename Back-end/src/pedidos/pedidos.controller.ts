import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Rota para buscar pedidos disponíveis para todos
  @Get('disponiveis')
  findDisponiveis() {
    return this.pedidosService.findDisponiveis();
  }

  // Rota para buscar o histórico de um entregador específico
  @Get('historico/:entregadorId')
  findHistoricoDoEntregador(
    @Param('entregadorId', ParseUUIDPipe) entregadorId: string,
  ) {
    return this.pedidosService.findHistoricoDoEntregador(entregadorId);
  }

  // Rota para buscar as métricas de um entregador
  @Get('metricas/:entregadorId')
  getMetricas(@Param('entregadorId', ParseUUIDPipe) entregadorId: string) {
    return this.pedidosService.getMetricas(entregadorId);
  }

  // Rota para marcar um pedido como entregue
  @Patch(':pedidoId/disponiveis')
  marcarComoEntregue(
    @Param('pedidoId', ParseUUIDPipe) pedidoId: string,
    @Body() body: { entregadorId: string },
  ) {
    return this.pedidosService.marcarComoEntregue(pedidoId, body.entregadorId);
  }

  // Rota para buscar dados do gráfico de renda mensal
  @Get('grafico/renda-mensal/:entregadorId')
  getDadosGraficoRendaMensal(
    @Param('entregadorId', ParseUUIDPipe) entregadorId: string,
  ) {
    return this.pedidosService.getDadosGraficoRendaMensal(entregadorId);
  }

  // Rota para buscar dados do gráfico de quilometragem semanal
  @Get('grafico/quilometragem/:entregadorId')
  getDadosGraficoQuilometragemSemanal(
    @Param('entregadorId', ParseUUIDPipe) entregadorId: string,
  ) {
    return this.pedidosService.getDadosGraficoQuilometragemSemanal(
      entregadorId,
    );
  }

  @Post('seed/:entregadorId')
  seed(@Param('entregadorId', ParseUUIDPipe) entregadorId: string) {
    return this.pedidosService.seed(entregadorId);
  }
}
