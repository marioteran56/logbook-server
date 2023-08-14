import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/modules/students/schemas/student.schema';
import { Course } from './course.schema';

export type SsRegisterDocument = HydratedDocument<SsRegister>;

@Schema()
export class SsRegister {
  @Prop({ required: true })
  start_time: Date;

  @Prop({ required: false })
  end_time: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Number, ref: 'Student' })
  student: Student;

  @Prop({ required: true })
  lab: string;

  @Prop({ required: true })
  hours: number;
}

export const SsRegisterSchema = SchemaFactory.createForClass(SsRegister);
