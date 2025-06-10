import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { MotoService } from './moto.service';
import { CadastrarMotoDto} from './dto/cadastrar-moto.dto';

@Controller('moto')
export class MotoController {
    constructor(private readonly motoService: MotoService) {}

    @Post('entregador/:entregadorId')
    create(
        @Param('entregadorId', ParseUUIDPipe) entregadorId: string,
        @Body() cadastrarMotoDto: CadastrarMotoDto,
    ) {
        return this.motoService.create(cadastrarMotoDto, entregadorId);
    }

    @Get ('entregador/:entregadorId')
    buscarMotosPorEntregador(
        @Param('entregadorId', ParseUUIDPipe) entregadorId: string) {
            return this.motoService.buscarMotosPorEntregador(entregadorId)
        }

}