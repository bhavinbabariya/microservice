import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './globle.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [GlobalModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
