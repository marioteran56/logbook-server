import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultyController } from './faculties.controller';
import { FacultySchema } from './schemas/faculty.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Faculty', schema: FacultySchema }
    ])
  ],
  controllers: [FacultyController],
  providers: [FacultiesService],
})
export class FacultyModule {}
