import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll() { //GET /unit
    return this.unitService.findAll();
  }

  @Get(':id') //GET /unit/123
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }
}
