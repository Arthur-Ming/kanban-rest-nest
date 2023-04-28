import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  readonly password: string;
}
