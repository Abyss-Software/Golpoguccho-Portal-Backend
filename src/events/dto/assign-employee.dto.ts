import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class assignedEmployeesDto {
  @ApiProperty({
    example: 'a724a19e-1c18-4b4c-bfa6-ef64558a0415',
  })
  @IsString()
  eventId: string;

  @ApiProperty({
    example: 'afbc55e7-65a0-497e-b3fe-d8bcb43ff705',
  })
  @IsArray()
  assignedEmployees: assignedEmployees[];
}

export class assignedEmployees {
  employeeId: string;
  position: string;
  payment?: number;
}
