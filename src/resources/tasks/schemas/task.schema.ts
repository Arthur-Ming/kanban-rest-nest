import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import schemaOptions from 'src/utils/schemaOptions';

@Schema(schemaOptions())
export class Task {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  boardId: ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Column' })
  columnId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Task);
