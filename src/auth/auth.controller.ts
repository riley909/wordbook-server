import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get()
  getUsers() {
    return this.authService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  @Delete(':id')
  softDeleteUser(@Param('id') id: number) {
    return this.authService.softDeleteUser(id);
  }
}
