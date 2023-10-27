import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { async, EMPTY } from 'rxjs';
import { Student } from '../students/interfaces/student.interface';
import { CreateAsRegisterDto } from './dto/create-as-register.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AsRegister } from './interfaces/as-register.interface';
import { Faculty } from '../faculties/interfaces/faculty.interface';

@Injectable()
export class AsService {
  constructor(
    @InjectModel('AsRegister')
    private readonly asModel: Model<AsRegister>,
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  async create(createSsRegisterDto: CreateAsRegisterDto): Promise<AsRegister> {
    const entry = new this.asModel(createSsRegisterDto);

    return await this.studentModel
      .findById(entry.student)
      .exec()
      .then(async (res) => {
        if (res) {
          return (await entry.save()).populate('student');
        }
        throw new BadRequestException('Student not registered');
      })
      .catch((err) => {
        return err;
      });
  }

  async findAll(): Promise<AsRegister[]> {
    const entries = await this.asModel.find();
    return entries;
  }

  async findOne(id: string): Promise<AsRegister> {
    const entry = await this.asModel.findById(id);
    return entry;
  }

  async generateASReport(reportData: any): Promise<any> {
    // Revisamos que campos fueron ingresados en blanco
    if (!reportData.lab || reportData.lab == 'undefined') reportData.lab = { $exists: true };
    if (!reportData.student || reportData.student == 'undefined') {
      reportData.student = { $exists: true };
    } else {
      reportData.student = Number(reportData.student);
    }

    const report = await this.asModel.aggregate([
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
              start_time: {
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
          _id: 1,
          start_time: 1,
          student: 1,
          lab: 1,
          hours: 1,
          faculty: 1,
          course: 1,
          end_time: 1,
        },
      },
    ]);
    return report;
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<AsRegister> {
    const entry = await this.asModel.findByIdAndUpdate(id, updateEntryDto, { new: true })
    return entry;
  }

  async remove(id: string): Promise<AsRegister> {
    const entry = await this.asModel.findByIdAndDelete(id);
    return entry;
  }
}
