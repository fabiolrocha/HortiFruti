import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CadastrarMotoDto {
    @IsNotEmpty({message: "O modelo não pode ser vazio"})
    @IsString()
    modelo: string;

    @IsNotEmpty({message: "A placa não pode ser vazia"})
    @IsString()
    placa: string;

    @IsOptional()
    @IsString()
    cor? : string;

    @IsOptional()
    @IsNumber()
    ano_fabricacao? : number;


}