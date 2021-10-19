import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterStudentDto {
  @ApiProperty({
    type: String,
    format: 'name',
    description: 'Student name',
    example: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'email',
    description: 'Student email',
    example: 'student@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: 'Student password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    format: 'avatar',
    description: 'Student avatar url',
    example: 'https://example.com/student.png',
  })
  @IsOptional()
  @IsString()
  avatar: string;
}
