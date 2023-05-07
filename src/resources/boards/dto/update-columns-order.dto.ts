import { IsNotEmpty } from 'class-validator';

export class UpdateColumnsOrderDto {
  @IsNotEmpty()
  destination: { index: number };

  @IsNotEmpty()
  source: { index: number };
}
