import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private stripe: Stripe) {}

  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async isValidPaymentIntent(paymentIntentId: string): Promise<boolean> {
    try {
      const paymentIntent = await this.getPaymentIntent(paymentIntentId);
      return paymentIntent.status === 'requires_capture';
    } catch (error) {
      return false;
    }
  }

  async capturePaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.capture(paymentIntentId);
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<void> {
    await this.stripe.paymentIntents.cancel(paymentIntentId);
  }

  async updatePaymentIntentDescription(
    paymentIntentId: string,
    description: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.update(paymentIntentId, {
      description,
    });
  }
}
