import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { FindAllDto } from './dto/find-all.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Column } from './schemas/column.schema';
import { Model } from 'mongoose';
import { Task } from '../tasks/schemas/task.schema';
import { FindOneDto } from './dto/find-one.dto';
import { Board } from '../boards/schemas/board.schema';
import { FilesService } from '../files/files.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private filesService: FilesService
  ) {}
  async create({ boardId }: FindAllDto, { title }: CreateColumnDto) {
    const board = await this.boardModel.findById(boardId);

    if (!board) {
      throw new NotFoundException();
    }

    const column = await this.columnModel.create({
      boardId,
      title,
    });

    await board.updateOne({ $push: { columns: column } });

    return column;
  }

  async findAll({ boardId }: FindAllDto) {
    return await this.columnModel.find({ boardId });
  }

  async findOne({ boardId, columnId }: FindOneDto) {
    const column = await this.columnModel.findOne({ _id: columnId, boardId }).populate({
      path: 'tasks',
    });

    if (!column) {
      throw new NotFoundException();
    }

    return column;
  }

  async update({ boardId, columnId }: FindOneDto, updateColumnDto: UpdateColumnDto) {
    const column = await this.columnModel.findOneAndUpdate(
      { _id: columnId, boardId },
      updateColumnDto,
      { new: true }
    );

    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  async remove({ boardId, columnId }: FindOneDto) {
    const [board, column, tasks] = await Promise.all([
      this.boardModel.findByIdAndUpdate(boardId, { $pull: { columns: columnId } }),
      this.columnModel.findOneAndDelete({ _id: columnId, boardId }),
      this.taskModel.find({ boardId, columnId }),
    ]);

    if (!board) {
      throw new NotFoundException();
    }

    if (!column) {
      throw new NotFoundException();
    }
    const files = tasks.map(({ files }) => files).flat();

    await Promise.all([
      this.taskModel.deleteMany({ boardId, columnId }),
      this.filesService.remove(files),
    ]);

    return column;
  }
}
