import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  @Column()
  status: boolean;

  @Column()
  total: number;

  @Column()
  paymentDate: Date;
}
