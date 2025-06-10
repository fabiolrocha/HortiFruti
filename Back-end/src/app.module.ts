import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntregadorModule } from './entregador/entregador.module';
import { PedidosModule } from './pedidos/pedidos.module'; // Manteremos por enquanto, mas sem foco no Pedido entity
import { MotoModule } from './moto/moto.module'; // 1. Importar o MotoModule


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Ou o host do seu servidor MySQL
      port: 3306,
      username: 'root', // Seu usuário MySQL
      password: 'Rochafabio12!', // Sua senha MySQL
      database: 'hortifruti', // Nome do seu banco de dados
      // entities: [Entregador, Moto], // Lista explícita OU
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Padrão Glob para carregar automaticamente
      synchronize: true, // APENAS para desenvolvimento.
      // logging: true, // Descomente para ver as queries SQL
    }),
    AuthModule,
    EntregadorModule,
    PedidosModule, // Manter o módulo, mas a entidade Pedido não será carregada/usada agora
    MotoModule,   // 2. Adicionar MotoModule aos imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
