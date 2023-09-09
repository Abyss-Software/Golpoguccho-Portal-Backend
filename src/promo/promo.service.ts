import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorhandler, successHandler } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ValidatePromoDto } from './dto/validate-promo.dto';
import { Promo } from './promo.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo)
    private readonly promoRepo: Repository<Promo>,
  ) {}

  async createPromo(createPromoDto: CreatePromoDto) {
    try {
      const existingPromo = await this.promoRepo.findOneBy({
        promo_code: createPromoDto.promoCode,
      });
      if (existingPromo)
        return errorhandler(400, 'Promo with this code already exists');

      const promo = this.promoRepo.create({
        promo_code: createPromoDto.promoCode,
        percentage: createPromoDto.discountPercentage,
        status: 'active',
        max_discount: createPromoDto.maxDiscount,
        max_use: createPromoDto.maxUse,
        description: createPromoDto.description,
        expiry_date: createPromoDto.expiryDate,
      });

      await this.promoRepo.save(promo);
      return successHandler('Promo created', promo);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getPromoCodes() {
    try {
      const promoCodes = await this.promoRepo.find();
      return successHandler('Promo codes', promoCodes);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async getPromoByCode(code: string) {
    try {
      const promoCode = await this.promoRepo.findOne({
        where: { promo_code: code },
      });

      if (!promoCode) return errorhandler(404, 'Promo code not found');
      return successHandler('PromoCode details ', promoCode);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async updatePromo(code: string, updatePromoDto: CreatePromoDto) {
    try {
      const promoCode = await this.getPromoByCode(code);
      if (!promoCode) return errorhandler(404, 'Promo code not found');

      const updatedPromo = await this.promoRepo.update(promoCode.body.id, {
        promo_code: updatePromoDto.promoCode,
        percentage: updatePromoDto.discountPercentage,
        status: updatePromoDto.status,
        max_discount: updatePromoDto.maxDiscount,
        max_use: updatePromoDto.maxUse,
        description: updatePromoDto.description,
        expiry_date: updatePromoDto.expiryDate,
      });

      return successHandler('Promo updated', updatedPromo);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async deletePromo(code: string) {
    try {
      const promoCode = await this.getPromoByCode(code);
      if (!promoCode) return errorhandler(404, 'Promo code not found');

      const deletedPromo = await this.promoRepo.delete(promoCode.body.id);

      return successHandler('Promo deleted', deletedPromo);
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async validatePromo(validatePromo: ValidatePromoDto) {
    try {
      const promoCode = await this.getPromoByCode(validatePromo.promoCode);
      if (!promoCode) return errorhandler(404, 'Promo code not found 1');

      if (promoCode.body.used === promoCode.body.max_use)
        return errorhandler(400, 'Promo code is no longer valid 2');

      if (promoCode.body.expiry_date < new Date().toISOString())
        return errorhandler(400, 'Promo code is no longer valid 3');

      let discount =
        (promoCode.body.percentage / 100) * validatePromo.totalPayment;
      if (discount > promoCode.body.max_discount)
        discount = promoCode.body.max_discount;

      const discountedPayment = validatePromo.totalPayment - discount;

      return successHandler('Promo validated', {
        discountedTotalPayment: discountedPayment,
        discountAmount: discount,
        advancePayment: discountedPayment * 0.7,
        duePayment: discountedPayment * 0.3,
      });
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }

  async usePromo(code: string) {
    try {
      const promoCode = await this.getPromoByCode(code);
      if (!promoCode) return errorhandler(404, 'Promo code not found');

      promoCode.body.used += 1;
      await this.promoRepo.save(promoCode.body);

      return promoCode;
    } catch (error) {
      return errorhandler(error.status, error.message);
    }
  }
}
