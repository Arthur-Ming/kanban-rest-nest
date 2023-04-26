import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class FindAllDto {
  @IsMongoId()
  readonly boardId: ObjectId;
}
