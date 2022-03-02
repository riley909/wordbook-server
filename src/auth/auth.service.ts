import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserExpDto } from './dto/update-user-exp.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }

  async softDeleteUser(id: number) {
    const result = await this.usersRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return {
      message: `User with id "${id}" is soft deleted`,
    };
  }

  async updateUserPassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { password } = updateUserPasswordDto;
    const user = await this.getUserById(id);

    const checkPwd = await bcrypt.compare(password, user.password);
    if (checkPwd) {
      return {
        message: `Can not use same password`,
      };
    }

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    user.password = hashedPwd;
    await this.usersRepository.save(user);

    return {
      message: `User password with id "${id}" id updated`,
    };
  }

  async updateUserExp(id: number, updateUserExpDto: UpdateUserExpDto) {
    const { exp, tree } = updateUserExpDto;
    const user = await this.getUserById(id);
    const limit = user.level * 100;

    user.exp += exp;

    if (user.exp >= limit) {
      user.exp -= limit;
      user.level += 1;
    }

    if (tree) {
      user.tree = tree;
    }

    await this.usersRepository.save(user);
    return {
      message: `User with id "${id}" is updated`,
      user,
    };
  }
}
