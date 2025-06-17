import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EntregadorModule } from '../entregador/entregador.module';

@Module({
  imports: [EntregadorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}