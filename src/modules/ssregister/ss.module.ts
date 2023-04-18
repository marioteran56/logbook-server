import { Module } from '@nestjs/common';
import { SsService } from './ss.service';
import { SsController } from './ss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SsRegisterSchema } from './schemas/ss-register.schema';
import { StudentSchema } from '../students/schemas/student.schema';
import { CourseSchema } from '../courses/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SsRegister', schema: SsRegisterSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema }
    ])
  ],
  controllers: [SsController],
  providers: [SsService],
})
export class ssRegisterModule {}
