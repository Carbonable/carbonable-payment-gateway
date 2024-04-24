import { AirdropDto } from './dto/airdrop.dto';
import { PaymentServiceResponse } from './payment.service';

export const PAYMENT_SERVICE = 'PAYMENT SERVICE';

export interface IPaymentService {
  airdropAndCollectPayment(
    airdropDto: AirdropDto,
  ): Promise<PaymentServiceResponse>;
}
