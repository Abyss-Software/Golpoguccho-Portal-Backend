import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatsBetweenDto } from 'src/stats/dto/stat.dto';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { CreateRecordDto } from './dto/create-record.dto';
import { FinanceService } from './finance.service';

@Catch()
@ApiTags('Finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get('')
  async getAllRecords() {
    return await this.financeService.getAllRecords();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Post('add-record')
  async createFinanceRecord(@Body() createRecordDto: CreateRecordDto) {
    return await this.financeService.createFinanceRecord(createRecordDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Post('between')
  async getRecordsBetween(@Body() recordsBetween: StatsBetweenDto) {
    return await this.financeService.getRecordsBetween(recordsBetween);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Delete('/:id')
  async DeleteRecord(@Param() id: string) {
    return await this.financeService.deleteRecord(id);
  }
}
