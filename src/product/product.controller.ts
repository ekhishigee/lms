import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { InstructorDecorator } from 'src/instructor/instructor.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Post()
  @Roles(Role.Instructor)
  create(
    @InstructorDecorator() instructor: Instructor,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.create(instructor, createProductDto);
  }
}
