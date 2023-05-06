import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UploadFileDto {
  @IsMongoId()
  readonly taskId: ObjectId;

  @IsNotEmpty()
  readonly files: Array<Express.Multer.File>;
}
