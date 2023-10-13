import { Injectable } from '@nestjs/common';
import { PackagesService } from 'src/packages/packages.service';
import { PromoService } from 'src/promo/promo.service';
import { errorhandler, successHandler } from 'src/utils/response.handler';
import { CalculatePaymentDto } from './dto/calculate-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly packageService: PackagesService,
    private readonly promoService: PromoService,
  ) {}

  async calculatePayment(calculatePayment: CalculatePaymentDto) {
    let payments = {
      totalPayment: 0,
      advancePayment: 0,
      duePayment: 0,
      discountAmount: 0,
    };

    const packages = await this.packageService.getAllPackages();

    packages.body.forEach((packageObj) => {
      if (calculatePayment.packageIds.includes(packageObj.id)) {
        payments.totalPayment += packageObj.price;
      }
    });
    payments.advancePayment = Math.round(payments.totalPayment * 0.7);
    payments.duePayment = Math.round(payments.totalPayment * 0.3);

    if (calculatePayment.promoCode) {
      try {
        const discountedPayments = await this.promoService.validatePromo({
          promoCode: calculatePayment.promoCode,
          totalPayment: payments.totalPayment,
        });

        payments.discountAmount = Math.round(
          discountedPayments.body.discountAmount,
        );

        payments.totalPayment = Math.round(
          discountedPayments.body.discountedTotalPayment,
        );
        payments.advancePayment = Math.round(
          discountedPayments.body.advancePayment,
        );
        payments.duePayment = Math.round(discountedPayments.body.duePayment);
      } catch (error) {
        return errorhandler(400, error.message);
      }
    }

    return successHandler('Payment calculated successfully', payments);
  }
}
