import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['course'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async create(instructor: Instructor, createProductDto: CreateProductDto) {
    const { courseId } = createProductDto;
    const course = await this.courseRepository.findOne(courseId, {
      relations: ['instructor'],
    });

    if (!course) {
      throw new NotFoundException(`Course #${courseId} not found`);
    }

    if (course.instructor.id !== instructor.id) {
      throw new BadRequestException(`Permission denied`);
    }

    const product = this.productRepository.create({
      ...createProductDto,
      course,
    });

    return this.productRepository.save(product);
  }
}
