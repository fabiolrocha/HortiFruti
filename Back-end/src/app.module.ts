import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { EntregadorModule } from './entregador/entregador.module';

@Module({
  imports: [AuthModule, PedidosModule, EntregadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
