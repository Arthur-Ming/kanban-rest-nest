import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import schemaOptions from 'src/utils/schemaOptions';

@Schema(schemaOptions())
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }])
  columns: ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
