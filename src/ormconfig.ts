import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

import { Instructor } from './instructor/entities/instructor.entity';
import { Student } from './student/entities/student.entity';
import { Course } from './course/entities/course.entity';
import { Section } from './section/entities/section.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { Product } from './product/entities/product.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/order-item.entity';
import { Payment } from './payment/entities/payment.entity';

export const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Instructor,
    Student,
    Course,
    Section,
    Lesson,
    Product,
    Subscription,
    Order,
    OrderItem,
    Payment,
  ],
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  logging: ['warn', 'error'],
  logger: 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
