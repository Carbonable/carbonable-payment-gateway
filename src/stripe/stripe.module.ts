import { Module, DynamicModule, Global } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { stripeFactory } from './stripe.factory';

@Global()
@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [ConfigModule],
      providers: [stripeFactory, StripeService],
      exports: [StripeService, 'STRIPE_CLIENT'],
    };
  }
}
