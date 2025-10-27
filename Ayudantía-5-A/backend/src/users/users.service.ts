import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async create(createUserDto : CreateUserDto) : Promise<User> {
        const createdUser = new this.userModel(createUserDto)
        return (await createdUser.save()).toObject()
    }

    async findAll() {
        return await this.userModel.find({}, { password: 0 }).exec()
    }

    async findOneByEmail(email: string) : Promise<User | null> {
        return this.userModel.findOne({ email: email }).exec()
    }
}
