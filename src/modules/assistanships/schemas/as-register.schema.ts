import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/modules/students/schemas/student.schema';
import { Faculty } from 'src/modules/faculties/schemas/faculty.schema'

export type AsRegisterDocument = HydratedDocument<AsRegister>;

@Schema()
export class AsRegister {
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

  @Prop({ required: true, type: mongoose.Schema.Types.String, ref: 'Faculty'})
  faculty: Faculty;
}

export const AsRegisterSchema = SchemaFactory.createForClass(AsRegister);
