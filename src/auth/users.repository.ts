import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPwd,
      level: 0,
      exp: 0,
      tree: '',
    });

    try {
      const result = await this.save(user);
      return {
        message: `User with id ${result.id} is created`,
        result,
      };
    } catch (error) {
      if (error.code === '23505') {
        // duplicate error code
        throw new ConflictException('Username already exists');
      }
      console.log(error.stack);
    }
  }
}
