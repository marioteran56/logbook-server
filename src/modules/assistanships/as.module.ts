import { Module } from '@nestjs/common';
import { AsService } from './as.service';
import { SsController } from './as.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AsRegisterSchema } from './schemas/as-register.schema';
import { StudentSchema } from '../students/schemas/student.schema';
import { CourseSchema } from '../courses/schemas/course.schema';
import { FacultySchema } from '../faculties/schemas/faculty.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AsRegister', schema: AsRegisterSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema }
    ]),
  ],
  controllers: [SsController],
  providers: [AsService],
})
export class asRegisterModule {}
