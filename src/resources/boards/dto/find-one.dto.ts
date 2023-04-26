import { IsMongoId} from 'class-validator';
import { ObjectId } from 'mongoose';

export class FindOneDto {
  @IsMongoId()
  readonly id: ObjectId;
}
