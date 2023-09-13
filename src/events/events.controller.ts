import {
  Body,
  Catch,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { assignedEmployeesDto } from './dto/assign-employee.dto';
import { EventsService } from './events.service';

@Catch()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Get('')
  async getEvents() {
    return await this.eventsService.getAllEvents();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Get('/:id')
  async getEventById(@Param('id') id: string) {
    return await this.eventsService.getEventById(id);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.manager])
  @ApiBearerAuth()
  @Post('assign-employees')
  async assignEmployee(@Body() assignEmployeeDto: assignedEmployeesDto) {
    return await this.eventsService.assignEmployeeToEvent(assignEmployeeDto);
  }
}
