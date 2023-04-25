import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Column } from 'src/resources/columns/schemas/column.schema';
import schemaOptions from 'src/utils/schemaOptions';

@Schema(schemaOptions())
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }])
  columns: Column[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
