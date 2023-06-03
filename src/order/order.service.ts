import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async create(userId: number, productIds: number[]): Promise<Order> {
    const order = new Order();
    const user = await this.userService.findById(userId);
    const products = await this.productService.findByIds(productIds);

    order.user = user;
    order.products = products;
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'products'] });
  }
}
