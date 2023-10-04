import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/guards/jwt-auth.guard';
import { UserRolesGuard } from 'src/utils/auth/guards/roles.guard';
import { role } from 'src/utils/constants/role';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ValidatePromoDto } from './dto/validate-promo.dto';
import { PromoService } from './promo.service';

@Catch()
@ApiTags('Promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Post('create-promo')
  async createPromo(@Body() createPromoDto: CreatePromoDto) {
    return await this.promoService.createPromo(createPromoDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get()
  async getPromoCodes() {
    return await this.promoService.getPromoCodes();
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Get('/:code')
  async getPromoByCode(@Param('code') code: string) {
    return await this.promoService.getPromoByCode(code);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Patch('/:code')
  async updatePromo(
    @Param('code') code: string,
    @Body() updatePromoDto: CreatePromoDto,
  ) {
    return await this.promoService.updatePromo(code, updatePromoDto);
  }

  @UseGuards(JwtAuthGuard, UserRolesGuard)
  @SetMetadata('roles', [role.admin])
  @ApiBearerAuth()
  @Delete('/:code')
  async deletePromo(@Param('code') code: string) {
    return await this.promoService.deletePromo(code);
  }

  @ApiBearerAuth()
  @Post('validate')
  async validatePromo(@Body() validatePromoDto: ValidatePromoDto) {
    return await this.promoService.validatePromo(validatePromoDto);
  }
}
