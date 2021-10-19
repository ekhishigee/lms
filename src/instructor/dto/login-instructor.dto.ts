import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInstructorDto {
  @ApiProperty({
    type: String,
    format: 'email',
    description: 'Instructor email',
    example: 'instructor@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Instructor password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
