import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @EventPattern('create_user')
  // createUser(data: Record<string, unknown>): string {
  //   console.log('CreateUser', data);
  // }

  @MessagePattern('create_user')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(`Data:`, data);
    return {
      ...data,
      id: 10,
    };
  }
}
