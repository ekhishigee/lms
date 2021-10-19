import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Student } from './entities/student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findByEmail(email: string) {
    const student = await this.studentRepository.findOne({
      where: { email },
    });

    if (!student) {
      throw new NotFoundException(`Student ${email} not found`);
    }

    return student;
  }

  async register(registerStudentDto: RegisterStudentDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerStudentDto.password, salt);

    const instructor = this.studentRepository.create({
      ...registerStudentDto,
      password: hashedPassword,
    });
    return this.studentRepository.save(instructor);
  }
}
