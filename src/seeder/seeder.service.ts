import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class SeederService {
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  async seed() {
    for (let i = 0; i < 10; i++) {
      await this.userService.create(`User${i}`);
      await this.productService.create(`Product${i}`, i * 10);
      await this.orderService.create(i + 1, [i + 1]);
    }
  }
}
