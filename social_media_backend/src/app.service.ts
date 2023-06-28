import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private user_ms: ClientProxy) {}
  async getHello() {
    const res = this.user_ms.send('create_user', { name: 'bhavin' });
    return await firstValueFrom(res);
  }
}
