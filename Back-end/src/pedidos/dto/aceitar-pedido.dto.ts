// Back-end/src/pedidos/dto/aceitar-pedido.dto.ts

import { IsNotEmpty, IsUUID } from 'class-validator';

export class AceitarPedidoDto {
  // Usaremos camelCase (entregadorId) que é uma convenção mais comum em DTOs.
  // @IsNotEmpty garante que o campo não seja vazio.
  // @IsUUID garante que o valor seja um ID no formato UUID.
  @IsNotEmpty()
  @IsUUID()
  entregadorId: string;
}