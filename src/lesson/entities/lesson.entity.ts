import { Section } from '../../section/entities/section.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column()
  thumbnail: string;

  @Column()
  duration: string;

  @JoinTable()
  @ManyToOne(() => Section, (section) => section.lessons)
  section: Section;
}
