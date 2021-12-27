import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { Order } from './interfaces/order.interface';
import { Order as OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async create(createOrderDto: OrderDto) {
    return await this.orderRepository.save(
      plainToInstance(OrderEntity, createOrderDto),
    );
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const foundOrder = await this.orderRepository.findOne({
      where: { id },
    });
    if (foundOrder) {
      return foundOrder;
    }
    throw new NotFoundException();
  }

  async update(id: number, updateOrderDto: OrderDto) {
    const updateOrder = await this.findOne(id);
    // updateOrder.time = updateOrderDto.time;
    updateOrder.products = updateOrderDto.products;
    return await this.orderRepository.save(updateOrder);
  }

  async delete(id: number): Promise<void> {
    const deleteOrder = await this.findOne(id);
    await this.orderRepository.delete(deleteOrder);
  }
}
