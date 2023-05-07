import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FindOneDto } from './dto/find-one.dto';
import { UpdateColumnsOrderDto } from './dto/update-columns-order.dto';
import { UpdateTasksOrderDto } from './dto/update-tasks-order.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.boardsService.findOne(findOneDto);
  }

  @Put(':id')
  update(@Param() findOneDto: FindOneDto, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(findOneDto, updateBoardDto);
  }
  @Put(':id/columns/order')
  updateColumnsOrder(
    @Param() findOneDto: FindOneDto,
    @Body() updateColumnsOrderDto: UpdateColumnsOrderDto
  ) {
    return this.boardsService.updateColumnsOrder(findOneDto, updateColumnsOrderDto);
  }

  @Put(':id/tasks/order')
  updateTasksOrder(
    @Param() findOneDto: FindOneDto,
    @Body() updateTasksOrderDto: UpdateTasksOrderDto
  ) {
    return this.boardsService.updateTasksOrder(findOneDto, updateTasksOrderDto);
  }

  @Delete(':id')
  remove(@Param() findOneDto: FindOneDto) {
    return this.boardsService.remove(findOneDto);
  }
}
