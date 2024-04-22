import { Module, DynamicModule, Global } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'STRIPE_API_KEY',
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
        },
        StripeService,
      ],
      exports: [StripeService, 'STRIPE_API_KEY'],
    };
  }
}
