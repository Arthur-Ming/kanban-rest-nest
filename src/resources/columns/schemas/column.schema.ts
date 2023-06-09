import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Task } from 'src/resources/tasks/schemas/task.schema';
import schemaOptions from 'src/utils/schemaOptions';

@Schema(schemaOptions())
export class Column {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  boardId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
