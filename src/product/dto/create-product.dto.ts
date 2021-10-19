import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: Number,
    description: 'Course id',
    example: 'Course id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly courseId: number;

  @ApiProperty({
    type: String,
    description: 'Product subscription type',
    example: '1 month',
  })
  @IsNotEmpty()
  @IsString()
  readonly subscriptionType: string;

  @ApiProperty({
    type: Number,
    description: 'Product price',
    example: '100000',
  })
  @IsNumber()
  @IsPositive()
  @IsString()
  readonly price: number;

  @ApiProperty({
    type: Number,
    description: 'Product discounted price',
    example: '80000',
  })
  @IsNumber()
  @IsPositive()
  @IsString()
  readonly discountedPrice: number;
}
