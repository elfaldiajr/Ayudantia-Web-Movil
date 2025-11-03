import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";


@Schema({ timestamps: true })
export class Task {

    _id?: Types.ObjectId

    @Prop({ required: true, trim: true })
    title: string 

    @Prop({ trim: true })
    description?: string

    @Prop({
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    })
    status: string

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true
    })
    userId: Types.ObjectId
}


export type TaskDocument = HydratedDocument<Task>
export const TaskSchema = SchemaFactory.createForClass(Task)