import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ssRegisterService } from './ss-register.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ssregister')
export class ssRegisterController {
  constructor(private readonly entriesService: ssRegisterService) {}

  @Post()
  create(@Body() createEntryDto: any) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Get('/students/reports')
  generateStudentReport(@Query() reportData: any) {
    return this.entriesService.generateStudentReport(reportData);
  }

  @Get('/professors/reports')
  generateProfessorReport(@Query() reportData: any) {
    return this.entriesService.generateProfessorReport(reportData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entriesService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(id);
  }
}
