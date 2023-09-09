import { Injectable } from '@nestjs/common';
import { PackagesService } from 'src/packages/packages.service';
import { PromoService } from 'src/promo/promo.service';
import { successHandler } from 'src/utils/response.handler';
import { CalculatePaymentDto } from './dto/calculate-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly packageService: PackagesService,
    private readonly promoService: PromoService,
  ) {}

  async calculatePayment(calculatePayment: CalculatePaymentDto) {
    try {
      let payments = {
        totalPayment: 0,
        advancePayment: 0,
        duePayment: 0,
      };

      const packages = await this.packageService.getAllPackages();

      packages.body.forEach((packageObj) => {
        if (calculatePayment.packageIds.includes(packageObj.id)) {
          payments.totalPayment += packageObj.price;
        }
      });
      payments.advancePayment = payments.totalPayment * 0.7;
      payments.duePayment = payments.totalPayment * 0.3;

      calculatePayment.promoCode = 'discount50';

      if (calculatePayment.promoCode) {
        try {
          const discountedPayments = await this.promoService.validatePromo({
            promoCode: calculatePayment.promoCode,
            totalPayment: payments.totalPayment,
          });

          payments.totalPayment =
            discountedPayments.body.discountedTotalPayment;
          payments.advancePayment = discountedPayments.body.advancePayment;
          payments.duePayment = discountedPayments.body.duePayment;
        } catch (error) {
          console.log(error);
        }
      }
      console.log(payments);

      return successHandler('Payment calculated successfully', payments);
    } catch (error) {}
  }
}
