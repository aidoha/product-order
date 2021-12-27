import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type ProductsType = {
  id: number;
  count: number;
};

@Entity()
export class Order {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json', { array: true })
  products: Array<ProductsType>;
}
