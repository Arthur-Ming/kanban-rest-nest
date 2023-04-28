import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';

@Controller('boards/:boardId/columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param() findAllDto: FindAllDto, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(findAllDto, createTaskDto);
  }

  @Get()
  findAll(@Param() findAllDto: FindAllDto) {
    return this.tasksService.findAll(findAllDto);
  }

  @Get(':taskId')
  findOne(@Param() findOneDto: FindOneDto) {
    return this.tasksService.findOne(findOneDto);
  }

  @Put(':taskId')
  update(@Param() findOneDto: FindOneDto, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(findOneDto, updateTaskDto);
  }

  @Delete(':taskId')
  remove(@Param() findOneDto: FindOneDto) {
    return this.tasksService.remove(findOneDto);
  }
}
