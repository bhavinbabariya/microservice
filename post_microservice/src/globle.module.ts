import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_microservice'),
    ConfigModule.forRoot({
      load: configuration,
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class GlobalModule {}
