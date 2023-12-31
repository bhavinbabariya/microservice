import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB.HOST'),
        port: configService.get('DB.PORT'),
        username: configService.get('DB.USER'),
        password: configService.get('DB.PASSWORD'),
        database: configService.get('DB.NAME'),
        // entities: ['dist/**/*.entity.ts'],
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: configuration,
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class GlobalModule {}
