import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegisterInstructorDto } from './dto/register-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  findAll() {
    return this.instructorRepository.find({
      select: ['id', 'name', 'email', 'bio', 'avatar', 'roles', 'courses'],
      relations: ['courses'],
    });
  }

  async findByEmail(email: string) {
    const instructor = await this.instructorRepository.findOne({
      where: { email },
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor ${email} not found`);
    }

    return instructor;
  }

  async findOne(id: number) {
    const instructor = await this.instructorRepository.findOne(id);

    if (!instructor) {
      throw new NotFoundException(`Instructor #${id} not found`);
    }

    return instructor;
  }

  async register(registerInstructorDto: RegisterInstructorDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      registerInstructorDto.password,
      salt,
    );

    const instructor = this.instructorRepository.create({
      ...registerInstructorDto,
      password: hashedPassword,
    });
    return this.instructorRepository.save(instructor);
  }

  async courses(instructorId: number) {
    const instructor = await this.instructorRepository.findOne(+instructorId, {
      relations: ['courses', 'courses.sections', 'courses.sections.lessons'],
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor #${instructorId} not found`);
    }

    return instructor.courses;
  }
}
