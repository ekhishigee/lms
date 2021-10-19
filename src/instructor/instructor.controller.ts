import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { Public } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LoginInstructorDto } from './dto/login-instructor.dto';
import { RegisterInstructorDto } from './dto/register-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { InstructorDecorator } from './instructor.decorator';
import { InstructorService } from './instructor.service';

@Controller('instructors')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('instructors')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.instructorService.findAll();
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterInstructorDto) {
    return this.instructorService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginInstructorDto) {
    return this.authService.instructorLogin(loginDto);
  }

  @Get('/courses')
  @Roles(Role.Instructor)
  courses(@InstructorDecorator() instructor: Instructor) {
    return this.instructorService.courses(instructor.id);
  }
}
