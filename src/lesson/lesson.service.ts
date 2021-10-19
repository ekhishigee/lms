import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Section } from '../section/entities/section.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new NotFoundException(`Lesson #${id} not found`);
    }

    return lesson;
  }

  async create(instructor: Instructor, createLessonDto: CreateLessonDto) {
    const { sectionId } = createLessonDto;
    const section = await this.sectionRepository.findOne(sectionId, {
      relations: ['course', 'course.instructor'],
    });

    if (!section) {
      throw new NotFoundException(`Section #${sectionId} not found`);
    }

    if (section.course.instructor.id !== instructor.id) {
      throw new BadRequestException(`Permission denied`);
    }

    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      section,
    });
    return this.lessonRepository.save(lesson);
  }
}
