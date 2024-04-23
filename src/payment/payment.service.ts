import { Injectable } from '@nestjs/common';
import { AirdropDto } from './dto/airdrop.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { AirdropService } from 'src/airdrop/airdrop.service';

@Injectable()
export class PaymentService {
  constructor(
    private stripeService: StripeService,
    private airdropService: AirdropService,
  ) {}
  async airdropAndCollectPayment(airdropDto: AirdropDto) {
    // Check if the payment intent is valid
    const isValidPaymentIntent = await this.stripeService.isValidPaymentIntent(
      airdropDto.paymentIntentId,
    );

    if (!isValidPaymentIntent) {
      throw new Error('Invalid payment intent');
    }

    const tx = await this.airdropService.airdropShares(airdropDto);

    if (!tx) {
      throw new Error('Airdrop failed');
    }

    // TODO: Collect payment

    // Return the result
    return { isValidPaymentIntent, tx };
  }
}
