import { PartialType } from '@nestjs/mapped-types';
import { CreateSsRegisterDto } from './create-ss-register.dto';

export class UpdateEntryDto extends PartialType(CreateSsRegisterDto) { }
