import { PartialType } from '@nestjs/mapped-types';
import { CreateAsRegisterDto } from './create-as-register.dto';

export class UpdateEntryDto extends PartialType(CreateAsRegisterDto) { }
