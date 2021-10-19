import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    type: Number,
    description: 'Section id',
    example: 'Section id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly sectionId: number;

  @ApiProperty({
    type: String,
    description: 'Lesson name',
    example: 'Lesson name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Lesson description',
    example: 'Lesson description',
  })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: String,
    format: 'thumbnail',
    description: 'Lesson thumbnail url',
    example: 'https://example.com/lesson-thumbnail.png',
  })
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiProperty({
    type: String,
    format: 'video',
    description: 'Lesson video url',
    example: 'https://example.com/lesson-video.mp4',
  })
  @IsOptional()
  @IsString()
  video: string;

  @ApiProperty({
    type: String,
    description: 'Lesson duration',
    example: '00:38',
  })
  @IsNotEmpty()
  @IsString()
  readonly duration: string;
}
