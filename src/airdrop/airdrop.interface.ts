import { AirdropDto } from 'src/payment/dto/airdrop.dto';

export const AIRDROP_SERVICE = 'AIRDROP SERVICE';

export interface IAirdropService {
  airdropShares(airdropDto: AirdropDto): Promise<string>;
}
