import { Body, Catch, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CalculatePaymentDto } from './dto/calculate-payment.dto';
import { PaymentService } from './payment.service';

@Catch()
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth()
  @Post('calculate')
  async calculatePayment(@Body() calculatePaymentDto: CalculatePaymentDto) {
    return await this.paymentService.calculatePayment(calculatePaymentDto);
  }
}
