import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FacultyDocument = HydratedDocument<Faculty>;

@Schema()
export class Faculty {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
