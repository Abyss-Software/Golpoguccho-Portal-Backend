import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger';

@ApiResponse({ status: 200, description: 'Login successful' })
export class LoginResponseDto {
  @ApiResponseProperty()
  access_token: string;

  @ApiResponseProperty()
  refresh_token: string;

  @ApiResponseProperty()
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}
