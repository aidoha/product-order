import { IsNotEmpty } from 'class-validator';
import { ProductsType } from '../order.entity';

export class OrderDto implements Readonly<OrderDto> {
  // @IsNotEmpty()
  // time: string;

  @IsNotEmpty()
  products: Array<ProductsType>;
}
