import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    type: Number,
    description: 'Course id',
    example: 'Course id',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly courseId: number;

  @ApiProperty({
    type: Date,
    description: 'Start date',
    example: '2021/11/01 12:00:00',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly name: string;

  @ApiProperty({
    type: Date,
    description: 'End date',
    example: '2021/12/01 12:00:00',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
