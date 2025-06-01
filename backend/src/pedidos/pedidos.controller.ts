import { Controller, Get, Patch, Param, Body } from '@nestjs/common';

@Controller('pedidos')
export class PedidosController {
  private pedidos = [
    { id: 1, cliente: 'João', endereco: 'Rua A', status: 'pendente' },
    { id: 2, cliente: 'Maria', endereco: 'Rua B', status: 'pendente' },
  ];

  @Get()
  findAll() {
    return this.pedidos;
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const pedido = this.pedidos.find(p => p.id === +id);
    if (pedido) {
      pedido.status = body.status;
    }
    return pedido;
  }
}