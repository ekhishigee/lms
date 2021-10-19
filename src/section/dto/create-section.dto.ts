import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
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
    description: 'Section name',
    example: 'Section name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Section description',
    example: 'Section description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
}
