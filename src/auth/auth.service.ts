import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from './roles/role.enum';
import { ENV } from '../constants/common.constants';
import { InstructorService } from '../instructor/instructor.service';

import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginInstructorDto } from '../instructor/dto/login-instructor.dto';
import { StudentService } from '../student/student.service';
import { LoginStudentDto } from '../student/dto/login-student.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateInstructor(email: string, password: string): Promise<any> {
    const user = await this.instructorService.findByEmail(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      return isPasswordMatch ? user : null;
    }

    return null;
  }

  async validateStudent(email: string, password: string): Promise<any> {
    const user = await this.studentService.findByEmail(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      return isPasswordMatch ? user : null;
    }

    return null;
  }

  async instructorLogin(instructor: LoginInstructorDto) {
    const isValidInstructor = await this.validateInstructor(
      instructor.email,
      instructor.password,
    );
    if (isValidInstructor && isValidInstructor.roles == Role.Instructor) {
      return this.returnJwt(
        isValidInstructor.email,
        isValidInstructor.roles,
        isValidInstructor.id,
      );
    } else {
      throw new HttpException(
        'Email or password does NOT match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async studentLogin(instructor: LoginStudentDto) {
    const isValidStudent = await this.validateStudent(
      instructor.email,
      instructor.password,
    );
    if (isValidStudent && isValidStudent.roles == Role.Student) {
      return this.returnJwt(
        isValidStudent.email,
        isValidStudent.roles,
        isValidStudent.id,
      );
    } else {
      throw new HttpException(
        'Email or password does NOT match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const decoded = await this.jwtService.verify(
        refreshTokenDto.refreshToken,
      );
      const accessToken = this.jwtService.sign(
        { email: decoded.email, role: decoded.role, id: decoded.id },
        { expiresIn: this.configService.get(ENV.JWT_EXPIRATION) },
      );
      return { payload: accessToken };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }
  }

  async returnJwt(email: string, roles: string, id: number) {
    const accessToken = this.jwtService.sign({
      email: email,
      role: roles,
      id: id,
    });
    const refreshToken = this.jwtService.sign(
      { email: email, role: roles, id: id },
      { expiresIn: this.configService.get(ENV.JWT_REFRESH_EXPIRATION) },
    );

    return {
      payload: { accessToken: accessToken, refreshToken: refreshToken },
    };
  }

  // Decode any jwt to get expiration
  decodeJwt(token: string) {
    const decoded = this.jwtService.decode(token);

    return { decoded };
  }
}
