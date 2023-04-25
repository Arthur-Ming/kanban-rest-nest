import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FindOneDto } from './dto/find-one.dto';

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

  @Delete(':id')
  remove(@Param() findOneDto: FindOneDto) {
    return this.boardsService.remove(findOneDto);
  }
}
