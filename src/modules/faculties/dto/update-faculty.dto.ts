import { PartialType } from '@nestjs/mapped-types';
import { CreateFacultyDto } from './create-faculty.dto';

export class UpdateProfessorDto extends PartialType(CreateFacultyDto) {}
