import { Payment } from 'src/payment/entities/payment.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderDate: Date;

  @JoinTable()
  @ManyToOne(() => Student, (student) => student.orders)
  student: Student;

  @JoinTable()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @JoinTable()
  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}
