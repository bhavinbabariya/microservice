import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('POST_SERVICE') private postService: ClientProxy,
  ) {}

  @Post('/auth/signup')
  async signup(@Body() body: any) {
    const obj = this.userService.send('signup', body);

    const res = await firstValueFrom(obj);
    console.log(res);
    if (res.error) {
      throw new Error('Error occured');
    }
  }

  @Post('/auth/signin')
  signin(@Body() body: any) {
    const output = this.userService.send('signin', body);
    return firstValueFrom(output);
  }

  @Post('/post/create')
  async createPost(@Body() body: any) {
    const output = this.postService
      .send('create_post', body)
      .pipe(timeout(5000));
    const res = await firstValueFrom(output);
    return res;
  }
}
