import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/Task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel : Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto)
    return (await createdTask.save()).toObject()
  }

  async findAll() {
    return this.taskModel.find().exec() 
  }

  findOne(id: string) {
    return this.taskModel.findById(id).exec()
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.updateOne({ _id: id }, updateTaskDto).exec()
  }

  remove(id: string) {
    return this.taskModel.deleteOne({ _id: id }).exec()
  }

  findByUser(userId: string) {
    return this.taskModel.find({ userId: userId })
  }
}
