import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './resources/boards/boards.module';
import { ColumnsModule } from './resources/columns/columns.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb').uri,
      }),
    }),
    BoardsModule,
    ColumnsModule,
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
