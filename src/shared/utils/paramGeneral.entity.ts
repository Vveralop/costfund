import { IsDefined, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class ValidateHeaderDto {
  @IsNotEmpty()
  @IsDefined()
  @Expose({ name: 'transaction-id' })
  transactionId: string;

  @IsNotEmpty()
  @IsDefined()
  @Expose({ name: 'channel-id' })
  channelId: string;
}
