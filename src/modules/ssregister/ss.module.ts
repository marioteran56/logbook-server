import { Module } from '@nestjs/common';
import { ssService } from './ss.service';
import { ssController } from './ss.controller';
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
  controllers: [ssController],
  providers: [ssService],
})
export class ssRegisterModule {}
