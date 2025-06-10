// Estudar posteriormente

import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'O cpf não pode estar vazio.'})
    @IsString()
    cpf: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia.'})
    @IsString()
    senha: string;
}