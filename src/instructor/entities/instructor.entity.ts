import { Course } from '../../course/entities/course.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../auth/roles/role.enum';

@Entity()
export class Instructor {
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

  @Column()
  bio: string;

  @Column()
  type: string;

  @Column({ type: 'enum', name: 'roles', enum: Role, default: Role.Instructor })
  roles: Role;

  @JoinTable()
  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
}
