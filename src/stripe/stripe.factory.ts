import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

export const stripeFactory = {
  provide: 'STRIPE_CLIENT',
  useFactory: (configService: ConfigService): Stripe => {
    const apiKey = configService.get<string>('STRIPE_SECRET_KEY');
    if (!apiKey) {
      throw new Error('Stripe API key is not configured');
    }
    return new Stripe(apiKey, {
      apiVersion: '2024-04-10',
    });
  },
  inject: [ConfigService],
};
