import { IsNotEmpty, Length } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @Length(3, 80)
  readonly title: string;
}
