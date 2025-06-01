import { Test, TestingModule } from '@nestjs/testing';
import { EntregadorController } from './entregador.controller';

describe('EntregadorController', () => {
  let controller: EntregadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregadorController],
    }).compile();

    controller = module.get<EntregadorController>(EntregadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
