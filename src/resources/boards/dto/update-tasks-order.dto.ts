import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTasksOrderDto {
  @IsNotEmpty()
  destination: {
    index: number;
    columnId: ObjectId;
  };

  @IsNotEmpty()
  source: {
    index: number;
    columnId: ObjectId;
  };
}
