import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { Instructor } from '../instructor/entities/instructor.entity';
import { InstructorDecorator } from '../instructor/instructor.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Post()
  @Roles(Role.Instructor)
  create(
    @InstructorDecorator() instructor: Instructor,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonService.create(instructor, createLessonDto);
  }
}
