import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    let isMatch = false;
    if (user) isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({ user }),
    };
  }

  async signUp(username: string, email: string, password: string) {
    let _user = await this.userService.findOneByEmail(email);

    if (_user) {
      throw new BadRequestException('User with given email is already exists');
    }
    _user = await this.userService.findOneByUsername(username);

    if (_user) {
      throw new HttpException(
        'User with given username is already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const newPass = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userService.create(username, email, newPass);
    delete user.password;

    return user;
  }
}
