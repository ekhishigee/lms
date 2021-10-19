import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @JoinTable()
  @ManyToOne(() => Student, (student) => student.subscriptions)
  student: Student;

  @JoinTable()
  @ManyToOne(() => Course, (course) => course.subscriptions)
  course: Course;
}
