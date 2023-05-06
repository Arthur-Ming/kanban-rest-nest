import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';
import { FindOneDto } from './dto/find-one.dto';
import { Column } from '../columns/schemas/column.schema';
import { Task } from '../tasks/schemas/task.schema';
import { FilesService } from '../files/files.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private filesService: FilesService
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    return await this.boardModel.create(createBoardDto);
  }

  async findAll() {
    return await this.boardModel.find();
  }

  async findOne({ id }: FindOneDto) {
    const board = await this.boardModel.findById(id).populate({
      path: 'columns',
      populate: {
        path: 'tasks',
      },
    });
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  async update({ id }: FindOneDto, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardModel.findByIdAndUpdate(id, updateBoardDto, {
      new: true,
    });
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  async remove({ id }: FindOneDto) {
    const [board, , tasks] = await Promise.all([
      this.boardModel.findByIdAndDelete(id),
      this.columnModel.deleteMany({ boardId: id }),
      this.taskModel.find({ boardId: id }),
    ]);

    if (!board) {
      throw new NotFoundException();
    }

    const files = tasks.map(({ files }) => files).flat();

    await Promise.all([
      this.taskModel.deleteMany({ boardId: id }),
      this.filesService.remove(files),
    ]);

    return board;
  }
}
