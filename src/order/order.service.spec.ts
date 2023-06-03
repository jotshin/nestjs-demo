import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockImplementation((order) => Promise.resolve({ id: 1, ...order })),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn().mockResolvedValue(new User()),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findByIds: jest.fn().mockResolvedValue([new Product()]),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const order = await service.create(1, [1]);
    expect(order).toBeDefined();
    expect(order.id).toBe(1);
  });
});
