import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    description: 'Refresh token',
    example: 'xxx.yyy.zzz',
  })
  refreshToken: string;
}
