import { AirdropDto } from './dto/airdrop.dto';

export const PAYMENT_SERVICE = 'PAYMENT SERVICE';

export interface IPaymentService {
  airdropAndCollectPayment(airdropDto: AirdropDto): Promise<any>;
}
