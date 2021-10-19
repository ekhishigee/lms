import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.constants';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { Instructor } from '../instructor/entities/instructor.entity';
import { InstructorDecorator } from '../instructor/instructor.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Public()
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.courseService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(+id);
  }

  @Post()
  @Roles(Role.Instructor)
  create(
    @InstructorDecorator() instructor: Instructor,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.courseService.create(instructor.id, createCourseDto);
  }

  @Patch(':id')
  @Roles(Role.Instructor)
  update(
    @InstructorDecorator() instructor: Instructor,
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(instructor.id, +id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.Instructor)
  remove(@Param('id') id: number) {
    return this.courseService.remove(+id);
  }
}
