import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/all')
  @Public()
  all() {
    return this.authService.all();
  }

  @Post('/login')
  @Public()
  login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  @Post('/signup')
  @Public()
  signup(@Body() params: SignupDto) {
    return this.authService.signUp(params);
  }

  @Get('/find-one')
  @Public()
  findOne(@Param('id') userId: string) {
    return this.authService.findOne(userId);
  }
}
