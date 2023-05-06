import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { Column, ColumnSchema } from '../columns/schemas/column.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, FilesService],
})
export class BoardsModule {}
