import { IsNotEmpty, IsUUID } from 'class-validator';

export class AceitarPedidoDto {
  @IsNotEmpty()
  @IsUUID()
  entregadorId: string;
}