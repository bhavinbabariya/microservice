import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost() {
    const post = await this.postModel.create({
      description: 'new post',
      postedBy: 1,
    });

    // await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
    // throw new RpcException('Invalid Credentials');
    throw new Error('Invalid Credentials');
  }
}
