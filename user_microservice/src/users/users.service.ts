import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(username: string, email: string, password: string) {
    const user = this.userRepository.create({ username, email, password });
    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    if (!email) return null;

    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  findOneByUsername(username: string) {
    if (!username) return null;

    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  findOneById(id: number) {
    if (!id) return null;

    return this.userRepository.findOneBy({ id });
  }
}
