import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
    salt : number = 10

    constructor(private userService : UsersService, private jwtService : JwtService) {}

    async signIn( email : string, password : string) {
        const user = await this.userService.findOneByEmail(email)
        const isMatch = await bcrypt.compare(password, user?.password ?? '')

        if(!isMatch) {
            throw new UnauthorizedException()
        }

        const payload = { _id: user?._id, email: user?.email, name: user?.name, phone: user?.phone, role: user?.role }
        return {
            access_token : await this.jwtService.signAsync(payload)
        }
    }

    async signUp( payload : CreateUserDto ) {

        const existingUser = await this.userService.findOneByEmail(payload.email)
        if(existingUser) {
            throw new ConflictException('already registered user')
        }

        const hashPass = await bcrypt.hash(payload.password, this.salt)
        
        const data : CreateUserDto = {
            ...payload,
            password: hashPass
        }
        const user = await this.userService.create(data)
        const jwtPayload = { _id: user?._id, email: user?.email, name: user?.name, phone: user?.phone, role: user.role }
    
        return {
            access_token: await this.jwtService.signAsync(jwtPayload),
            user: new UserResponseDto(user)
        }
    }
}
