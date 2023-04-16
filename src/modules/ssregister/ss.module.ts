import { Module } from '@nestjs/common';
import { ssRegisterService } from './ss.service';
import { ssRegisterController } from './ss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './schemas/entry.schema';
import { StudentSchema } from '../students/schemas/student.schema';
import { CourseSchema } from '../courses/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Entry', schema: EntrySchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema }
    ]),
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema }
    ])
  ],
  controllers: [ssRegisterController],
  providers: [ssRegisterService],
})
export class ssRegisterModule {}
