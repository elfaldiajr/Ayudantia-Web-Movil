import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signIn : SignInDto) {
        return this.authService.signIn(signIn.email, signIn.password)
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    signUp(@Body() createUserDto : CreateUserDto ) {
        return this.authService.signUp(createUserDto)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

}
