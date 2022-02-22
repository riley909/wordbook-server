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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
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
}
