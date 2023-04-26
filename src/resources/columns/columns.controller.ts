import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';

@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Param() findAllDto: FindAllDto, @Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(findAllDto, createColumnDto);
  }

  @Get()
  findAll(@Param() findAllDto: FindAllDto) {
    return this.columnsService.findAll(findAllDto);
  }

  @Get(':columnId')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.columnsService.findOne(findOneDto);
  }

  @Put(':columnId')
  update(@Param() findOneDto: FindOneDto, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(findOneDto, updateColumnDto);
  }

  @Delete(':columnId')
  remove(@Param() findOneDto: FindOneDto) {
    return this.columnsService.remove(findOneDto);
  }
}
