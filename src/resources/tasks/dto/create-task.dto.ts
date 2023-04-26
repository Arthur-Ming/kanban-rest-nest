import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(3, 80)
  readonly title: string;

  @IsString()
  readonly description: string = '';
}
