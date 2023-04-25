import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './resources/boards/boards.module';
import { ColumnsModule } from './resources/columns/columns.module';

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
  ],
})
export class AppModule {}
