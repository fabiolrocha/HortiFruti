import { Controller, Get, Param } from '@nestjs/common';

@Controller('entregador')
export class EntregadorController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id, nome: 'Carlos Entregador', veiculo: 'Moto' };
  }
}