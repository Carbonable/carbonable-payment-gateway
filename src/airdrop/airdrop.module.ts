import { Module } from '@nestjs/common';
import { AirdropController } from './airdrop.controller';
import { AirdropService } from './airdrop.service';
import { AIRDROP_SERVICE } from './airdrop.interface';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from 'src/provider/provider.module';

@Module({
  controllers: [AirdropController],
  imports: [ConfigModule, BlockchainModule],
  providers: [
    {
      provide: AIRDROP_SERVICE,
      useClass: AirdropService,
    },
  ],
  exports: [AIRDROP_SERVICE],
})
export class AirdropModule {}
