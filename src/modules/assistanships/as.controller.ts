import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AsService } from './as.service';
import { CreateAsRegisterDto } from './dto/create-as-register.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
// Nombre de la ruta API
@Controller('as')
export class SsController {
  constructor(private readonly entriesService: AsService) {}

  @Post()
  create(@Body() createEntryDto: any) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get('/reports')
  generateSSReport(@Query() reportData: any) {
    return this.entriesService.generateASReport(reportData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: any) {
    return this.entriesService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(id);
  }
}
