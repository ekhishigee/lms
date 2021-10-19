import { Role } from '../../auth/roles/role.enum';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', name: 'roles', enum: Role, default: Role.Student })
  roles: Role;

  @JoinTable()
  @OneToMany(() => Subscription, (subscription) => subscription.student)
  subscriptions: Subscription[];

  @JoinTable()
  @OneToMany(() => Order, (order) => order.student)
  orders: Order[];
}
