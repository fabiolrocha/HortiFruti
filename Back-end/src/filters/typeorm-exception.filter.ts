//Estudar depois

import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorCode = (exception as any).code;
    const errorMessage = exception.message;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocorreu um erro interno no servidor.';

    if (errorCode === 'ER_DUP_ENTRY' || errorMessage.includes('duplicate key')) {
      status = HttpStatus.CONFLICT; // 409 Conflict
      message = 'O registro já existe. A entidade única já está cadastrada.';

      if (errorMessage.includes('placa')) {
        message = 'A placa informada já está cadastrada.';
      } else if (errorMessage.includes('cpf')) {
        message = 'O CPF informado já está cadastrado.';
      } else if (errorMessage.includes('email')) {
        message = 'O email informado já está cadastrado.';
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: HttpStatus[status],
    });
  }
}