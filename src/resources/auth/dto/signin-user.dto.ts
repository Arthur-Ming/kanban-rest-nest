import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
