import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Instructor } from '../instructor/entities/instructor.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  findAll(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.courseRepository.find({
      relations: ['instructor', 'sections', 'sections.lessons', 'products'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne(id, {
      relations: ['instructor', 'sections', 'sections.lessons', 'products'],
    });
    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    return course;
  }

  async create(instructorId: number, createCourseDto: CreateCourseDto) {
    const instructor = await this.instructorRepository.findOne(instructorId);

    if (!instructor) {
      throw new NotFoundException(`Instructor #${instructorId} not found`);
    }

    const course = this.courseRepository.create({
      ...createCourseDto,
      instructor,
    });
    return this.courseRepository.save(course);
  }

  async update(
    instructorId: number,
    id: number,
    updateCourseDto: UpdateCourseDto,
  ) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException(`Course #${id} not found`);
    }

    if (course.instructor.id !== instructorId) {
      throw new BadRequestException(`Permission denied`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.courseRepository.remove(course);
  }
}
