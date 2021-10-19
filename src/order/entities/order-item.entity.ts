import { Product } from 'src/product/entities/product.entity';
import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @JoinTable()
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
