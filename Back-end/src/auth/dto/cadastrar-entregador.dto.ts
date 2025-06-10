// Estudar posteriormente

import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional, isNotEmpty, isString } from 'class-validator';

export class CadastrarEntregadorDto{
    @IsNotEmpty({message: 'O nome completo não pode estar vazio.'})
    @IsString()
    nome_completo: string;

    @IsNotEmpty({message: 'O CPF não pode estar vazio. '})
    @IsString()
    cpf: string;

    @IsNotEmpty({message: 'O Email não pode ser vazio.'})
    @IsEmail({},{message: 'Formato do email é invalido.'})
    email: string;

    @IsNotEmpty({ message: 'A senha nao pode estar vazia.'})
    @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres.'})
    senha: string;

    @IsOptional()
    @IsString()
    endereco?: string;

    @IsOptional()
    @IsString()
    telefone?: string;
}