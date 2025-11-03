import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Expose } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";


@Schema({
    timestamps: true,
    versionKey: false
})
export class User {
    _id?: Types.ObjectId


    @Prop({ required: false, trim: true, maxLength: 100 })
    name: string


    @Prop({ required: true, trim: true, unique: true, lowercase: true})
    email: string


    @Prop({ required: true, minLength: 6 })
    password: string


    @Prop()
    phone?: string


    @Prop({ default: true })
    isActive: boolean


    @Prop({ type: String, enum: ['user', 'admin'], default: 'user'})
    role: string
}  


export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)



