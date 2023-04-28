import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create({ password, email, name }: CreateUserDto): Promise<User> {
    try {
      const passwordHash = await this.genHashPassword(password);
      const user = await this.userModel.create({
        email,
        name,
        password: passwordHash,
      });

      return user;
    } catch (error) {
      if (error.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new HttpException(`${ENTITY_NAME} with this e-mail exists`, HttpStatus.CONFLICT);
      } else {
        throw error;
      }
    }
  }
  genHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  };
}
