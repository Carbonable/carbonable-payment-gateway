import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IPaymentService, PAYMENT_SERVICE } from './payment.interface';
import { AirdropDto } from './dto/airdrop.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly _paymentService: IPaymentService,
  ) {}

  @ApiOperation({ summary: 'Airdrop shares and collect payment' })
  @ApiCreatedResponse({
    description: 'Shares airdropped and payment collected',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  async airdropAndCollectPayment(@Body() airdropDto: AirdropDto) {
    const res = await this._paymentService.airdropAndCollectPayment(airdropDto);
    return res;
  }
}
