import { Course } from '../../course/entities/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscriptionType: string;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @JoinTable()
  @ManyToOne(() => Course, (course) => course.products)
  course: Course;

  @JoinTable()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
