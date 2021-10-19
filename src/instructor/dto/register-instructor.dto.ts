import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterInstructorDto {
  @ApiProperty({
    type: String,
    format: 'name',
    description: 'Instructor name',
    example: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'email',
    description: 'Instructor email',
    example: 'instructor@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: 'Instructor password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    format: 'avatar',
    description: 'Instructor avatar url',
    example: 'https://example.com/instructor.png',
  })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({
    type: String,
    format: 'bio',
    description: 'Instructor bio',
    example: 'bio',
  })
  @IsOptional()
  @IsString()
  bio: string;

  @ApiProperty({
    type: String,
    format: 'type',
    description: 'Instructor type',
    example: 'Software engineer',
  })
  @IsOptional()
  @IsString()
  type: string;
}
