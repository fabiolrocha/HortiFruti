// Estudar posteriormente


import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { EntregadorService } from '../entregador/entregador.service';
import { Entregador } from '../entregador/entities/entregador.entity';
import { CadastrarEntregadorDto } from './dto/cadastrar-entregador.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly entregadorService: EntregadorService) {}

  async cadastrarEntregador(
    cadastrarEntregadorDto: CadastrarEntregadorDto,
  ): Promise<{ message: string; userId: string }> {
    const { nome_completo, cpf, email, senha, endereco, telefone } =
      cadastrarEntregadorDto;

    const existingByCpf = await this.entregadorService.findByCpf(cpf);
    if (existingByCpf) {
      throw new ConflictException('CPF já cadastrado.');
    }
    const existingByEmail = await this.entregadorService.findByEmail(email);
    if (existingByEmail) {
      throw new ConflictException('Email já cadastrado.');
    }

    try {
      // A senha é salva como texto simples, conforme solicitado para esta fase.
      const novoEntregador = await this.entregadorService.create({
        nome_completo,
        cpf,
        email,
        senha, // Salva a senha como texto simples
        endereco,
        telefone,
      });
      return {
        message: 'Entregador cadastrado com sucesso!',
        userId: novoEntregador.id,
      };
    } catch (error) {
      console.error('Erro ao salvar entregador:', error);
      throw new InternalServerErrorException('Erro ao cadastrar entregador.');
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<Omit<Entregador, 'senha'>> {
    const {cpf, senha } = loginDto;

    const entregador = await this.entregadorService.findByCpf(cpf);

    if (!entregador) {
      throw new UnauthorizedException('CPF ou senha inválidos.');
    }

    // Comparação de senha em texto simples.
    // MUITO INSEGURO PARA PRODUÇÃO! Usar bcrypt.compare em um cenário real.
    if (entregador.senha !== senha) {
      throw new UnauthorizedException('CPF ou senha inválidos.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...result } = entregador; // Remove a senha do objeto retornado
    return result;
  }
}