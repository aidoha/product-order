import { ProductsType } from '../order.entity';

export interface Order {
  id?: number;
  // time: string;
  products: Array<ProductsType>;
}
