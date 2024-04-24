import { Inject, Injectable } from '@nestjs/common';
import {
  RpcProvider,
  Account,
  Contract,
  GetTransactionReceiptResponse,
  TransactionFinalityStatus,
} from 'starknet';
import { AirdropDto } from 'src/payment/dto/airdrop.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirdropService {
  private account: Account;

  constructor(
    private configService: ConfigService,
    @Inject('STARKNET_RPC_PROVIDER') private rpcProvider: RpcProvider,
  ) {
    this.initializeProviderAndAccount();
  }

  private initializeProviderAndAccount(): void {
    const walletAddress = this.configService.get<string>(
      'ARGENT_WALLET_ADDRESS',
    );
    const walletPrivateKey = this.configService.get<string>('ARGENT_WALLET_PK');

    try {
      this.account = new Account(
        this.rpcProvider,
        walletAddress,
        walletPrivateKey,
      );
    } catch (error) {
      console.error(error.message);
      throw new Error('Invalid wallet private key.');
    }
  }

  async setupAirdrop(airdropDto: AirdropDto): Promise<Contract> {
    const { abi } = await this.rpcProvider.getClassAt(
      airdropDto.contractAddress,
    );
    if (!abi) {
      throw new Error('No ABI found for the contract address');
    }

    try {
      const contract = new Contract(
        abi,
        airdropDto.contractAddress,
        this.rpcProvider,
      );
      contract.connect(this.account);
      return contract;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async airdropShares(
    airdropDto: AirdropDto,
  ): Promise<GetTransactionReceiptResponse> {
    try {
      const airdropContract = await this.setupAirdrop(airdropDto);
      const call = airdropContract.populate('mint', [
        airdropDto.walletAddress,
        airdropDto.slot,
        airdropDto.shares,
      ]);

      const res = await this.account.execute({
        contractAddress: airdropContract.address,
        entrypoint: 'mint',
        calldata: call.calldata,
      });

      const tx = await this.rpcProvider.waitForTransaction(
        res.transaction_hash,
        {
          successStates: [TransactionFinalityStatus.ACCEPTED_ON_L2],
        },
      );

      if (tx === undefined) {
        throw new Error('Transaction failed');
      }

      return tx;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
