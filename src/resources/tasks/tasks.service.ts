import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from '../boards/schemas/board.schema';
import { Column } from '../columns/schemas/column.schema';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { FindAllDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private filesService: FilesService
  ) {}

  async create({ boardId, columnId }: FindAllDto, createTaskDto: CreateTaskDto) {
    const column = await this.columnModel.findOne({ _id: columnId, boardId });

    if (!column) {
      throw new NotFoundException();
    }

    const task = await this.taskModel.create({
      boardId,
      columnId,
      ...createTaskDto,
    });

    await column.updateOne({ $push: { tasks: task } });

    return task;
  }

  async findAll({ boardId, columnId }: FindAllDto) {
    return await this.taskModel.find({ boardId, columnId });
  }

  async findOne({ boardId, columnId, taskId }: FindOneDto) {
    const task = await this.taskModel.findOne({ _id: taskId, boardId, columnId });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update({ boardId, columnId, taskId }: FindOneDto, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, boardId, columnId },
      updateTaskDto,
      {
        new: true,
      }
    );

    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async remove({ boardId, columnId, taskId }: FindOneDto) {
    const [column, task] = await Promise.all([
      this.columnModel.findOneAndUpdate({ _id: columnId, boardId }, { $pull: { tasks: taskId } }),
      this.taskModel.findOneAndDelete({ _id: taskId, boardId, columnId }),
    ]);

    if (!column) {
      throw new NotFoundException();
    }

    if (!task) {
      throw new NotFoundException();
    }

    await this.filesService.remove(task.files);

    return task;
  }

  async uploadFiles({ taskId, files }: UploadFileDto) {
    const filePaths = await this.filesService.save(files);
    const task = await this.taskModel.findOne({ _id: taskId });
    if (!task) {
      throw new NotFoundException();
    }
    task.files.push(...filePaths);
    return await task.save();
  }

  async removeFiles({ taskId, fileName }: any) {
    await this.filesService.remove([fileName]);
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId },
      { $pull: { files: fileName } },
      { new: true }
    );
    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }
}
