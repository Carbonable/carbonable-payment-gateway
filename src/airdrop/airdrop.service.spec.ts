import { Test, TestingModule } from '@nestjs/testing';
import { AirdropService } from './airdrop.service';
import { ConfigService } from '@nestjs/config';

describe('AirdropService', () => {
  let service: AirdropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirdropService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'NODE_URL':
                  return 'https://free-rpc.nethermind.io/sepolia-juno/v0_7';
                case 'RPC_API_KEY':
                  return 'freekey';
                case 'ARGENT_WALLET_ADDRESS':
                  return '0x07B9c5bf64dbf68E8a7EBE7e2BC62118B41e6FA790dAF88A50F23C9caef18178';
                case 'ARGENT_WALLET_PK':
                  return '0x06e7aa15cdca63a8f01bffe40c129bddb0725ca57affae31879d244e33ee2dc7';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AirdropService>(AirdropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
