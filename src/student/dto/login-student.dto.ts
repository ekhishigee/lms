import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginStudentDto {
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
    description: 'Student password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
