import { IsEnum, IsOptional, IsString, isString } from "class-validator"


export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {

    @IsString()
    title: string 

    @IsOptional()
    description?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status: string

    @IsString()
    userId: string
}
