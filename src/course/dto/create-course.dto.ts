import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: 'Course name',
    example: 'Course name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Course description',
    example: 'Course description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: String,
    description: 'Course duration',
    example: '00:38',
  })
  @IsNotEmpty()
  @IsString()
  readonly duration: string;

  @ApiProperty({
    type: String,
    description: 'Course lessons',
    example: '14',
  })
  @IsNotEmpty()
  @IsPositive()
  readonly lessons: number;

  @ApiProperty({
    type: String,
    description: 'Course thumbnail',
    example: 'https://example.com/course-thumbnail.png',
  })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({
    type: String,
    description: 'Course thumbnail',
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];
}
