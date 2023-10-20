import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { Faculty } from './interfaces/faculty.interface';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectModel('Faculty')
    private readonly FacultyModel: Model<Faculty>,
  ) {}

  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    const faculty = new this.FacultyModel(createFacultyDto);
    return await faculty.save();
  }

  async createMany(faculties: any): Promise<any> {
    // Limpiamos objetos que no esten completos
    let facultiesArr = faculties.faculties as Array<any>;
    for (let i = 0; i < facultiesArr.length; i++) {
      const element = facultiesArr[i];
      if (!element._id || !element.name) {
        facultiesArr.splice(i, 1);
      }
    }
    // Filtramos duplicados
    facultiesArr = facultiesArr.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t._id === value._id && t.name === value.name
      ))
    );
    return await this.FacultyModel.insertMany(facultiesArr);
  }

  async findAll(): Promise<Faculty[]> {
    const professors = await this.FacultyModel.find();
    return professors;
  }

  async findOne(id: string): Promise<Faculty> {
    const professor = await this.FacultyModel.findById(id);
    return professor;
  }
}
