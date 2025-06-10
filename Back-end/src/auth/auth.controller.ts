// Estudar posteriormente


import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastrarEntregadorDto } from './dto/cadastrar-entregador.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastro')
  @HttpCode(HttpStatus.CREATED)
  async cadastrar(
    @Body() cadastrarEntregadorDto: CadastrarEntregadorDto,
  ): Promise<{ message: string; userId: string }> {
    return this.authService.cadastrarEntregador(cadastrarEntregadorDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // O tipo de retorno será Omit<Entregador, 'senha'>
    return this.authService.login(loginDto);
  }
}