import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    //hash password - using randomBytes ,scrypt and promisify
    //1 generate salt
    const salt = randomBytes(8).toString('hex');
    //2 hash salt and pwd
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //3 join hashed pwd and hash together
    const result = salt + '.' + hash.toString('hex');

    //create new user and save it
    const user = await this.usersService.createUser(email, result);
    //return new user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password');
    }
    return user;
  }
}
