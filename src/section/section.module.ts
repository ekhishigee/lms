import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { Section } from './entities/section.entity';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Section])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
