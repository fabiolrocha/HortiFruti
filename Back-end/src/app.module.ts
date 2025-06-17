import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntregadorModule } from './entregador/entregador.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MotoModule } from './moto/moto.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Host do seu banco de dados MySQL
      port: 3306,
      username: 'root', // Seu usuário MySQL
      password: 'Rochafabio12!', // Sua senha MySQL
      database: 'hortifruti', // Nome do seu banco de dados
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

    }),
    AuthModule,
    EntregadorModule,
    PedidosModule,
    MotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
