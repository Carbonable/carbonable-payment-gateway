import { Injectable } from '@nestjs/common';
import { AirdropDto } from './dto/airdrop.dto';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(private stripeService: StripeService) {}
  async airdropAndCollectPayment(airdropDto: AirdropDto) {
    // Check if the payment intent is valid
    const isValidPaymentIntent = await this.stripeService.isValidPaymentIntent(
      airdropDto.paymentIntentId,
    );

    // TODO: Airdrop shares

    // TODO: Collect payment

    // Return the result
    return { isValidPaymentIntent };
  }
}
