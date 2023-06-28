import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/rpc-exception.filter';
import { PostService } from './post.service';

// @UseFilters(new ExceptionFilter())
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @EventPattern('create_post')
  createPost() {
    return this.postService.createPost();
  }
}
