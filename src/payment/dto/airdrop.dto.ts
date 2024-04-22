import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AirdropDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentIntentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contractAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  slot: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  shares: number;
}
