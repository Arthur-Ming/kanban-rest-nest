import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindAllDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime-types';
import * as multer from 'multer';
import { FilesService } from '../files/files.service';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/');
  },
  filename: function (req, file, cb) {
    const id = file.filename;
    const ext = mime.extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  },
});

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

  @Put(':taskId/files')
  @UseInterceptors(
    FilesInterceptor(
      'files',
      20 /* , {
      storage,
    } */
    )
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Param() { taskId }: FindOneDto) {
    return this.tasksService.uploadFiles({
      taskId,
      files,
    });
  }

  @Delete(':taskId')
  remove(@Param() findOneDto: FindOneDto) {
    return this.tasksService.remove(findOneDto);
  }

  @Delete(':taskId/files/:fileName')
  removeFile(@Param() findOneDto: any) {
    console.log(findOneDto);
    return this.tasksService.removeFiles(findOneDto);
  }
}
