import { Injectable } from '@nestjs/common';
import { AirdropDto } from './dto/airdrop.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { AirdropService } from 'src/airdrop/airdrop.service';
import {
  GetTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
} from 'starknet';
import Stripe from 'stripe';

export interface PaymentServiceResponse {
  tx: GetTransactionReceiptResponse;
  pi: Stripe.PaymentIntent;
}
@Injectable()
export class PaymentService {
  constructor(
    private stripeService: StripeService,
    private airdropService: AirdropService,
  ) {}
  async airdropAndCollectPayment(
    airdropDto: AirdropDto,
  ): Promise<PaymentServiceResponse> {
    // Check if the payment intent is valid
    const isValidPaymentIntent = await this.stripeService.isValidPaymentIntent(
      airdropDto.paymentIntentId,
    );

    if (!isValidPaymentIntent) {
      throw new Error('Invalid payment intent');
    }

    let tx: GetTransactionReceiptResponse = undefined;
    // Airdrop shares
    try {
      tx = await this.airdropService.airdropShares(airdropDto);
    } catch (error) {
      const regex = /Failure reason: [^\n]+/g;
      const matches = error.message.match(regex);
      await this.stripeService.updatePaymentIntentDescription(
        airdropDto.paymentIntentId,
        `Project: ${airdropDto.contractAddress} - Slot: ${airdropDto.slot} - Shares: ${airdropDto.shares} - ${matches[matches.length - 1]}`,
      );

      await this.stripeService.cancelPaymentIntent(airdropDto.paymentIntentId);
      throw new Error(error.message);
    }

    // Capture payment intent
    await this.stripeService.updatePaymentIntentDescription(
      airdropDto.paymentIntentId,
      `Transaction hash: ${(tx as SuccessfulTransactionReceiptResponse).transaction_hash}`,
    );

    const pi = await this.stripeService.capturePaymentIntent(
      airdropDto.paymentIntentId,
    );

    return { tx, pi };
  }
}
