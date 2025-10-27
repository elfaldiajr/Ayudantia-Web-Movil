import { Exclude, Expose, Transform } from 'class-transformer';
import { ObjectId, Types } from 'mongoose';

export class UserResponseDto {

    @Transform(({ value }) => value?.toString())
    _id: Types.ObjectId;

    name: string

    email: string

    phone?: string

    role: string

    isActive: boolean

    @Exclude()
    password: string

    constructor(partial : Partial<UserResponseDto>) {
        Object.assign(this, partial)
    }
}