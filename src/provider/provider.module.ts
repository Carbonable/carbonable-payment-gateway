import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RpcProvider } from 'starknet';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STARKNET_RPC_PROVIDER',
      useFactory: (configService: ConfigService) => {
        const nodeUrl = configService.get<string>('NODE_URL');
        const rpcApiKey = configService.get<string>('RPC_API_KEY');
        const apiUrl = `${nodeUrl}?apikey=${rpcApiKey}`;
        return new RpcProvider({ nodeUrl: apiUrl });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['STARKNET_RPC_PROVIDER'],
})
export class BlockchainModule {}
