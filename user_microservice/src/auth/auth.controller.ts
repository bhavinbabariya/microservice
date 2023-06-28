import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  UseFilters,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/rpc-exception.filter';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@UseFilters(new ExceptionFilter())
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @EventPattern('aaa')
  normal(data: any) {
    console.log('Normal Function : ', data);
  }

  @MessagePattern('signup')
  async signUp(@Payload() body: CreateUserDto) {
    // throw new InternalServerErrorException('temp error');
    const user = await this.authService.signUp(
      body.username,
      body.email,
      body.password,
    );
    return user;
  }

  @MessagePattern('signin')
  async signIn(@Payload() body: LoginUserDto) {
    return this.authService.signIn(body.username, body.password);
  }
}
