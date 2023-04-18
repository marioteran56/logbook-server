import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { async, EMPTY } from 'rxjs';
import { Student } from '../students/interfaces/student.interface';
import { CreateSsRegisterDto } from './dto/create-ss-register.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { SsRegister } from './interfaces/ss-register.interface';

@Injectable()
export class SsService {
  constructor(
    @InjectModel('SsRegister')
    private readonly ssModel: Model<SsRegister>,
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  async create(createSsRegisterDto: CreateSsRegisterDto): Promise<SsRegister> {
    const entry = new this.ssModel(createSsRegisterDto);

    return await this.studentModel
      .findById(entry.student)
      .exec()
      .then(async (res) => {
        if (res) {
          console.log("PITO")
          return (await entry.save()).populate('student');
        }
        throw new BadRequestException('Student not registered');
      })
      .catch((err) => {
        console.log("CHINGADAMADRE")
        return err;
      });
  }

  async findAll(): Promise<SsRegister[]> {
    const entries = await this.ssModel.find();
    return entries;
  }

  async findOne(id: string): Promise<SsRegister> {
    const entry = await this.ssModel.findById(id);
    return entry;
  }

  async generateStudentReport(reportData: any): Promise<any> {
    // Revisamos que campos fueron ingresados en blanco
    if (!reportData.lab || reportData.lab == 'undefined') reportData.lab = { $exists: true };
    if (!reportData.student || reportData.student == 'undefined') {
      reportData.student = { $exists: true };
    } else {
      reportData.student = Number(reportData.student);
    }
    if (!reportData.courseCode || reportData.courseCode == 'undefined') reportData.courseCode = { $exists: true };
    if (!reportData.courseGroup || reportData.courseGroup == 'undefined') reportData.courseGroup = { $exists: true };

    const report = await this.ssModel.aggregate([
      {
        $match: {
          $and: [
            {
              lab: reportData.lab,
            },
            {
              student: reportData.student,
            },
            {
              'course.code': reportData.courseCode,
            },
            {
              'course.group': reportData.courseGroup,
            },
            {
              date: {
                $gte: new Date(reportData.startDate),
                $lte: new Date(reportData.endDate),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          lab: 1,
          course: 1,
          student: 1,
        },
      },
    ]);
    return report;
  }

  async generateProfessorReport(reportData: any): Promise<any> {
    // Revisamos que campos fueron ingresados en blanco
    if (!reportData.lab || reportData.lab == 'undefined') reportData.lab = { $exists: true };
    if (!reportData.professor || reportData.professor == 'undefined') {
      reportData.professor = { $exists: true };
    } else {
      reportData.professor = Number(reportData.professor);
    }
    if (!reportData.courseCode || reportData.courseCode == 'undefined') reportData.courseCode = { $exists: true };
    if (!reportData.courseGroup || reportData.courseGroup == 'undefined') reportData.courseGroup = { $exists: true };

    const report = await this.ssModel.aggregate([
      {
        $match: {
          $and: [
            {
              lab: reportData.lab,
            },
            {
              'course.code': reportData.courseCode,
            },
            {
              'course.group': reportData.courseGroup,
            },
            {
              date: {
                $gte: new Date(reportData.startDate),
                $lte: new Date(reportData.endDate),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'professors',
          localField: 'course.professor',
          foreignField: '_id',
          as: 'professor',
        },
      },
      {
        $unwind: {
          path: '$professor',
        },
      },
      {
        $match: {
          'professor._id': reportData.professor,
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$date',
            },
          },
          lab: 1,
          course: 1,
          professor: 1,
        },
      },
      {
        $group: {
          _id: {
            date: '$date',
            professor: '$professor',
            course: '$course',
          },
          date: {
            $first: '$date',
          },
          lab: {
            $first: '$lab',
          },
          course: {
            $first: '$course',
          },
          professor: {
            $first: '$professor',
          },
        },
      },
    ]);
    return report;
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<SsRegister> {
    const entry = await this.ssModel.findByIdAndUpdate(id, updateEntryDto, { new: true })
    return entry;
  }

  async remove(id: string): Promise<SsRegister> {
    const entry = await this.ssModel.findByIdAndDelete(id);
    return entry;
  }
}
