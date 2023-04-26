import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { FindAllDto } from './find-all.dto';

export class FindOneDto extends PartialType(FindAllDto) {
  @IsMongoId()
  readonly taskId: ObjectId;
}
