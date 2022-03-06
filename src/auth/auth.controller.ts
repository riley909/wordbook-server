import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateUserExpDto } from './dto/update-user-exp.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const accessToken = await (
      await this.authService.signIn(authCredentialsDto)
    ).accessToken;
    response.cookie('Authorization', accessToken);
    return { accessToken };
  }

  @Post('/signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authorization');
    return this.authService.signOut();
  }

  @Get()
  getUsers() {
    return this.authService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
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

  @Patch(':id/exp')
  updateUserExp(
    @Param('id') id: number,
    @Body() updateUserExpDto: UpdateUserExpDto,
  ) {
    return this.authService.updateUserExp(id, updateUserExpDto);
  }
}
