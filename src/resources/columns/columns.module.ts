import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './schemas/column.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { Board, BoardSchema } from '../boards/schemas/board.schema';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService, FilesService],
})
export class ColumnsModule {}
