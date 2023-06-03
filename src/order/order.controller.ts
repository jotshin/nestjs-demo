import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders() {
    return this.orderService.findAll();
  }

  @Post()
  async createOrder(@Body() orderData: { userId: number; productIds: number[] }) {
    return this.orderService.create(orderData.userId, orderData.productIds);
  }
}
