import { Test, TestingModule } from '@nestjs/testing';
import { NavbarController } from './navbar.controller';

describe('NavbarController', () => {
  let controller: NavbarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavbarController],
    }).compile();

    controller = module.get<NavbarController>(NavbarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
