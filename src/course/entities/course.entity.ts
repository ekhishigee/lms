import { Instructor } from '../../instructor/entities/instructor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from '../../section/entities/section.entity';
import { Product } from '../../product/entities/product.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: string;

  @Column()
  lessons: number;

  @Column()
  thumbnailUrl: string;

  @Column('json', { nullable: true })
  tags: string[];

  @JoinTable()
  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  instructor: Instructor;

  @JoinTable()
  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];

  @JoinTable()
  @OneToMany(() => Product, (product) => product.course)
  products: Product[];

  @JoinTable()
  @OneToMany(() => Subscription, (subscription) => subscription.course)
  subscriptions: Subscription[];
}
