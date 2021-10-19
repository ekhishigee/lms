import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.constants';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LoginStudentDto } from './dto/login-student.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterStudentDto) {
    return this.studentService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginStudentDto) {
    return this.authService.studentLogin(loginDto);
  }
}
