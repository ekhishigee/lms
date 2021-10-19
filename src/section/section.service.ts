import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findOne(id: number) {
    const section = await this.sectionRepository.findOne(id, {
      relations: ['lessons'],
    });

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

    return section;
  }

  async create(instructor: Instructor, createSectionDto: CreateSectionDto) {
    const { courseId } = createSectionDto;
    const course = await this.courseRepository.findOne(courseId, {
      relations: ['instructor'],
    });

    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    if (course.instructor.id !== instructor.id) {
      throw new BadRequestException(`Permission denied`);
    }

    const section = this.sectionRepository.create({
      ...createSectionDto,
      course,
    });
    return this.sectionRepository.save(section);
  }
}
