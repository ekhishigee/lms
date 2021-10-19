import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { Instructor } from '../instructor/entities/instructor.entity';
import { InstructorDecorator } from '../instructor/instructor.decorator';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionService } from './section.service';

@Controller('sections')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Post()
  @Roles(Role.Instructor)
  create(
    @InstructorDecorator() instructor: Instructor,
    @Body() createSectionDto: CreateSectionDto,
  ) {
    return this.sectionService.create(instructor, createSectionDto);
  }
}
