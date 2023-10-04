import {
  Body,
  Catch,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { StatsBetweenDto } from './dto/stat.dto';
import { StatsService } from './stats.service';

@Catch()
@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.moderator])
  @ApiBearerAuth()
  @Get('total')
  async getTotalCounts() {
    return await this.statsService.getTotalCounts();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.moderator])
  @ApiBearerAuth()
  @Get('top-packages')
  async getBestSellers() {
    return await this.statsService.getBestSellers();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.moderator])
  @ApiBearerAuth()
  @Post('between')
  async getBetweenCounts(@Body() statsBetween: StatsBetweenDto) {
    return await this.statsService.getTotalsBetween(statsBetween);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin, role.moderator])
  @ApiBearerAuth()
  @Post('monthly')
  async getMonthlyCounts(@Body() statsBetween: StatsBetweenDto) {
    return await this.statsService.getMonthlyCounts(statsBetween);
  }
}
