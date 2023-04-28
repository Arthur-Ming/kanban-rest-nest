import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import schemaOptions from 'src/utils/schemaOptions';

@Schema(schemaOptions())
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
