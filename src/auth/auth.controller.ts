import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

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

  @Patch(':id/password')
  updateUserPassword(
    @Param('id') id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.authService.updateUserPassword(id, updateUserPasswordDto);
  }
}
