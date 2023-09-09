import { Module } from '@nestjs/common';
import { PackagesModule } from 'src/packages/packages.module';
import { PromoModule } from 'src/promo/promo.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [PackagesModule, PromoModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
