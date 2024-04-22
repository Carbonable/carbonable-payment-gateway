import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PAYMENT_SERVICE } from './payment.interface';
import { PaymentController } from './payment.controller';
import { StripeService } from 'src/stripe/stripe.service';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [StripeModule.forRootAsync()],
  controllers: [PaymentController],
  providers: [
    {
      provide: PAYMENT_SERVICE,
      useClass: PaymentService,
    },
    StripeService,
  ],
  exports: [PAYMENT_SERVICE],
})
export class PaymentModule {}
