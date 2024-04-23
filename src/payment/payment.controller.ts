import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
  @ApiBadRequestResponse({ description: 'Unprocessable Entity' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  async airdropAndCollectPayment(@Body() airdropDto: AirdropDto) {
    try {
      const res =
        await this._paymentService.airdropAndCollectPayment(airdropDto);
      return res;
    } catch (error) {
      switch (error.message) {
        case 'Invalid payment intent':
          throw new UnprocessableEntityException(error.message);
        case 'Airdrop failed':
          throw new UnprocessableEntityException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
